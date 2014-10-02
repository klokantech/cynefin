/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.initTool');

goog.require('goog.dom');


/**
 * @param {number} toolId Number of the tool. Starting at 1.
 */
cynefin.initTool = function(toolId) {
  var hash = window.location.hash.toString();
  var hashParts = hash.split('|');

  var frameUrlPath = hashParts[toolId];
  goog.dom.getElement('app-frame').src =
      cynefin.initTool.TOOL_BASE_URL + frameUrlPath;

  if (hashParts.length > 0) {
    goog.dom.setTextContent(goog.dom.getElement('map-title'),
                            hashParts[0].substr(1));
  }
  var setShowAndHash = function(id, partId) {
    var hashPart = hashParts[partId];
    var el = goog.dom.getElement('link-' + id);
    if (hashPart && hashPart.length > 0) {
      var anchor = goog.dom.getFirstElementChild(el);
      if (anchor) anchor.href += hash;
    } else {
      goog.dom.removeNode(el);
    }
  };
  setShowAndHash('transcribe', 1);
  setShowAndHash('georeference', 2);
  setShowAndHash('visualize', 3);
  setShowAndHash('accuracy', 4);
  setShowAndHash('this-map', 5);
};


/**
 * @define {string} Base url to append the tool address to.
 */
cynefin.initTool.TOOL_BASE_URL = 'http://cynefin.georeferencer.com';


goog.exportSymbol('initTool', cynefin.initTool);
