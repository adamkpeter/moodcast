app.service('weatherService', function($http, $q, $cordovaGeolocation) {
  // We might need these? idk
  var clientId = "dj0yJmk9WXZDSWRIMmhCUkxBJmQ9WVdrOWIydGlVMFpoTnpBbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01NA--";
  var consumerSecret = "0b872dd5b7d8c93befffaa4b18c74d745f51bc79";


  this.getLatAndLong = function() {

    var deferred = $q.defer();
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
      .then(function (position) {
        console.log(position);
        deferred.resolve({
          "longitude": position.coords.longitude,
          "latitude": position.coords.latitude
        });
      }, function(err){
        deferred.reject();
      });

    return deferred.promise;

  };

  /**
   * Gets the weather and returns the code, temperature, and text description.
   * @returns {Promise} of the results.
   */
  this.getWeather = function(latitude, longitude){
    var deferred = $q.defer();

    $http.get(
      "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in "+
      "(select woeid from geo.places(1) where text='("+latitude+","+longitude+")')&format=json"
    ).then(function(res){
      console.log(res);
      deferred.resolve(res.data.query.results.channel.item.condition);
    }, function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };


});
