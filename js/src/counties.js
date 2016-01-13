/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.Counties');

goog.require('cynefin.urlmaker');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.net.CorsXmlHttpFactory');
goog.require('goog.net.XhrIo');


/**
 * @typedef {{name: string,
 *            label: string,
 *            id: string,
 *            center: Array.<number>,
 *            anchor: Element,
 *            li: Element}}
 */
cynefin.County;



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
cynefin.Counties = function() {
  goog.base(this);

  /**
   * @type {Element}
   * @private
   */
  this.countiesListElement_ = goog.dom.getElement('counties-list');

  /**
   * @type {Element}
   * @private
   */
  this.applicationPanelElement_ = goog.dom.getElement('application-panel');

  /**
   * @type {Element}
   * @private
   */
  this.countyNameElement_ = goog.dom.getElement('county-detail-name');

  /**
   * @type {Element}
   * @private
   */
  this.countyContribLink_ = goog.dom.getElement('county-detail-contrib-link');

  /**
   * @type {string}
   * @private
   */
  this.countyContribLinkBase_ =
    this.countyContribLink_ ? this.countyContribLink_.href : '';

  /**
   * @type {Element}
   * @private
   */
  this.countyHideElement_ = goog.dom.getElement('county-detail-hide');

  goog.events.listen(this.countyHideElement_, goog.events.EventType.CLICK,
      function(e) {
        this.closeCounty();
        e.preventDefault();
      }, false, this);

  /**
   * @type {Element}
   * @private
   */
  this.mapListElement_ = goog.dom.getElement('map-list');

  /**
   * @type {string}
   * @private
   */
  this.itemTemplate_ = '';

  var itemTemplateElement = goog.dom.getElement('item-template');
  if (itemTemplateElement) {
    this.itemTemplate_ = itemTemplateElement.innerHTML;
    goog.dom.removeNode(itemTemplateElement);
  }

  /**
   * @type {!HTMLInputElement}
   * @private
   */
  this.mapFilterElement_ = /** @type {!HTMLInputElement} */
                           (goog.dom.getElement('map-filter'));

  /**
   * @type {!Element}
   * @private
   */
  this.mapFilterClearElement_ = /** @type {!Element} */
                                (goog.dom.getElement('map-filter-clear'));

  goog.events.listen(this.mapFilterElement_, goog.events.EventType.INPUT,
      function(e) {
        this.setFilter(this.mapFilterElement_.value);
      }, false, this);

  goog.events.listen(this.mapFilterClearElement_, goog.events.EventType.CLICK,
      function(e) {
        this.setFilter('');
      }, false, this);

  /**
   * @type {Element}
   * @private
   */
  this.georeferenceRandElement_ = goog.dom.getElement('georeference-random');

  goog.events.listen(this.georeferenceRandElement_,
      goog.events.EventType.CLICK, function(e) {
        if (!goog.dom.classlist.contains(this.georeferenceRandElement_,
                                         'disabled')) {
          this.sendToRandomMap_(this.georeferenceRandElement_.href,
                                '/random/public/georeference/json');
        }
        e.preventDefault();
      }, false, this);

  /**
   * @type {Element}
   * @private
   */
  this.transcribeRandElement_ = goog.dom.getElement('transcribe-random');

  goog.events.listen(this.transcribeRandElement_,
      goog.events.EventType.CLICK, function(e) {
        if (!goog.dom.classlist.contains(this.transcribeRandElement_,
                                         'disabled')) {
          this.sendToRandomMap_(this.transcribeRandElement_.href,
                                '/supplement/random/public/transcription/json',
                                true);
        }
        e.preventDefault();
      }, false, this);

  /**
   * @type {!Array.<!cynefin.County>}
   * @private
   */
  this.counties_ = [];

  /**
   * @type {?cynefin.County}
   * @private
   */
  this.activeCounty_ = null;

  /**
   * @type {?cynefin.County}
   * @private
   */
  this.highlightedCounty_ = null;

  /**
   * @type {!Array.<!{title: string, parish: string, node: !Element,
   *                  listenKeys: !Array.<goog.events.Key>,
   *                  scanned: boolean, notgeorefed: boolean,
   *                  nottransed: boolean, notfin: boolean}>}
   * @private
   */
  this.maps_ = [];

  this.initCountyList_();

  /**
   * @type {string}
   * @private
   */
  this.stateFilter_ = 'all';

  var listenStateFilter = goog.bind(function(type) {
    goog.events.listen(goog.dom.getElement('map-filter-' + type),
        goog.events.EventType.CLICK, function(e) {
          this.setFilter('');
          this.setStateFilter(type);
        }, false, this);
  }, this);
  listenStateFilter('all');
  listenStateFilter('scanned');
  listenStateFilter('notgeorefed');
  listenStateFilter('nottransed');
  listenStateFilter('notfin');

  /**
   * @type {{reviewedBar: Element, editedBar: Element, restBar: Element,
   *         reviewed: Element, edited: Element, total: Element}}
   * @private
   */
  this.progressMapsElements_ = {
    reviewedBar: goog.dom.getElement('progress-maps-reviewed-bar'),
    editedBar: goog.dom.getElement('progress-maps-edited-bar'),
    restBar: goog.dom.getElement('progress-maps-rest-bar'),
    reviewed: goog.dom.getElement('progress-maps-reviewed'),
    edited: goog.dom.getElement('progress-maps-edited'),
    total: goog.dom.getElement('progress-maps-total')
  };

  /**
   * @type {{reviewedBar: Element, editedBar: Element, restBar: Element,
   *         reviewed: Element, edited: Element, total: Element}}
   * @private
   */
  this.progressSheetsElements_ = {
    reviewedBar: goog.dom.getElement('progress-sheets-reviewed-bar'),
    editedBar: goog.dom.getElement('progress-sheets-edited-bar'),
    restBar: goog.dom.getElement('progress-sheets-rest-bar'),
    reviewed: goog.dom.getElement('progress-sheets-reviewed'),
    edited: goog.dom.getElement('progress-sheets-edited'),
    total: goog.dom.getElement('progress-sheets-total')
  };

  // Stats elements
  /** @type {Element} @private */
  this.statsGCPCountEl_ = goog.dom.getElement('stats-gcp-count');
  /** @type {Element} @private */
  this.statsLabelCountEl_ = goog.dom.getElement('stats-label-count');
};
goog.inherits(cynefin.Counties, goog.events.EventTarget);


