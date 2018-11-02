Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
  chart: {
    style: {
      fontFamily: 'Open Sans'
    }
  }
});

var arr_data = [], curr_year, curr_state, countiesMap, borderLines, separatorLines,
  timer, fromTo;
var natFromTo = [{from: 1, to: 350},
  {from: 351, to: 1000},
  {from: 1001, to: 2500},
  {from: 2501, to: 5000},
  {from: 5001, to: 10000},
  {from: 10001, to: 20000},
  {from: 20001, to: 30000},
  {from: 30001, to: 40000},
  {from: 40001, to: 50000},
  {from: 50000}];
var stfromTo = [
  {state:'ak',fromTo: [{from:1,to:70 },{from:71,to:160 },{from:161,to:460 },{from:461,to:1300 },{from:1301,to:1900 },{from:1901 }]},
  {state:'al',fromTo: [{from:1,to:750 },{from:751,to:1300 },{from:1301,to:2700 },{from:2701,to:5700 },{from:5701,to:11800 },{from:11801 }]},
  {state:'ar',fromTo: [{from:1,to:270 },{from:271,to:720 },{from:721,to:1700 },{from:1701,to:3200 },{from:3201,to:5800 },{from:5801 }]},
  {state:'az',fromTo: [{from:1,to:210 },{from:211,to:560 },{from:561,to:1900 },{from:1901,to:3300 },{from:3301,to:27500 },{from:27501 }]},
  {state:'ca',fromTo: [{from:1,to:280 },{from:281,to:990 },{from:991,to:4900 },{from:4901,to:20800 },{from:20801,to:55100 },{from:55101 }]},
  {state:'co',fromTo: [{from:1,to:40 },{from:41,to:90 },{from:91,to:290 },{from:291,to:2600 },{from:2601,to:14100 },{from:14101 }]},
  {state:'ct',fromTo: [{from:1,to:3800 },{from:3801,to:9000 },{from:9001,to:15600 },{from:15601,to:44800 },{from:44801,to:59700 },{from:59701 }]},
  {state:'dc',fromTo: [{from:1,to:4300 },{from:4301,to:5100 },{from:5101,to:6800 },{from:6801,to:9500 },{from:9501,to:11600 },{from:11601 }]},
  {state:'de',fromTo: [{from:1,to:3700 },{from:3701,to:5700 },{from:5701,to:11300 },{from:11301,to:12800 },{from:12801,to:26000 },{from:26001 }]},
  {state:'fl',fromTo: [{from:1,to:170 },{from:171,to:470 },{from:471,to:1600 },{from:1601,to:5100 },{from:5101,to:24300 },{from:24301 }]},
  {state:'ga',fromTo: [{from:1,to:230 },{from:231,to:580 },{from:581,to:1500 },{from:1501,to:3600 },{from:3601,to:7900 },{from:7901 }]},
  {state:'hi',fromTo: [{from:1,to:420 },{from:421,to:1200 },{from:1201,to:1600 },{from:1601,to:14900 },{from:14901,to:16600 },{from:16601 }]},
  {state:'ia',fromTo: [{from:1,to:280 },{from:281,to:570 },{from:571,to:1100 },{from:1101,to:2200 },{from:2201,to:5300 },{from:5301 }]},
  {state:'id',fromTo: [{from:1,to:50 },{from:51,to:160 },{from:161,to:510 },{from:511,to:1600 },{from:1601,to:3300 },{from:3301 }]},
  {state:'il',fromTo: [{from:1,to:190 },{from:191,to:570 },{from:571,to:1600 },{from:1601,to:4300 },{from:4301,to:13700 },{from:13701 }]},
  {state:'in',fromTo: [{from:1,to:620 },{from:621,to:1600 },{from:1601,to:3000 },{from:3001,to:6700 },{from:6701,to:13500 },{from:13501 }]},
  {state:'ks',fromTo: [{from:1,to:60 },{from:61,to:150 },{from:151,to:390 },{from:391,to:1600 },{from:1601,to:4200 },{from:4201 }]},
  {state:'ky',fromTo: [{from:1,to:200 },{from:201,to:490 },{from:491,to:1200 },{from:1201,to:3000 },{from:3001,to:5000 },{from:5001 }]},
  {state:'la',fromTo: [{from:1,to:250 },{from:251,to:550 },{from:551,to:1400 },{from:1401,to:3000 },{from:3001,to:6800 },{from:6801 }]},
  {state:'ma',fromTo: [{from:1,to:2700 },{from:2701,to:5000 },{from:5001,to:19700 },{from:19701,to:40800 },{from:40801,to:61900 },{from:61901 }]},
  {state:'md',fromTo: [{from:1,to:680 },{from:681,to:1100 },{from:1101,to:4000 },{from:4001,to:7600 },{from:7601,to:14500 },{from:14501 }]},
  {state:'me',fromTo: [{from:1,to:1200 },{from:1201,to:1700 },{from:1701,to:2900 },{from:2901,to:5200 },{from:5201,to:11700 },{from:11701 }]},
  {state:'mi',fromTo: [{from:1,to:300 },{from:301,to:690 },{from:691,to:2300 },{from:2301,to:6100 },{from:6101,to:19100 },{from:19101 }]},
  {state:'mn',fromTo: [{from:1,to:290 },{from:291,to:640 },{from:641,to:1500 },{from:1501,to:3600 },{from:3601,to:7300 },{from:7301 }]},
  {state:'mo',fromTo: [{from:1,to:160 },{from:161,to:370 },{from:371,to:950 },{from:951,to:2200 },{from:2201,to:5500 },{from:5501 }]},
  {state:'ms',fromTo: [{from:1,to:300 },{from:301,to:670 },{from:671,to:1500 },{from:1501,to:3200 },{from:3201,to:5600 },{from:5601 }]},
  {state:'mt',fromTo: [{from:1,to:20 },{from:21,to:50 },{from:51,to:120 },{from:121,to:590 },{from:591,to:2200 },{from:2201 }]},
  {state:'nc',fromTo: [{from:1,to:310 },{from:311,to:1000 },{from:1001,to:3500 },{from:3501,to:7800 },{from:7801,to:16100 },{from:16101 }]},
  {state:'nd',fromTo: [{from:1,to:20 },{from:21,to:60 },{from:61,to:230 },{from:231,to:720 },{from:721,to:1700 },{from:1701 }]},
  {state:'ne',fromTo: [{from:1,to:30 },{from:31,to:110 },{from:111,to:360 },{from:361,to:1200 },{from:1201,to:3900 },{from:3901 }]},
  {state:'nh',fromTo: [{from:1,to:1300 },{from:1301,to:3100 },{from:3101,to:5400 },{from:5401,to:8500 },{from:8501,to:24400 },{from:24401 }]},
  {state:'nj',fromTo: [{from:1,to:2400 },{from:2401,to:5400 },{from:5401,to:12400 },{from:12401,to:23100 },{from:23101,to:40600 },{from:40601 }]},
  {state:'nm',fromTo: [{from:1,to:80 },{from:81,to:140 },{from:141,to:430 },{from:431,to:1000 },{from:1001,to:2900 },{from:2901 }]},
  {state:'nv',fromTo: [{from:1,to:80 },{from:81,to:180 },{from:181,to:530 },{from:531,to:2800 },{from:2801,to:13700 },{from:13701 }]},
  {state:'ny',fromTo: [{from:1,to:1100 },{from:1101,to:2300 },{from:2301,to:4300 },{from:4301,to:9300 },{from:9301,to:26500 },{from:26501 }]},
  {state:'oh',fromTo: [{from:1,to:920 },{from:921,to:2700 },{from:2701,to:5200 },{from:5201,to:9900 },{from:9901,to:21500 },{from:21501 }]},
  {state:'ok',fromTo: [{from:1,to:90 },{from:91,to:230 },{from:231,to:790 },{from:791,to:2300 },{from:2301,to:3600 },{from:3601 }]},
  {state:'or',fromTo: [{from:1,to:430 },{from:431,to:1000 },{from:1001,to:1900 },{from:1901,to:6100 },{from:6101,to:16500 },{from:16501 }]},
  {state:'pa',fromTo: [{from:1,to:870 },{from:871,to:2600 },{from:2601,to:5400 },{from:5401,to:13200 },{from:13201,to:30800 },{from:30801 }]},
  {state:'ri',fromTo: [{from:1,to:2400 },{from:2401,to:3100 },{from:3101,to:7100 },{from:7101,to:12800 },{from:12801,to:38700 },{from:38701 }]},
  {state:'sc',fromTo: [{from:1,to:820 },{from:821,to:1700 },{from:1701,to:4400 },{from:4401,to:7900 },{from:7901,to:11900 },{from:11901 }]},
  {state:'sd',fromTo: [{from:1,to:30 },{from:31,to:70 },{from:71,to:230 },{from:231,to:1000 },{from:1001,to:2800 },{from:2801 }]},
  {state:'tn',fromTo: [{from:1,to:440 },{from:441,to:1100 },{from:1101,to:2200 },{from:2201,to:5200 },{from:5201,to:10100 },{from:10101 }]},
  {state:'tx',fromTo: [{from:1,to:60 },{from:61,to:180 },{from:181,to:860 },{from:861,to:2800 },{from:2801,to:8200 },{from:8201 }]},
  {state:'ut',fromTo: [{from:1,to:50 },{from:51,to:170 },{from:171,to:440 },{from:441,to:3300 },{from:3301,to:12600 },{from:12601 }]},
  {state:'va',fromTo: [{from:1,to:150 },{from:151,to:390 },{from:391,to:1200 },{from:1201,to:3600 },{from:3601,to:6500 },{from:6501 }]},
  {state:'vt',fromTo: [{from:1,to:540 },{from:541,to:1200 },{from:1201,to:2100 },{from:2101,to:2900 },{from:2901,to:4000 },{from:4001 }]},
  {state:'wa',fromTo: [{from:1,to:180 },{from:181,to:540 },{from:541,to:1600 },{from:1601,to:5600 },{from:5601,to:17100 },{from:17101 }]},
  {state:'wi',fromTo: [{from:1,to:400 },{from:401,to:1200 },{from:1201,to:2900 },{from:2901,to:8800 },{from:8801,to:19500 },{from:19501 }]},
  {state:'wv',fromTo: [{from:1,to:120 },{from:121,to:280 },{from:281,to:780 },{from:781,to:1600 },{from:1601,to:2900 },{from:2901 }]},
  {state:'wy',fromTo: [{from:1,to:60 },{from:61,to:130 },{from:131,to:310 },{from:311,to:500 },{from:501,to:1400 },{from:1401 }]}
];
function pushData(dobj, things) {
  'use strict';
  dobj.push({
    'year': parseFloat(things[3]),
    'state': things[4],
    'code': String(things[5]).replace(/\r/g, ""),
    'name': String(things[1]).replace(/\"/g, ""),
    'value': parseInt(things[2])
  });
}

function drawMap(st) {
  var maplines, maptouse;
  maptouse = 'countries/us/us-' + st + '-all';
  countiesMap = Highcharts.geojson(Highcharts.maps[maptouse]),
  // Extract the line paths from the GeoJSON
  maplines = Highcharts.geojson(Highcharts.maps[maptouse], 'mapline'),
  // Filter out the state borders and separator lines, we want these in separate series
  borderLines = Highcharts.grep(maplines, function (l) {
      return l.properties['hc-group'] === '__border_lines__';
  }),
  separatorLines = Highcharts.grep(maplines, function (l) {
      return l.properties['hc-group'] === '__separator_lines__';
  });

  // Add state acronym for tooltip
  Highcharts.each(countiesMap, function (mapPoint) {
      mapPoint.name = mapPoint.name + ', ' + mapPoint.properties['hc-key'].substr(3, 2).toUpperCase();
  });
  // Create the map
  Highcharts.mapChart('mapcontainer', {
    chart: {
      borderWidth: 1,
      marginRight: 20 // for the legend
    },

    title: {
      text: 'Manufacturing employment, ' + curr_year
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      floating: true,
      valueDecimals: 0,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'
    },

    mapNavigation: {
      enabled: true
    },

    colorAxis: {
      dataClasses: fromTo
    },
    // colorAxis: {
    //   min: 1,
    //   max: 500000,
    //   minColor: '#e6e6ff',
    //   maxColor: '#000066',
    //   type: 'logarithmic'
    //   /*
    //   tickInterval: 100,
    //   stops: [
    //     [0, '#e6e6ff'],
    //     [0.00005,'#ccccff'],
    //     [0.0001,'#b3b3ff'],
    //     [0.001,'#9999ff'],
    //     [0.005,'#8080ff'],
    //     [0.01,'#6666ff'],
    //     [0.05,'#4d4dff'],
    //     [0.1,'#3333ff'],
    //     [0.2,'#1a1aff'],
    //     [0.4,'#0000ff'],
    //     [0.6,'#0000b3'],
    //     [0.9, '000066']
    //   ],
    //   labels: {
    //     format: '{value:,.0f}'
    //   }
    //   */
    // },
    plotOptions: {
      mapline: {
        showInLegend: false,
        enableMouseTracking: false
      }
    },
    credits: {
      enabled: false
    },

    series: [{
      mapData: countiesMap,
      data: curr_data,
      joinBy: ['hc-key', 'code'],
      name: 'Manufacturing employment',
      borderWidth: 0.5,
      states: {
          hover: {
              color: '#a4edba'
          }
      }
    }, {
      type: 'mapline',
      name: 'State borders',
      data: borderLines,
      color: 'white'
    }, {
      type: 'mapline',
      name: 'Separator',
      data: separatorLines,
      color: 'gray'
    }]
  });
}

function filterData() {
  if (curr_state === 'all') {
    curr_data = $.grep(arr_data, function (n, i) {
      return n.year === curr_year;
    });
    fromTo = natFromTo;
    drawMap(st='all');
  } else {
    curr_data = $.grep(arr_data, function (n, i) {
      return n.year === curr_year && n.state === curr_state;
    });
    fromTo = $.grep(stfromTo, function(n,i){
      return n.state === curr_state;
    });
    fromTo = fromTo[0].fromTo;
    drawMap(st=curr_state);
  }
}

$.get('qcew-annual-cty-files.txt', function (data) {

  datalines = data.split('\n');
  $.each(datalines, function (lineNo, line) {
  items = line.split('\t');
  if (lineNo > 0) {
    pushData(arr_data, items);
  }
  });
  curr_year = 1990;
  curr_state = 'all';
  curr_data = $.grep(arr_data, function (n, i) {
    return n.year === curr_year;
  });
  fromTo = natFromTo;
  drawMap(st=curr_state);
  $("#date-sel").change(function () {
    curr_year = parseInt(this.value);
    filterData();
    // this.selectedIndex = 0;
  });
  $("#state-sel").change(function () {
    curr_state = this.value;
    filterData();
  });
  $("#bbackward").click(function () {
    curr_year = 1990;
    filterData();
  });
  $("#bforward").click(function () {
    curr_year = 2016;
    filterData();
  });
  $("#bsbackward").click(function () {
    if (curr_year > 1990) {
      curr_year = curr_year - 1;
      filterData();
    };
  });
  $("#bsforward").click(function () {
    if (curr_year < 2016) {
      curr_year = curr_year + 1;
      filterData();
    };
  });
  $("#startPlay").click(function () {
      curr_year = 1990;
      $("#bsforward").click();
      timer = setInterval(function() { /* setTimeout? */
        if (curr_year === 2016) {
          clearInterval(timer);
        }
        $("#bsforward").click();
      }, 1000);
  });

  $("#stopPlay").click(function () {
    clearInterval(timer);
  });

});
