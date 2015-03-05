/* Contributors */

google.load('visualization', '1', {'packages': ['corechart', 'table']});

function contributors(basePath) {

  var counties = [{"name": "Radnor", "namecy": "Maesyfed", "collection": "83511215"}, {"name": "Pembroke", "namecy": "Penfro", "collection": "51277134"}, {"name": "Montgomery", "namecy": "Maldwyn", "collection": "19043053"}, {"name": "Monmouth", "namecy": "Mynwy", "collection": "86808972"}, {"name": "Merioneth", "namecy": "Meirionnydd", "collection": "54574891"}, {"name": "Glamorgan", "namecy": "Morgannwg", "collection": "22340810"}, {"name": "Flint", "namecy": "Fflint", "collection": "90106729"}, {"name": "Denbigh", "namecy": "Dinbych", "collection": "57872648"}, {"name": "Carmarthen", "namecy": "Caerfyrddin", "collection": "25638567"}, {"name": "Cardigan", "namecy": "Ceredigion", "collection": "93404486"}, {"name": "Caernarfon", "namecy": "Caernarfon", "collection": "61170405"}, {"name": "Brecknock", "namecy": "Brycheiniog", "collection": "28936324"}, {"name": "Anglesey", "namecy": "Môn", "collection": "96702243"}];

  //draw map
  loadMap(basePath + '/js/counties.topojson');

  //load county from hash
  var hash = document.location.hash;
  if (hash) {
    var county = hash.substring(1);
    var collection = null;
    for (var i = 0; i < counties.length; i++) {
      if (counties[i].name === county || counties[i].namecy === county) {
        collection = counties[i].collection;
        break;
      }
    }
    if (collection !== null) {
      displayCountyStats({
        'properties': {
          'Collection': collection,
          'County': county
        }}, null);
    } else {
      loadAll();
    }
  } else {
    loadAll();
  }

  //filter's handlers
  document.getElementById('cws-filter-all').onclick = loadAll;
  document.getElementById('cws-filter-my').onclick = function() {
    loadUser();
    return false;
  };
  document.getElementById('cws-filter-county').onclick = function() {
    //TODO: if county not selected display warning message
    renderContent('county');
    return false;
  };
  document.getElementById('cws-filter-period').onchange = function() {
    loadAll(this.value);
    return false;
  };
}


/**
 * Filter ux control
 * @param {string} filter
 */
function renderContent(filter) {
  document.getElementById('cws-filter-all').className = '';
  document.getElementById('cws-filter-my').className = '';
  document.getElementById('cws-filter-county').className = '';
  var filterPeriod = document.getElementById('cws-filter-period');

  var blockMy = document.getElementById('cws-my');
  var blockWidgets = document.getElementById('cws-widgets');
  switch (filter) {
    case 'my':
      document.getElementById('cws-filter-my').className = 'active';
      filterPeriod.style.display = 'none';
      blockMy.style.display = 'block';
      blockWidgets.style.display = 'none';
      break;
    case 'county':
      document.getElementById('cws-filter-county').className = 'active';
      filterPeriod.style.display = 'none';
      blockMy.style.display = 'none';
      blockWidgets.style.display = 'block';
      break;
    case 'all':
      document.getElementById('cws-filter-all').className = 'active';
      filterPeriod.style.display = 'block';
      blockMy.style.display = 'none';
      blockWidgets.style.display = 'block';
      break;
  }
}

/**
 * Loads data from whole project
 * @param {string|null} period [day, week, month, total]
 */
function loadAll(period) {
  var periods = ['day', 'week', 'month', 'total'];
  if (periods.indexOf(period) === -1) {
    period = 'total';
  }
  //TODO: use responseHandler:callback
  //TODO: After implemetation on server use link: http://earth.georeferencer.com/repository/15872231/top-contributors.json?callback=google.visualization.Query.setResponse
  var url = 'http://earth.georeferencer.com/repository/15872231/top-contributors.json';
  if (period) {
    url += '?period=' + period;
  }
  drawVisualization(url);
  renderContent('all');
  return false;
}