/**
 * @define {string} base url for collection requests
 */
cynefin.Counties.COLLECTION_BASE_URL =
    'http://cynefin.georeferencer.com/collection/';


/**
 * @private
 */
cynefin.Counties.prototype.initCountyList_ = function() {
  if (this.countiesListElement_) {
    var lis = goog.dom.getElementsByTagNameAndClass(
        goog.dom.TagName.LI, undefined, this.countiesListElement_);
    goog.array.forEach(lis, function(li, i, arr) {
      if (li) {
        var collId = li.getAttribute('data-collection-id');
        var anchor = goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.A,
                                                           undefined, li)[0];
        var label = goog.dom.getTextContent(anchor);
        var name = li.getAttribute('data-name');
        if (collId && anchor && name && name.length > 0) {
          var centerString = li.getAttribute('data-center');
          var center = null;
          if (goog.isString(centerString)) {
            var broken = centerString.split(',');
            center = [parseFloat(broken[1]), parseFloat(broken[0])];
          }
          this.counties_.push({
            label: label,
            name: name,
            id: collId,
            center: center,
            anchor: anchor,
            li: li
          });
          goog.events.listen(anchor, goog.events.EventType.CLICK, function(e) {
            this.openCounty(name);
            e.preventDefault();
          }, false, this);
        }
      }
    }, this);
  }
};


/**
 * @return {?string}
 */
cynefin.Counties.prototype.getActiveCountyName = function() {
  return this.activeCounty_ ? this.activeCounty_.name : null;
};


/**
 * @param {?string} name
 */
cynefin.Counties.prototype.highlightCounty = function(name) {
  if (this.highlightedCounty_) {
    goog.dom.classlist.remove(this.highlightedCounty_.li, 'highlighted');
  }
  if (!name) return;

  var county = goog.array.find(this.counties_, function(el, i, arr) {
    return el.name == name;
  });
  if (county) {
    goog.dom.classlist.add(county.li, 'highlighted');
    this.highlightedCounty_ = county;
  }
};


