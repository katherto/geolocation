new Vue({
  el: '#app',
  data: {
    gettingLocation: false,
    errorStr: null,
    jupiter:  {
      location: 'Kansas State Capitol Visitor Center',
      position: {
        lat: 39.048257,
        lng: -95.677630
      }
    },
    userMark: {
      position: {
        lat: null,
        lng: null
      }
    },
    distance: null
  },
  created() {
    // Checks for browser Geolocation support
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not supported by your browser.';
      return;
    }

    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.userMark.position.lat = pos.coords.latitude;
      this.userMark.position.lng = pos.coords.longitude;
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
  },
  methods: {
    // Haversine formula for calculating distance between two lat/long coordinates
    haversineDistance() {
      var R = 3958.8; // Radius of the Earth in miles, 6371.0710 Radius of the Earth in Kilometers
      var rlat1 = this.jupiter.position.lat * (Math.PI/180); // Convert degrees to radians
      var rlat2 = this.userMark.position.lat * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (this.userMark.position.lng-this.jupiter.position.lng) * (Math.PI/180); // Radian difference (longitudes)
    
      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      this.distance = d;
    }
  }
});
