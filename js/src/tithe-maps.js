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
goog.require('klokantech.Nominatim');
goog.require('ol.Map');
goog.require('ol.Overlay');
goog.require('ol.View');
goog.require('ol.animation');
goog.require('ol.layer.Tile');
goog.require('ol.source.TileJSON');
goog.require('ol.source.TileUTFGrid');



/**
 * @constructor
 */
cynefin.TitheMaps = function() {
  var extentLL = [-5.3642, 51.3776, -2.6334, 53.4369]; // close fit for geocoder
  var extent = ol.proj.transformExtent(extentLL, 'EPSG:4326', 'EPSG:3857');
  var viewConstraintExtent = ol.extent.clone(extent);
  ol.extent.scaleFromCenter(viewConstraintExtent, 2); // view constraint
  var initFitExtent = ol.extent.clone(extent);
  ol.extent.scaleFromCenter(initFitExtent, 1.2); // initial fitExtent

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
    extent: viewConstraintExtent,
    zoom: 7,
    minZoom: 6,
    maxZoom: 14
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
    var mapSize = this.map_.getSize();
    if (mapSize) {
      this.view_.fitExtent(initFitExtent, mapSize);
    } else {
      this.centerOn_([-3.9001, 52.3118], true);
    }
  }, this);

  /* ZOOM CONTROLS */
  var zoomBtn = goog.bind(function(delta, e) {
    var curRes = this.view_.getResolution() || 1;
    this.map_.beforeRender(ol.animation.zoom({
      resolution: curRes,
      duration: 250,
      easing: ol.easing.easeOut
    }));
    this.view_.setResolution(this.view_.constrainResolution(curRes, delta));
    e.preventDefault();
  }, this);
  goog.events.listen(goog.dom.getElement('map-zoom-in'),
      goog.events.EventType.CLICK, function(e) {zoomBtn(1, e);});
  goog.events.listen(goog.dom.getElement('map-zoom-out'),
      goog.events.EventType.CLICK, function(e) {zoomBtn(-1, e);});

  /* GEOCODER */
  var geocoderElement = goog.dom.getElement('nominatim-input');
  if (geocoderElement) {
    var ac = new klokantech.Nominatim(geocoderElement, undefined,
                                      undefined, extentLL);

    var handleResult = goog.bind(function(result) {
      this.searchResultOverlay_.setPosition(undefined);
      if (result) {
        var proj = this.view_.getProjection();
        var trans = ol.proj.getTransform('EPSG:4326', proj);

        var ext = result['bounds'] || result['viewport'];
        var mapSize = this.getMapSize_();
        if (ext && mapSize) {
          var transExt = ol.extent.applyTransform(ext, trans);
          ol.extent.scaleFromCenter(transExt, 1.33); //extend by 33%
          this.view_.fitExtent(transExt, mapSize);
          this.centerOn_(this.view_.getCenter());
          this.view_.setResolution(
              this.view_.constrainResolution(this.view_.getResolution()));
        }

        var ll = [result['lon'], result['lat']];
        if (ll && this.view_.getZoom() > 9) { // don't do when zoomed out
          var coord = trans(ll);
          var res = this.view_.getResolution() || 1;
          this.utfGridSource_.forDataAtCoordinateAndResolution(coord, res,
              function(data) {
                if (data) {
                  var name = data['County'], parishId = data['SHAPE_ID'];
                  if (name && parishId) {
                    this.dontSetCenter_ = true;
                    this.counties_.openCounty(name, goog.bind(function() {
                      this.counties_.createFilterFromParishId(
                          parishId.toString());
                    }, this));
                    this.centerOn_(coord);
                    this.dontSetCenter_ = false;
                    this.searchResultOverlay_.setPosition(coord);
                  }
                }
              }, this);
        }
      }
    }, this);

    goog.events.listen(ac, goog.ui.ac.AutoComplete.EventType.UPDATE,
        function(e) {
          handleResult(e.row);
          e.preventDefault();
        });

    var geocoder_search = function(e) {
      e.preventDefault();
      ac.search(geocoderElement.value, 1, function(tok, results) {
        handleResult(results[0]);
      });
    };
    var form = goog.dom.getAncestorByTagNameAndClass(geocoderElement,
                                                     goog.dom.TagName.FORM);
    goog.events.listen(form, goog.events.EventType.SUBMIT, geocoder_search);
  }

  /**
   * @type {!ol.Overlay}
   * @private
   */
  this.searchResultOverlay_ = new ol.Overlay({
    element: goog.dom.createDom(
        goog.dom.TagName.DIV,
        {'class': 'search-marker'})
  });
  this.map_.addOverlay(this.searchResultOverlay_);

  this.view_.on(ol.ObjectEventType.PROPERTYCHANGE, function() {
    if (goog.isDefAndNotNull(this.searchResultOverlay_.getPosition())) {
      this.searchResultOverlay_.setPosition(undefined);
      geocoderElement.value = '';
    }
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
      this.centerOn_(e.center, true, currentZoom == 10);
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
 * @return {number}
 * @private
 */
cynefin.TitheMaps.prototype.getMapLeftOffset_ = function() {
  var panel = goog.dom.getElement('application-panel');
  return panel ? goog.style.getSize(panel).width + 30 : 0;
};


/**
 * @return {ol.Size|undefined}
 * @private
 */
cynefin.TitheMaps.prototype.getMapSize_ = function() {
  var mapSize = this.map_.getSize();
  if (mapSize) {
    mapSize = [mapSize[0] - this.getMapLeftOffset_(), mapSize[1]];
  }
  return mapSize;
};


/**
 * @param {ol.Coordinate|undefined} coord
 * @param {boolean=} opt_ll
 * @param {boolean=} opt_anim
 * @private
 */
cynefin.TitheMaps.prototype.centerOn_ = function(coord, opt_ll, opt_anim) {
  if (!coord) return;
  if (opt_ll) coord = ol.proj.transform(coord, 'EPSG:4326', 'EPSG:3857');

  var oldCenter = this.view_.getCenter();
  if (opt_anim && oldCenter) {
    this.map_.beforeRender(ol.animation.pan({
      duration: 300,
      source: oldCenter
    }));
  }

  var mapSize = this.map_.getSize();
  var shiftedCenter = [
    (mapSize[0] + this.getMapLeftOffset_()) / 2,
    (mapSize[1]) / 2
  ];

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
      this.dontSetCenter_ = true;
      this.counties_.openCounty(name, filterByParish);
      this.dontSetCenter_ = false;
    }
  }
};


goog.exportSymbol('TitheMaps', cynefin.TitheMaps);
