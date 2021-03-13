
var map = L.map('map').setView([38.89820, -77.03009], 12);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);

var info = L.control();
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this._div.innerHTML = '<h3 class="header">DC plant (shop) map</h3>' +
    'A work-in-progress map showing places to buy plants in and near DC. For errors and suggestions please email <a href="mailto:dan.b.joseph@gmail.com">dan.b.joseph@gmail.com</a> or find me <a href="https://twitter.com/danbjoseph">@danbjoseph</a>.'; 
  return this._div;
};
info.addTo(map);

var greenIcon = L.icon({
  iconUrl: 'img/marker-limegreen.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize:     [25, 36], // size of the icon
  shadowSize:   [41, 41], // size of the shadow
  iconAnchor:   [12, 35], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 38],  // the same for the shadow
  popupAnchor:  [0, -37] // point from which the popup should open relative to the iconAnchor
});

function onEachFeature(feature, layer) {
  if (feature.properties) {
    var popupContent = 
      ( (feature.properties.name.length > 0) ? "<b>" + feature.properties.name + "</b><br>" : "<em>name missing!</em>" ) +
      ( (feature.properties.note.length > 0) ? "<em>" + feature.properties.note + "</em><br>" : "" ) +
      ( (feature.properties.phone.length > 0) ? feature.properties.phone + "<br>" : "" ) +
      ( (feature.properties.address.length > 0) ? feature.properties.address + "<br>" : "" ) +
      ( (feature.properties.web.length > 0) ? "<a href=" + '"' + feature.properties.web + '"' + ">"+ feature.properties.web  +"</a>" : "" )
    layer.bindPopup(popupContent);
  }
}

$.getJSON( "data/plant_stores.json", function( stores ) {
  L.geoJSON(stores, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: greenIcon});
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});
