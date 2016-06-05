'use strict';

/**
 * @ngdoc function
 * @name accClientApp.service:WatchHistoryService
 * @description
 * # WatchHistoryService
 * Handles delievering and persisting of the watch history.
 */
 angular.module('accClientApp')
   .service('WatchHistoryService', ['$http', '$localStorage', 'config', function($http, $localStorage, config) {

    this.findByCurrentUser = function() {
      return $http.get(config.apiWatchhistoryUrlDev + $localStorage.cookie).then(function(response) {
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
        userId: $localStorage.cookie
      };
      return $http.post(config.apiWatchhistoryUrlDev, watchItem).then(function(response) {
        return response.data;
      }, function(response) {
        console.log('error: failed to persist watchItem ' + response);
      });
    };
  }]);
