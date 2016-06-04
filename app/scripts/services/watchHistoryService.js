'use strict';

/**
 * @ngdoc function
 * @name accClientApp.service:WatchHistoryService
 * @description
 * # WatchHistoryService
 * Service of the accClientApp
 */
 angular.module('accClientApp')
   .service('WatchHistoryService', ['$http', '$rootScope', 'config', function($http, $rootScope, config) {

    this.findByUserId = function(userId) {
      return $http.get(config.apiWatchhistoryUrlDev + userId).then(function(response) {
        return response.data;
      }, function(response) {
        console.log('error: failed to retrieve watchHistory' + response);
      });
    };

    this.addWatchedMovie = function(movieItem) {
      var watchItem = {
        title: movieItem.title,
        movieId: movieItem.id,
        watchDate: new Date(),
        userId: $rootScope.cookie
      };
      return $http.post(config.apiWatchhistoryUrlDev, watchItem).then(function(response) {
        return response.data;
      }, function(response) {
        console.log('error: failed to persist watchItem ' + response);
      });
    };
  }]);
