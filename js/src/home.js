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
  xhr_.send(cynefin.Home.STATS_URL + 'stats.json');

  this.loadContibutors_();
};

/**
 * @define {string} Url for the stats object.
 */
cynefin.Home.STATS_URL =
        'http://cynefin.georeferencer.com/repository/15872231/';


/**
 * Loads tables
 */
cynefin.Home.prototype.loadContibutors_ = function() {
  var queryDay = 'top-contributors.json?period=day&limit=5';
  this.drawVisualization(cynefin.Home.STATS_URL + queryDay, 'topc-day');
  
  var queryAll = 'top-contributors.json?limit=5';
  this.drawVisualization(cynefin.Home.STATS_URL + queryAll, 'topc-all');
};

/**
 * Draws visualisation to table via google tabs
 * @param {string} dataSourceUrl
 * @param {string} elementId
 */
cynefin.Home.prototype.drawVisualization = function(dataSourceUrl, elementId) {
  var tableContainer = document.getElementById(elementId);
  var table = new google.visualization.Table(tableContainer);
  var query = new google.visualization.Query(dataSourceUrl, {});
  query.send(function(response) {
    if (response.isError()) {
      throw Error(response.getMessage() + ' ' + response.getDetailedMessage());
    } else {
      var dataTable = response.getDataTable();
      table.draw(dataTable, {showRowNumber: true});
    }
  });
};


goog.exportSymbol('Home', cynefin.Home);