function loadUser() {
  renderContent('my');
  document.getElementById('cws-filter-period').style.display = 'none';
  document.getElementById('cws-my').style.display = 'block';
  var url = 'http://earth.georeferencer.com/person/current/contributions.json';
  ajax(url, function(resp) {
    var data = JSON.parse(resp);
    var contrib = data.contributions;
    var month = 0, week = 0, day = 0;
    var score = 0;
    for (var i = 0; i < contrib.length; i++) {
      if (contrib[i].period === 'month') {
        month++;
      } else if (contrib[i].period === 'week') {
        week++;
      } else if (contrib[i].period === 'day') {
        day++;
      }
      score += contrib[i].score;
    }
    document.getElementById('cws-my-score').innerHTML = score;
    document.getElementById('cws-my-total').innerHTML = contrib.length;
    document.getElementById('cws-my-month').innerHTML = month;
    document.getElementById('cws-my-week').innerHTML = week;
    document.getElementById('cws-my-day').innerHTML = day;
  }, function() {
    document.getElementById('cws-my').style.display = 'none';
    document.getElementById('cws-my-error').style.display = 'block';
  });
}

/**
 * Draw table and chart from data
 * @param {string} dataSourceUrl
 */
function drawVisualization(dataSourceUrl) {
  var pieContainer = document.getElementById('cws-pie');
  var pie = new google.visualization.PieChart(pieContainer);
  var tableContainer = document.getElementById('cws-table');
  var table = new google.visualization.Table(tableContainer);
  var query = new google.visualization.Query(dataSourceUrl);
  query.send(function(response) {
    if (response.isError()) {
      throw Error(response.getMessage() + ' ' + response.getDetailedMessage());
    } else {
      var dataTable = response.getDataTable();
      pie.draw(dataTable, {
        'legend': {textStyle: {color: 'black', fontName: '"Arial"', fontSize: 11}},
        'width': 450,
        'height': 250,
        'is3D': false,
        'backgroundColor': 'transparent',
        'chartArea.left': 0
      }
      );
      table.draw(dataTable, {showRowNumber: true});
    }
  });
}

/**
 * Load SVG map vie 3djs
 * @param datajson
 */
function loadMap(datajson) {
  //Map dimensions (in pixels)
  var width = 482 / 2, height = 536 / 2;
  //Map projection
  var projection = d3.geo.mercator()
          .scale(8685.203500957907 / 2)
          .center([-4.160270073787833, 52.41566130468677]) //projection center
          .translate([width / 2, height / 2]); //translate to center the map in view

  //Generate paths based on projection
  var path = d3.geo.path()
          .projection(projection);
  //Create an SVG
  var svg = d3.select('#cws-map').append('svg')
          .attr('width', width)
          .attr('height', height);
  //Group for the map features
  var features = svg.append('g')
          .attr('class', 'features');
  //Create a tooltip, hidden at the start
  var tooltip = d3.select('#cws-map').append('div').attr('class', 'tooltip');
  d3.json(datajson, function(error, geodata) {
    if (error)
      return console.log(error); //unknown error, check the console

    //Create a path for each map feature in the data
    features.selectAll('path')
            .data(topojson.feature(geodata, geodata.objects.collection).features) //generate features from TopoJSON
            .enter()
            .append('path')
            .attr('d', path)
            .on('mouseover', showTooltip)
            .on('mousemove', moveTooltip)
            .on('mouseout', hideTooltip)
            .on('click', displayCountyStats);
  });
  //Position of the tooltip relative to the cursor
  var tooltipOffset = {x: -250, y: -300};
  //Create a tooltip, hidden at the start
  function showTooltip(d) {
    moveTooltip();
    tooltip.style('display', 'block')
            .text(d.properties.County);
  }

  //Move the tooltip to track the mouse
  function moveTooltip() {
    tooltip.style('top', (d3.event.pageY + tooltipOffset.y) + 'px')
            .style('left', (d3.event.pageX + tooltipOffset.x) + 'px');
  }

  //Create a tooltip, hidden at the start
  function hideTooltip() {
    tooltip.style('display', 'none');
  }

  // Add optional onClick events for features here
  // d.properties contains the attributes (e.g. d.properties.name, d.properties.population)

}

/**
 * Runs on click on county
 * @param {Object} feature
 * @param {Object} i
 */
function displayCountyStats(feature, i) {
  var attr = feature.properties;
  drawVisualization('http://earth.georeferencer.com/collection/'
          + attr.Collection + '/top-contributors.json');
  var countyFilter = document.getElementById('cws-filter-county');
  renderContent('county');
  countyFilter.innerHTML = attr.County;
  document.location.hash = attr.County;
}

/**
 * Ajax request
 * @param {string} url
 * @param {function} callback
 */
function ajax(url, callback, errorcallback) {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        errorcallback();
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
}