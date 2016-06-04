'use strict';

/**
 * @ngdoc function
 * @name accClientApp.service:MovieService
 * @description
 * # MovieService
 * Gather all available movies from backend.
 */
 angular.module('accClientApp')
   .service('MovieService', ['$http', 'config', function($http, config) {

    this.findAll = function() {
      return $http.get(config.apiMoviesUrlDev).then(function (response) {
        return response.data;
      }, function(response) {
        console.log('error: failed to retrieve movies' + response);
      });
    };
  }]);
