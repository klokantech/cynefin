/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.Counties');

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
   * @type {!Array.<!{title: string, parish: string, node: !Element, listenKeys: !Array.<goog.events.Key>}>}
   * @private
   */
  this.maps_ = [];

  this.initCountyList_();
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
        var name = goog.dom.getTextContent(anchor);
        if (collId && anchor && name && name.length > 0) {
          var centerString = li.getAttribute('data-center');
          var center = null;
          if (goog.isString(centerString)) {
            var broken = centerString.split(',');
            center = [parseFloat(broken[1]), parseFloat(broken[0])];
          }
          this.counties_.push({
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
 * @param {string} name
 * @param {Function=} opt_callback
 */
cynefin.Counties.prototype.openCounty = function(name, opt_callback) {
  var county = goog.array.find(this.counties_, function(el, i, arr) {
    return el.name == name;
  });
  if (county) {
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

    // UI changes
    goog.dom.setTextContent(this.countyNameElement_, name);
    goog.dom.classlist.remove(this.applicationPanelElement_,
                              'no-county-detail');

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

  var title = e['title'];
  replaceGroup('title', title);
  replaceGroup('thumbnail_url', e['thumbnail_url']);

  var transcription_url = e['transcription_url'];
  var georeference_url = e['georeference_url'];
  var visualize_url = e['visualize_url'];
  var object_url = e['object_url'];
  replaceGroup('transcription_url', transcription_url);
  replaceGroup('georeference_url', georeference_url);
  replaceGroup('visualize_url', visualize_url);
  replaceGroup('object_url', object_url);

  var linkHash = title +
                 '|' + new goog.Uri(transcription_url || '').getPath() +
                 '|' + new goog.Uri(georeference_url || '').getPath() +
                 '|' + new goog.Uri(visualize_url || '').getPath() +
                 '|' + //TODO: accuracy
                 '|' + new goog.Uri(object_url || '').getPath();
  replaceGroup('link_hash', linkHash);

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

  goog.array.forEach(data, function(el, i, arr) {
    var keys = [];

    var itemHTML = this.replacePlaceholders_(this.itemTemplate_,
        /** @type {Object.<string, string>} */(el));

    var item = goog.dom.htmlToDocumentFragment(itemHTML).firstElementChild;
    goog.dom.appendChild(this.mapListElement_, item);

    this.maps_.push({
      title: this.normalizeString_(el['title']),
      parish: el['identifier'],
      node: item,
      keys: keys
    });
  }, this);
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
  value = this.normalizeString_(value);
  var values = value.split(' or ');
  goog.array.forEach(this.maps_, function(el, i, arr) {
    goog.dom.classlist.enable(el.node, 'hidden',
        goog.array.every(values, function(value, i, arr) {
          return !goog.string.contains(el.title, value);
        })
    );
  });
};


/**
 * @param {string} parishId
 */
cynefin.Counties.prototype.createFilterFromParishId = function(parishId) {
  var filterText = '';
  goog.array.forEach(this.maps_, function(el, i, arr) {
    if (goog.array.contains(el.parish.split(','), parishId)) {
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
