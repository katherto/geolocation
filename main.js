function geoFindMe() {
  const jupiter = {
    location: 'Kansas State Capitol Visitor Center',
    position: {
      lat: 39.048257,
      lng: -95.677630
    }
  };

  const status = document.querySelector('#status');

  function success(position) {
    const mk2 = {
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }

    const distance = haversine_distance(jupiter, mk2);
    status.textContent = `You are ${distance.toFixed(2)} miles away from Jupiter (${jupiter.location})`;  // Straight line distance between two lat/long coords in miles
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// Haversine formula for calculating distance between two lat/long coordinates
function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles, 6371.0710 Radius of the Earth in Kilometers
  var rlat1 = mk1.position.lat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng-mk1.position.lng) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
