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
   * @type {!Array.<number>}
   * @private
   */
  this.shiftedCenter_ = [];

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
    this.calcShiftedCenter_();
    this.centerOnLonLat_([-3.9001, 52.3118]);
  }, this);

  /**
   * @type {!cynefin.Counties}
   * @private
   */
  this.counties_ = new cynefin.Counties();

  this.counties_.listen('opened', function(e) {
    if (this.view_.getZoom() < 9) this.centerOnLonLat_(e.center);
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
 * @private
 */
cynefin.TitheMaps.prototype.calcShiftedCenter_ = function() {
  var mapSize = this.map_.getSize();
  var panel = goog.dom.getElement('application-panel');
  if (panel) {
    this.shiftedCenter_ = [
      (mapSize[0] + goog.style.getSize(panel).width) / 2,
      (mapSize[1]) / 2
    ];
  }
};


/**
 * @param {ol.Coordinate} coord
 * @private
 */
cynefin.TitheMaps.prototype.centerOnLonLat_ = function(coord) {
  coord = ol.proj.transform(coord, 'EPSG:4326', 'EPSG:3857');
  if (!coord) return;

  var oldCenter = this.view_.getCenter();
  if (oldCenter) {
    this.map_.beforeRender(ol.animation.pan({
      duration: 300,
      source: oldCenter
    }));
  }

  var mapSize = this.map_.getSize();
  if (this.shiftedCenter_ && mapSize) {
    this.view_.centerOn(coord, mapSize, this.shiftedCenter_);
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
};


/**
 * @param {Object} data Data from the UTFGrid.
 * @private
 */
cynefin.TitheMaps.prototype.handleMapSingleClick_ = function(data) {
  window['console']['log'](data);
  if (data) {
    var name = data['County'];
    if (goog.isString(name)) {
      var filterByParish = goog.bind(function() {
        if (this.view_.getZoom() > 9) {
          this.counties_.createFilterFromParishId(data['SHAPE_ID'].toString());
        }
      }, this);
      if (name != this.counties_.getActiveCountyName()) {
        this.counties_.openCounty(name, filterByParish);
      } else {
        filterByParish();
      }
    }
  }
};


goog.exportSymbol('TitheMaps', cynefin.TitheMaps);
