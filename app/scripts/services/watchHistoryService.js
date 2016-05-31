'use strict';

/**
 * @ngdoc function
 * @name accClientApp.service:WatchHistoryService
 * @description
 * # WatchHistoryService
 * Service of the accClientApp
 */
angular.module('accClientApp')
  .service('WatchHistoryService', function($http) {
    var rootUrl = 'http://localhost:9000/api/v0/watchhistory/';
    this.findBySession = function(session) {
      return $http.get(rootUrl + session).then(function(response) {
        return response.data;
      });
    };
    this.persist = function(movieItem) {
      return $http.post(rootUrl, movieItem).then(function(response) {
        return response.data;
      });
    };
  });
