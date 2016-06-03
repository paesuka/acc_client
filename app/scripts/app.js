'use strict';

/**
 * @ngdoc overview
 * @name accClientApp
 * @description
 * # accClientApp
 *
 * Main module of the application.
 */
var app = angular
  .module('accClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'slickCarousel',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls'
  ]).config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/movie.html',
        controller: 'MovieCtrl',
        controllerAs: 'movie'
      })
      .when('/watchhistory', {
        templateUrl: 'views/watchHistory.html',
        controller: 'WatchHistoryCtrl',
        controllerAs: 'watchHistory'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/**
 * Defining constans to use through the application
 */
app.constant('config', {
  apiUrlDev: 'http://localhost:9000/api/v0/',
  apiUrl: 'https://immense-tor-76076.herokuapp.com/api/v0/'
});

/**
 * Creates a cookie to track watch history of a user over browser sessions
 */
app.run(['$rootScope', '$cookies', function($rootScope, $cookies) {
  var watchHistoryCookie = $cookies.get('acc-watch-history');
  if (!watchHistoryCookie) {
    var date = new Date();
    watchHistoryCookie = date.getTime();
    $cookies.put('acc-watch-history', watchHistoryCookie);
  }
  $rootScope.cookie = watchHistoryCookie;
  $rootScope.handleKeyDown = function(event) {
    $rootScope.$broadcast('keydown:' + event.keyCode, event);
  };
}]);
