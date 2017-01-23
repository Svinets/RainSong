angular.module('rain.weather', [])

.controller('weatherControl', function($scope, Weather, Video, $sce) {

  var getPlaylist = function(weather) {
    Video.getVid(data.weather[0].main).then(function(data){
      var playlist = data.items.map(function(item){
        return item.id.videoId;
      });
      var firstVid = playlist.shift();
      playlist = playlist.join(',')
      $scope.data = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + firstVid + '?playlist=' + playlist + '&autoplay=1&loop=1');
    });
  }

  $scope.getWeatherGeoLocation = function() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    .then(function(geo) {
      return [geo.coords.latitude, geo.coords.longitude];
    })
    .then(function(loc) {
      Weather.getWeatherByCoords(loc[0], loc[1]).then(function(data) {
				console.log(data.weather[0].main)
		    Video.getVid(data.weather[0].main).then(function(data){
		    	$scope.playlist = data.items;
					var playlist = data.items.map(function(item){
						return item.id.videoId;
					})
					console.log(data.items);
					shuffle(playlist);
					var firstVid = playlist.shift();
					playlist = playlist.join(',');
					$scope.data = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + firstVid + '?playlist=' + playlist + '&autoplay=1&loop=1');
				});
      });
    });
  }

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}
});