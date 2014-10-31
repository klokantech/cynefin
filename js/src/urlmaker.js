/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.urlmaker');

goog.require('goog.Uri');
goog.require('goog.events');
goog.require('goog.net.CorsXmlHttpFactory');
goog.require('goog.net.XhrIo');


/**
 * @param {Object.<string, string>} e .
 * @return {string} .
 */
cynefin.urlmaker.createLinkHash = function(e) {
  var linkHash = e['title'] +
                 '|' + new goog.Uri(e['transcription_url'] || '').getPath() +
                 '|' + new goog.Uri(e['georeference_url'] || '').getPath() +
                 '|' + new goog.Uri(e['visualize_url'] || '').getPath() +
                 '|' + //TODO: accuracy
                 '|' + new goog.Uri(e['object_url'] || '').getPath();
  return linkHash;
};


/**
 * @define {string} base url for collection requests
 */
cynefin.urlmaker.COLLECTION_BASE_URL =
    'http://cynefin.georeferencer.com/collection/';


/**
 * @param {?string} toolPath If null, only change hash (and reload).
 * @param {string} title
 * @param {string} collId
 * @param {string} randomPath
 * @param {boolean=} opt_supp Random supplement only?
 */
cynefin.urlmaker.sendToRandomMap =
    function(toolPath, title, collId, randomPath, opt_supp) {
  var requestUrl = cynefin.urlmaker.COLLECTION_BASE_URL +
                       collId + randomPath;
  var xhr_ = new goog.net.XhrIo(new goog.net.CorsXmlHttpFactory());
  goog.events.listen(xhr_, goog.net.EventType.COMPLETE, function() {
    if (xhr_.isSuccess()) {
      var data = /** @type {Object.<string, string>} */(xhr_.getResponseJson());
      var hash;
      if (opt_supp) {
        hash = title + '|' +
            new goog.Uri(data['transcription_url'] || '').getPath() +
            '|||||' + collId;
      } else {
        hash = cynefin.urlmaker.createLinkHash(data) + '|' + collId;
      }
      if (goog.isDefAndNotNull(toolPath)) {
        var dst = toolPath + '#' + hash;
        window.location = dst;
      } else {
        window.location.hash = hash;
        window.location.reload();
      }
    }
  });
  xhr_.send(requestUrl);
};
