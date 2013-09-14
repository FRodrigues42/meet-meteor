Players = new Meteor.Collection("players");

if (Meteor.isClient) { 
  Meteor.startup(function () {
    initMap();
    startWatchingGeolocation();
    Deps.autorun(function () {
      renderAllTheMakers();
    });
  });
}

// Set up the Leaflet map
function initMap () {
  var zoom = 2;
  var center = [20,0];
  map = L.map('map').setView(center, zoom);

  L.tileLayer("http://{s}tile.stamen.com/toner/{z}/{x}/{y}.png", {
    "minZoom":      0,
    "maxZoom":      20,
    "subdomains":   ["", "a.", "b.", "c.", "d."],
    "scheme":       "xyz"
  }).addTo(map);

  return map;
}

// Find out where you are
function startWatchingGeolocation(){
  if (!navigator.geolocation) {
    console.error('geolocation not supported');
    return
  }

  navigator.geolocation.watchPosition(
    onPosition, 
    onError, 
    {enableHighAccuracy:false, maximumAge:60000, timeout:100000}
  );
}

function onPosition(p) {
  if (!p.coords.latitude || !p.coords.longitude){
    console.warn("Position doesn't have lat/lng. Ignoring", pos);
    return; // we don't want yer lousy geolocation anyway.
  }

  var pos = {
    timestamp: p.timestamp,
    coords: {
      latitude: p.coords.latitude,
      longitude: p.coords.longitude,
    }
  }

  var playerId = retrieveOrCreatePlayer();

  Players.update(playerId, { $set: { position: pos } });

  if (!Session.get('hasCenteredMap')){
    var zoom = 6;
    map.setView([pos.coords.latitude, pos.coords.longitude], zoom);
    Session.set('hasCenteredMap', true);
  }
}

function renderAllTheMakers () {
  Players.find().fetch().forEach(function(p){
    updateOrCreateMarker(p);
  })
}

function updateOrCreateMarker (player) {
  if (!player || !player.position || !player.position.coords){
    return;
  }

  var marker = findMarker(player) || createMarker(player);
  console.log('marker', marker);
  marker.setLatLng([player.position.coords.latitude, player.position.coords.longitude]);
}

function findMarker (player) {  
  for (var layer in map._layers){
    if (layer.playerId === player._id){
      return layer;
    }
  }
}

function createMarker (player) {

  var marker = new L.Marker([player.position.coords.latitude, player.position.coords.latitude], {
    opacity: 0.9,
    riseOnHover: true,
    title: player._id
  });

  marker.playerId = player._id;

  marker.addTo(map);

  return marker;
}

function retrieveOrCreatePlayer(){
  var playerId = window.localStorage['playerId'];
  
  if (!playerId){ // Never seen you before
    playerId = Players.insert({ created: Date.now() });
    window.localStorage['playerId'] = playerId;

  } else {
    var player = Players.findOne(playerId);
    
    if (!player){ // Are you still in the db?
      console.log('Player not found, db probably got wiped, recreating now.');
      Players.insert({ _id: playerId, created: Date.now() });
    }
  }

  Session.set('playerId', playerId);

  console.log('playerId', playerId);

  return playerId;
}

function onError(err) {
  console.error(err);
} 
