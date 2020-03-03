new Vue({
  el: '#app',
  data: {
    gettingLocation: false,
    errorStr: null,
    planets: {}, //Code that controls planet variables...
    mercury:  {
        location: 'Lackman Library',
        position: {
          lat: 38.581216,
          lng: -94.455392, 
          },
        location: 'Johnny\'s Tavern',
        position: {
          lat: 38.562496,
          lng: -94.475359, 
          }
      },
    venus:  {
        location: 'Shawnee City Hall',
        position: {
          lat: 39.12434,
          lng: -94.425528,
        },
        location: 'Honeywell Aerospace',
        position: {
          lat: 38.561806,
          lng: -94.512330,
        }
    },
    earth:  {
        location: 'Turner High School',
        position: {
          lat: 39.33588,
          lng: -94.42957,
        }
    },
    mars:  {
        location: 'Sporting KC Park',
        position: {
          lat: 39.71699,
          lng: -94.492403,
      }
    },
    ceres:  {
        location: 'Clinton Lake - Hickory Campground',
        position: {
          lat: 38.542862,
          lng: -95.222534,
      }
    },
    jupiter:  {
        location: 'Kansas State Capitol Visitor Center',
        position: {
          lat: 39.048257,
          lng: -95.677630
      }
    },
    saturn:  {
        location: 'Milford Lake - Acorns Resort',
        position: {
          lat: 39.92204,
          lng: -96.535403,
      }
    },
    uranus:  {
        location: 'Gorham, KS',
        position: {
          lat: 38.525410,
          lng: -99.12333,
      }
    },
    neptune:  {
        location: 'Goodland, KS',
        position: {
          lat: 39.21297,
          lng: -101.423666,
      }
    },
    pluto:  {
      location: 'High Plains Raceway - Deer Trail, CO',
      position: {
        lat: 39.44669,
        lng: -103.534422,
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
      this.distance = d.toFixed(2);
    }
  }
});
