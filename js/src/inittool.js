/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.initTool');

goog.require('cynefin.urlmaker');
goog.require('goog.dom');


/**
 * @param {number} toolId Number of the tool. Starting at 1.
 */
cynefin.initTool = function(toolId) {
  var hash = window.location.hash.toString();
  var hashParts = hash.split('&');

  var frameUrlPath = hashParts[toolId];
  if (frameUrlPath) {
    var lang = window['LANG'] || 'en';
    if (lang == 'cy') lang = 'cy-gb';
    goog.dom.getElement('app-frame').src =
        cynefin.initTool.TOOL_BASE_URL + frameUrlPath + '?lang=' + lang;
  } else {
    // TODO
  }

  var randomCollectionId = hashParts[6];
  var isRandom = goog.isDefAndNotNull(randomCollectionId) &&
                 randomCollectionId > 0;
  var title = '';

  if (hashParts.length > 0) {
    var mapTitleEl = goog.dom.getElement('map-title');
    title = decodeURIComponent(hashParts[0].substr(1));
    goog.dom.setTextContent(mapTitleEl,
        (isRandom ? goog.dom.getTextContent(mapTitleEl) : '') + title);
  }

  /**
   * @param {string} id
   * @param {number} partId
   * @param {boolean=} opt_show
   * @return {?Element}
   */
  var setShowAndHash = function(id, partId, opt_show) {
    var hashPart = hashParts[partId];
    var el = goog.dom.getElement('link-' + id);
    if ((!goog.isDef(opt_show) || opt_show == true) &&
        hashPart && hashPart.length > 0) {
      var anchor = goog.dom.getFirstElementChild(el);
      if (anchor) anchor.href += hash;
      return anchor;
    } else {
      goog.dom.removeNode(el);
      return null;
    }
  };
  setShowAndHash('transcribe', 1);
  setShowAndHash('georeference', 2);
  setShowAndHash('visualize', 3);
  setShowAndHash('accuracy', 4);
  setShowAndHash('this-map', 5);

  var anchor = setShowAndHash('next-random', 6, isRandom);
  if (isRandom) {
    goog.events.listen(anchor, goog.events.EventType.CLICK, function(e) {
      var isTranscribe = toolId == 1;
      cynefin.urlmaker.sendToRandomMap(null, title, randomCollectionId,
          isTranscribe ? '/supplement/random/public/transcription/json' :
          '/random/public/georeference/json',
          isTranscribe);
      e.preventDefault();
    });
  }
};


/**
 * @define {string} Base url to append the tool address to.
 */
cynefin.initTool.TOOL_BASE_URL = 'http://earth.georeferencer.com';


goog.exportSymbol('initTool', cynefin.initTool);