/**
 * @param {string} name
 * @param {Function=} opt_callback
 */
cynefin.Counties.prototype.openCounty = function(name, opt_callback) {
  if (this.activeCounty_ && this.activeCounty_.name == name) {
    if (opt_callback) opt_callback();
    return;
  }
  var county = goog.array.find(this.counties_, function(el, i, arr) {
    return el.name == name;
  });
  if (county) {
    // map request
    var requestUrl = cynefin.Counties.COLLECTION_BASE_URL +
                         county.id + '/objects/json';
    var xhr_ = new goog.net.XhrIo(new goog.net.CorsXmlHttpFactory());
    goog.events.listen(xhr_, goog.net.EventType.COMPLETE, function() {
      if (xhr_.isSuccess()) {
        var data = /** @type {Array} */(xhr_.getResponseJson());
        this.processLoadedMaps_(data);
        if (opt_callback) opt_callback();
      } else {
      }
    }, false, this);
    xhr_.send(requestUrl);

    // stats request
    goog.dom.setTextContent(this.statsGCPCountEl_, '...');
    goog.dom.setTextContent(this.statsLabelCountEl_, '...');
    var requestStatsUrl = cynefin.Counties.COLLECTION_BASE_URL +
                              county.id + '/stats.json';
    var xhrStats_ = new goog.net.XhrIo(new goog.net.CorsXmlHttpFactory());
    goog.events.listen(xhrStats_, goog.net.EventType.COMPLETE, function() {
      if (xhrStats_.isSuccess()) {
        var data = /** @type {Array} */(xhrStats_.getResponseJson());
        var map = data['map'], supps = map['supplement'];
        var trans = (supps['products'] || {})['transcription'] || {};
        var suppReviewed = (trans['impossible-reviewed'] || 0) +
                           (trans['finished-reviewed'] || 0);
        var suppEdited = (trans['touched'] || 0) +
                         (trans['finished'] || 0) +
                         (trans['impossible'] || 0);
        var suppCount = (supps['objects'] || 0);

        this.setProgress_(true, suppReviewed, suppEdited, suppCount);

        var gcpCount = map['components']['gcp'];
        var labelCount = map['components']['label'] +
                         supps['components']['label'];

        goog.dom.setTextContent(this.statsGCPCountEl_, gcpCount.toString());
        goog.dom.setTextContent(this.statsLabelCountEl_, labelCount.toString());
      }
    }, false, this);
    xhrStats_.send(requestStatsUrl);

    // UI changes
    goog.dom.setTextContent(this.countyNameElement_, county.label);
    if (this.countyContribLink_) {
      this.countyContribLink_.href = this.countyContribLinkBase_ +
                                    '#' + encodeURIComponent(county.label);
    }
    goog.dom.classlist.remove(this.applicationPanelElement_,
                              'no-county-detail');
    this.setProgress_(false, 0, 0, 0);
    this.setProgress_(true, 0, 0, 0);

    if (this.activeCounty_) {
      goog.dom.classlist.remove(this.activeCounty_.li, 'active');
    }
    goog.dom.classlist.add(county.li, 'active');

    this.activeCounty_ = county;
    this.dispatchEvent({
      type: 'opened',
      countyName: name,
      center: county.center
    });
  }
};


/**
 * @param {string} html .
 * @param {Object.<string, string>} e .
 * @return {string} .
 * @private
 */
cynefin.Counties.prototype.replacePlaceholders_ = function(html, e) {

  var replaceGroup = function(placeholder, value) {
    if (!goog.isDefAndNotNull(value)) value = '';
    var replace = function(what, val) {
      html = html.replace(new RegExp(what, 'g'), val);
    };
    replace('\\$' + placeholder + '\\$', value);
    if (value.toString().length > 0) {
      replace('\<\!\-\-' + placeholder + ' ', '');
      replace(' ' + placeholder + '\-\->', '');
    }
  };

  replaceGroup('title', e['title']);
  replaceGroup('thumbnail_url', e['thumbnail_url']);
  replaceGroup('transcription_url', e['transcription_url']);
  replaceGroup('georeference_url', e['georeference_url']);
  replaceGroup('visualize_url', e['visualize_url']);
  replaceGroup('object_url', e['object_url']);
  replaceGroup('link_hash', cynefin.urlmaker.createLinkHash(e));
  if (goog.isNull(e['thumbnail_url'])) replaceGroup('no_thumbnail', '&nbsp;');

  return html;
};


