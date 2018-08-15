var x = 121.0165, y = 14.5123;

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
  view: new ol.View({
    projection:"EPSG:4326",
    center: [x, y],
    zoom: 7,
    minZoom: 5,
    maxZoom: 12,
    extent: [x, y, x, y]
  })
});
