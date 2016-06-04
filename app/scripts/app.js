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
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay'
  ]).config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/movieList.html',
        controller: 'MovieListCtrl',
        controllerAs: 'movieList'
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

// defining constans to use throughout the application
app.constant('config', {
  apiWatchhistoryUrlDev: 'http://localhost:9000/api/v0/watchhistory/',
  apiWatchhistoryUrl: 'http://immense-tor-76076.herokuapp.com/api/v0/watchhistory/',
  apiMoviesUrlDev: 'http://localhost:9000/api/v0/movies/',
  apiMoviesUrl: 'http://immense-tor-76076.herokuapp.com/api/v0/movies/',
  cookieKey: 'acc-watch-history'
});

// creates a cookie to track watch history of a user over browser sessions
app.run(['$rootScope', '$cookies', 'config', function($rootScope, $cookies, config) {
  var watchHistoryCookie = $cookies.get(config.cookieKey);
  if (!watchHistoryCookie) {
    watchHistoryCookie = new Date().getTime();
    $cookies.put(config.cookieKey, watchHistoryCookie);
  }
  $rootScope.cookie = watchHistoryCookie;
  $rootScope.handleKeyDown = function(event) {
    $rootScope.$broadcast('keydown:' + event.keyCode, event);
  };
}]);
