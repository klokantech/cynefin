/**
 *
 * @author petr.sloup@klokantech.com (Petr Sloup)
 *
 * Copyright 2014 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('cynefin.TitheMaps');

goog.require('cynefin.Counties');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.animation');
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
    url: cynefin.TitheMaps.UTFGRID_TILEJSON,
    preemptive: true
  });

  /**
   * @private
   * @type {!ol.View}
   */
  this.view_ = new ol.View({
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

  this.map_.once(ol.MapEventType.POSTRENDER, function(e) {
    this.centerOnLonLat_([-3.9001, 52.3118]);
  }, this);

  /**
   * @type {!cynefin.Counties}
   * @private
   */
  this.counties_ = new cynefin.Counties();

  this.dontSetCenter_ = false;
  this.counties_.listen('opened', function(e) {
    if (!this.dontSetCenter_) {
      var currentZoom = this.view_.getZoom();
      if (currentZoom != 10) this.view_.setZoom(10);
      this.centerOnLonLat_(e.center, currentZoom == 10);
    }
  }, false, this);
};


/**
 * @define {string} url for the counties TileJSON
 */
cynefin.TitheMaps.COUNTIES_TILEJSON =
    'http://cynefin.tileserver.com/cynefin-counties.json';


/**
 * @define {string} url for the parishes TileJSON
 */
cynefin.TitheMaps.PARISHES_TILEJSON =
    'http://cynefin.tileserver.com/cynefin-parishes.json';


/**
 * @define {string} url for the parishes TileJSON
 */
cynefin.TitheMaps.UTFGRID_TILEJSON =
    'http://cynefinproject.eu/tileserver/cynefin-parishes.json';


/**
 * @param {ol.Coordinate} coord
 * @param {boolean=} opt_anim
 * @private
 */
cynefin.TitheMaps.prototype.centerOnLonLat_ = function(coord, opt_anim) {
  coord = ol.proj.transform(coord, 'EPSG:4326', 'EPSG:3857');
  if (!coord) return;

  var oldCenter = this.view_.getCenter();
  if (opt_anim && oldCenter) {
    this.map_.beforeRender(ol.animation.pan({
      duration: 300,
      source: oldCenter
    }));
  }

  var mapSize = this.map_.getSize(), shiftedCenter;
  var panel = goog.dom.getElement('application-panel');
  if (panel) {
    shiftedCenter = [
      (mapSize[0] + goog.style.getSize(panel).width) / 2,
      (mapSize[1]) / 2
    ];
  }
  if (shiftedCenter && mapSize) {
    this.view_.centerOn(coord, mapSize, shiftedCenter);
  } else {
    this.view_.setCenter(coord);
  }
};


/**
 * @param {Object} data Data from the UTFGrid.
 * @private
 */
cynefin.TitheMaps.prototype.handleMapPointerMove_ = function(data) {
  this.mapElement_.style.cursor = data ? 'pointer' : '';
  this.counties_.highlightCounty(data ? data['County'] : null);
};


/**
 * @param {Object} data Data from the UTFGrid.
 * @private
 */
cynefin.TitheMaps.prototype.handleMapSingleClick_ = function(data) {
  if (goog.DEBUG) window['console']['log'](data);
  if (data) {
    var name = data['County'];
    if (goog.isString(name)) {
      var filterByParish = goog.bind(function() {
        if (this.view_.getZoom() > 9) {
          this.counties_.createFilterFromParishId(data['SHAPE_ID'].toString());
        }
      }, this);
      if (name != this.counties_.getActiveCountyName()) {
        this.dontSetCenter_ = true;
        this.counties_.openCounty(name, filterByParish);
        this.dontSetCenter_ = false;
      } else {
        filterByParish();
      }
    }
  }
};


goog.exportSymbol('TitheMaps', cynefin.TitheMaps);
