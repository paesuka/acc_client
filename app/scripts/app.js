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
    'slickCarousel'
  ]).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
  }).config(function($routeProvider) {
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
}]);