/**
 * @param {Array} data
 * @private
 */
cynefin.Counties.prototype.processLoadedMaps_ = function(data) {
  //remove previous
  goog.array.forEach(this.maps_, function(el, i, arr) {
    goog.array.forEach(el.keys, goog.events.unlistenByKey);
    goog.dom.removeNode(el.node);
  });
  this.maps_ = [];
  this.setFilter('');
  this.setStateFilter('all');

  var allSum = 0, scannedSum = 0, editedSum = 0, reviewedSum = 0,
      notgeorefedSum = 0, nottransedSum = 0, notfinSum = 0;
  var anyGeoref = false, anyTrans = false;

  goog.array.forEach(data, function(el, i, arr) {
    var keys = [];

    var itemHTML = this.replacePlaceholders_(this.itemTemplate_,
        /** @type {Object.<string, string>} */(el));

    var item = goog.dom.getFirstElementChild(
        goog.dom.htmlToDocumentFragment(itemHTML));
    goog.dom.appendChild(this.mapListElement_, item);

    var georefstat = el['georeference_status'];
    var scanned = goog.isDefAndNotNull(el['thumbnail_url']),
        edited = goog.isDefAndNotNull(el['visualize_url']),
        reviewed = georefstat && goog.string.endsWith(georefstat, '-reviewed'),
        notgeorefed = scanned && !edited,
        nottransed = true, //TODO
        notfin = (goog.isNull(georefstat) || georefstat == 'fresh');
    anyGeoref = anyGeoref || goog.isDefAndNotNull(el['georeference_url']);
    anyTrans = anyTrans || goog.isDefAndNotNull(el['transcription_url']);
    allSum++;
    if (scanned) scannedSum++;
    if (edited) editedSum++;
    if (reviewed) reviewedSum++;
    if (notgeorefed) notgeorefedSum++;
    if (nottransed) nottransedSum++;
    if (notfin) notfinSum++;

    this.maps_.push({
      title: this.normalizeString_(el['title']),
      parish: el['identifier'],
      node: item,
      keys: keys,
      scanned: scanned,
      notgeorefed: notgeorefed,
      nottransed: nottransed,
      notfin: notfin
    });
  }, this);

  var setCount = function(type, count) {
    goog.dom.setTextContent(goog.dom.getElement('map-count-' + type), count);
  };
  setCount('all', allSum);
  setCount('scanned', scannedSum);
  setCount('notgeorefed', notgeorefedSum);
  setCount('nottransed', nottransedSum);
  setCount('notfin', notfinSum);

  goog.style.setElementShown(goog.dom.getElement('map-filter-scanned-block'),
                             allSum != scannedSum);

  goog.dom.classlist.enable(this.georeferenceRandElement_,
                            'disabled', !anyGeoref);
  goog.dom.classlist.enable(this.transcribeRandElement_,
                            'disabled', !anyTrans);

  this.setProgress_(false, reviewedSum, editedSum, allSum);
};


/**
 * @param {boolean} sheets
 * @param {number} reviewed
 * @param {number} edited
 * @param {number} total
 * @private
 */
cynefin.Counties.prototype.setProgress_ = function(sheets,
                                                   reviewed, edited, total) {
  var progress = sheets ? this.progressSheetsElements_ :
                          this.progressMapsElements_;

  goog.dom.setTextContent(progress.reviewed, reviewed);
  goog.dom.setTextContent(progress.edited, edited);
  goog.dom.setTextContent(progress.total, total);

  var reviewedPercent = (100 * reviewed / total) || 0;
  var editedPercent = (100 * edited / total) || 0;

  progress.reviewedBar.style.width = reviewedPercent + '%';
  progress.editedBar.style.width = (editedPercent - reviewedPercent) + '%';
  progress.restBar.style.width = (100 - editedPercent) + '%';

  var showReviewed = reviewed > 0;
  var showEdited = !showReviewed || edited > reviewed;
  goog.style.setElementShown(progress.reviewed, showReviewed);
  goog.style.setElementShown(progress.reviewedBar, showReviewed);
  goog.style.setElementShown(progress.edited, showEdited);
  goog.style.setElementShown(progress.editedBar, showEdited);
};


