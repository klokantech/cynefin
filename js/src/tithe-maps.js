/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.TitheMaps');

goog.require('goog.dom');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.TileJSON');
goog.require('ol.source.TileUTFGrid');



/**
 * @constructor
 */
cynefin.TitheMaps = function() {
  /**
   * @type {Element}
   * @private
   */
  this.mapElement_ = goog.dom.getElement('map');

  this.utfGridSource_ = new ol.source.TileUTFGrid({
    url: cynefin.TitheMaps.PARISHES_TILEJSON,
    preemptive: true
  });

  /**
   * @private
   * @type {!ol.View}
   */
  this.view_ = new ol.View({
    center: ol.proj.transform([-3.9001, 52.3118], 'EPSG:4326', 'EPSG:3857'),
    extent: ol.proj.transformExtent([-8.2178, 50.646, 0.1318, 54.3742],
                                    'EPSG:4326', 'EPSG:3857'),
    zoom: 7,
    minZoom: 6
  });

  /**
   * @private
   * @type {!ol.Map}
   */
  this.map_ = new ol.Map({
    target: this.mapElement_,
    controls: [],
    layers: [
      new ol.layer.Tile({
        source: new ol.source.TileJSON({
          url: cynefin.TitheMaps.COUNTIES_TILEJSON
        })
      }),
      new ol.layer.Tile({
        source: new ol.source.TileJSON({
          url: cynefin.TitheMaps.PARISHES_TILEJSON
        })
      }),
      new ol.layer.Tile({source: this.utfGridSource_})
    ],
    view: this.view_
  });

  this.map_.on(ol.MapBrowserEvent.EventType.POINTERMOVE, function(e) {
    var res = this.view_.getResolution() || 1;
    this.utfGridSource_.forDataAtCoordinateAndResolution(e.coordinate, res,
        this.handleMapPointerMove_, this);
  }, this);

  this.map_.on(ol.MapBrowserEvent.EventType.SINGLECLICK, function(e) {
    var res = this.view_.getResolution() || 1;
    this.utfGridSource_.forDataAtCoordinateAndResolution(e.coordinate, res,
        this.handleMapSingleClick_, this);
  }, this);
};


/**
 * @define {string} url for the counties TileJSON
 */
cynefin.TitheMaps.COUNTIES_TILEJSON =
    'http://cynefinproject.eu/tileserver/cynefin-counties.json';


/**
 * @define {string} url for the parishes TileJSON
 */
cynefin.TitheMaps.PARISHES_TILEJSON =
    'http://cynefinproject.eu/tileserver/cynefin-parishes.json';


/**
 * @param {Object} data Data from the UTFGrid.
 * @private
 */
cynefin.TitheMaps.prototype.handleMapPointerMove_ = function(data) {
  this.mapElement_.style.cursor = data ? 'pointer' : '';
};


/**
 * @param {Object} data Data from the UTFGrid.
 * @private
 */
cynefin.TitheMaps.prototype.handleMapSingleClick_ = function(data) {
  window['console']['log'](data);
};


goog.exportSymbol('TitheMaps', cynefin.TitheMaps);
