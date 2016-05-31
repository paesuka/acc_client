'use strict';

/**
 * @ngdoc overview
 * @name accClientApp
 * @description
 * # accClientApp
 *
 * Main module of the application.
 */
angular
  .module('accClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
  }).config(function ($routeProvider) {
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
