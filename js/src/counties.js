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
  this.countyDetailElement_ = goog.dom.getElement('county-detail');

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
   * @type {!Array.<!cynefin.County>}
   * @private
   */
  this.counties_ = [];

  /**
   * @type {?cynefin.County}
   * @private
   */
  this.activeCounty_ = null;

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
        var data = /** @type {Object.<string, *>} */(xhr_.getResponseJson());

      } else {
      }
    }, false, this);
    xhr_.send(requestUrl);

    // UI changes
    goog.dom.setTextContent(this.countyNameElement_, name);
    goog.style.setElementShown(this.countyDetailElement_, true);

    if (this.activeCounty_) {
      goog.dom.classlist.remove(this.activeCounty_.li, 'active');
    }
    goog.dom.classlist.add(county.li, 'active');

    this.setFilter('');

    this.activeCounty_ = county;
    this.dispatchEvent({
      type: 'opened',
      countyName: name,
      center: county.center
    });
  }
};


/**
 */
cynefin.Counties.prototype.closeCounty = function() {
  if (this.activeCounty_) {
    goog.dom.classlist.remove(this.activeCounty_.li, 'active');
  }
  this.activeCounty_ = null;
  goog.style.setElementShown(this.countyDetailElement_, false);
};


/**
 * @param {string} value
 */
cynefin.Counties.prototype.setFilter = function(value) {
  //TODO:
};