/**
 * @param {string} toolPath
 * @param {string} randomPath
 * @param {boolean=} opt_supp
 * @private
 */
cynefin.Counties.prototype.sendToRandomMap_ =
    function(toolPath, randomPath, opt_supp) {
  if (!this.activeCounty_) return;

  cynefin.urlmaker.sendToRandomMap(toolPath, this.activeCounty_.label,
                                   this.activeCounty_.id, randomPath, opt_supp);
};


/**
 */
cynefin.Counties.prototype.closeCounty = function() {
  if (this.activeCounty_) {
    goog.dom.classlist.remove(this.activeCounty_.li, 'active');
  }
  this.activeCounty_ = null;
  goog.dom.classlist.add(this.applicationPanelElement_, 'no-county-detail');
};


/**
 * @param {string} value
 */
cynefin.Counties.prototype.setFilter = function(value) {
  this.mapFilterElement_.value = value;
  this.refilterMaps_();
};


/**
 * @param {string} type
 */
cynefin.Counties.prototype.setStateFilter = function(type) {
  goog.dom.classlist.remove(
      goog.dom.getElement('map-filter-' + this.stateFilter_), 'active');
  goog.dom.classlist.add(
      goog.dom.getElement('map-filter-' + type), 'active');
  this.stateFilter_ = type;
  this.refilterMaps_();
};


/**
 * @private
 */
cynefin.Counties.prototype.refilterMaps_ = function() {
  var value = this.normalizeString_(this.mapFilterElement_.value);
  var values = value.split(' or ');
  goog.array.forEach(this.maps_, function(el, i, arr) {
    var statePassing = (this.stateFilter_ == 'all') ||
                       (this.stateFilter_ == 'scanned' && el.scanned) ||
                       (this.stateFilter_ == 'notgeorefed' && el.notgeorefed) ||
                       (this.stateFilter_ == 'nottransed' && el.nottransed) ||
                       (this.stateFilter_ == 'notfin' && el.notfin);
    var filtered = !statePassing ||
                   goog.array.every(values, function(value, i, arr) {
                     return !goog.string.contains(el.title, value);
                   });
    goog.dom.classlist.enable(el.node, 'filtered', filtered);
  }, this);
};


/**
 * @param {string} parishId
 */
cynefin.Counties.prototype.createFilterFromParishId = function(parishId) {
  var filterText = '';
  goog.array.forEach(this.maps_, function(el, i, arr) {
    if (goog.array.contains(el.parish.split('|'), parishId)) {
      if (filterText.length > 0) filterText += ' OR ';
      filterText += el.title;
    }
  }, this);
  this.setFilter(filterText);
};


/**
 * @param {?string} s .
 * @return {string} Converted to lower case and removed accents.
 * @private
 */
cynefin.Counties.prototype.normalizeString_ = function(s) {
  var r = (s || '').toLowerCase();
  r = r.replace(new RegExp('[àáâãäå]', 'g'), 'a');
  r = r.replace(new RegExp('æ', 'g'), 'ae');
  r = r.replace(new RegExp('[çč]', 'g'), 'c');
  r = r.replace(new RegExp('ď', 'g'), 'c');
  r = r.replace(new RegExp('[èéêëě]', 'g'), 'e');
  r = r.replace(new RegExp('[ìíîï]', 'g'), 'i');
  r = r.replace(new RegExp('[ñň]', 'g'), 'n');
  r = r.replace(new RegExp('[òóôõöø]', 'g'), 'o');
  r = r.replace(new RegExp('œ', 'g'), 'oe');
  r = r.replace(new RegExp('ř', 'g'), 'r');
  r = r.replace(new RegExp('š', 'g'), 's');
  r = r.replace(new RegExp('ť', 'g'), 't');
  r = r.replace(new RegExp('[ùúûüů]', 'g'), 'u');
  r = r.replace(new RegExp('[ýÿ]', 'g'), 'y');
  r = r.replace(new RegExp('ž', 'g'), 'z');
  return r;
};
