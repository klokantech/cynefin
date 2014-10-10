/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.Home');

goog.require('goog.dom');
goog.require('goog.net.CorsXmlHttpFactory');
goog.require('goog.net.XhrIo');



/**
 * @constructor
 */
cynefin.Home = function() {
  var xhr_ = new goog.net.XhrIo(new goog.net.CorsXmlHttpFactory());
  goog.events.listen(xhr_, goog.net.EventType.COMPLETE, function() {
    if (xhr_.isSuccess()) {
      var data = /** @type {Array} */(xhr_.getResponseJson());
      var map = data['map'];
      var supplement = map['supplement'];

      var totalVolunteers = Math.max(
          Math.max(map['products']['transcription']['contributors'],
          map['products']['georeference']['contributors']),
          Math.max(supplement['products']['transcription']['contributors'],
          supplement['products']['georeference']['contributors']));
      var recordsTransed = map['components']['label'] +
                           supplement['components']['label'];
      var maps = map['objects'];

      goog.dom.setTextContent(goog.dom.getElement('stats_total_volunteers'),
                              totalVolunteers);
      goog.dom.setTextContent(goog.dom.getElement('stats_records_transed'),
                              recordsTransed);
      goog.dom.setTextContent(goog.dom.getElement('stats_maps'), maps);
    }
  }, false, this);
  xhr_.send(cynefin.Home.STATS_URL);
};


/**
 * @define {string} Url for the stats object.
 */
cynefin.Home.STATS_URL =
    'http://cynefin.georeferencer.com/repository/15872231/stats.json';


goog.exportSymbol('Home', cynefin.Home);
