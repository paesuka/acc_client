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
    var rootUrl = config.apiUrlDev + 'watchhistory/';
    this.findByUserId = function(userId) {
      return $http.get(rootUrl + userId).then(function(response) {
        return response.data;
      });
    };
    this.addWatchedMovie = function(movieItem) {
      var watchItem = {
        title: movieItem.title,
        movieId: movieItem.id,
        watchDate: new Date(),
        userId: $rootScope.cookie
      };
      return $http.post(rootUrl, watchItem).then(function(response) {
        return response.data;
      });
    };
  }]);
