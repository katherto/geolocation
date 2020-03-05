new Vue({
  el: '#app',
  data: {
    gettingLocation: false,
    errorStr: null,
    //This data is based on the original caluclations where Neptune intersects Goodland...will change.
    planets: {
    mercury: [{
        location: 'Lackman Library',
        position: {
          lat: 38.581216,
          lng: -94.455392, 
        }
      },
      {
        location: 'Sar-Ko-Par Trails Park',
        position: {
          lat: 38.581312,
          lng: -94.453090, 
        }
      },
      {
        location: 'Advanced Laser Tag',
        position: {
          lat: 38.53706,
          lng: -94.465159, 
        }
      },
      {
        location: 'Olathe Lanes East Bowling Center',
        position: {
          lat: 38.53610,
          lng: -94.47728, 
        }
      },
      {
        location: 'Johnson County Library Central Resource',
        position: {
          lat: 38.581196,
          lng: -94.415812, 
        }
      },
      {
        location: 'Brewbakers Bar and Grill',
        position: {
          lat: 38.572503,
          lng: -94.465027, 
        }
      },
      {
        location: 'Johnny\'s Tavern',
        position: {
          lat: 38.562496,
          lng: -94.475359, 
          }
      }],

    venus: [{
        location: 'Shawnee City Hall',
        position: {
          lat: 39.12434,
          lng: -94.425528,
          }
        },
        {
          location: 'Forest View Elementary School',
          position: {
            lat: 38.54023,
            lng: -94.513198,
          }
        },
        {
          location: 'Olathe West High School',
          position: {
            lat: 38.53611,
            lng: -94.511734,
          }
        },
        {
          location: 'A Place in Time Antiques and Flea Market',
          position: {
            lat: 38.52486,
            lng: -94.502190,
          }
        },
        {
          location: 'Johnson County Archives',
          position: {
            lat: 38.502666,
            lng: -94.483144,
          }
        },
        {
          location: 'Heritage Park Disc Golf Course',
          position: {
            lat: 38.493320,
            lng: -94.444995,
          }
        },
        {
          location: 'Leawood City Park',
          position: {
            lat: 38.555387,
            lng: -94.365820,
          }
        },
        {
          location: 'Deanna Rose Farmstead',
          position: {
            lat: 38.523967,
            lng: -94.421205,
          }
        },
        {
          location: 'Porter Park',
          position: {
            lat: 38.594444,
            lng: -94.382237,
          }
        },
        {
          location: 'Mohawk Park',
          position: {
            lat: 39.02878,
            lng: -94.392514,
          }
        },
        {
        location: 'Honeywell Aerospace',
        position: {
          lat: 38.561806,
          lng: -94.512330,
        }
    }],

    earth: [{
        location: 'Turner High School',
        position: {
          lat: 39.33588,
          lng: -94.42957,
          }
        },
        {
        location: 'National Agriculture Center',
        position: {
          lat: 39.62906,
          lng: -94.522745,
        }
    }],

    mars: [{
        location: 'Sporting KC Park',
        position: {
          lat: 39.71699,
          lng: -94.492403,
      }
    }],

    ceres: [{
        location: 'Clinton Lake - Hickory Campground',
        position: {
          lat: 38.542862,
          lng: -95.222534,
      }
    }],
    
    jupiter:  [{
        location: 'Kansas State Capitol Visitor Center',
        position: {
          lat: 39.048257,
          lng: -95.677630
      }
    }],

    saturn: [{
        location: 'Milford Lake - Acorns Resort',
        position: {
          lat: 39.92204,
          lng: -96.535403,
      }
    }],

    uranus: [{
        location: 'Gorham, KS',
        position: {
          lat: 38.525410,
          lng: -99.12333,
      }
    }],

    neptune: [{
        location: 'Goodland, KS',
        position: {
          lat: 39.21297,
          lng: -101.423666,
      }
    }],

    pluto: [{
      location: 'High Plains Raceway - Deer Trail, CO',
      position: {
        lat: 39.44669,
        lng: -103.534422,
      }
    }],

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
