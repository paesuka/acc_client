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

app.directive('customAutofocus', function() {
  return{
         restrict: 'A',
         link: function(scope, element, attrs){
           scope.$watch(function(){
             return scope.$eval(attrs.customAutofocus);
             },function (newValue){
               if (newValue === true){
                   element[0].focus();//use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
               }
           });
         }
     };
});
