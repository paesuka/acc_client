'use strict';

/**
 * @ngdoc function
 * @name accClientApp.service:MovieService
 * @description
 * # MovieService
 * Service of the accClientApp
 */
 angular.module('accClientApp')
   .service('MovieService', ['$http', 'config', function($http, config) {
    this.findAll = function() {
      return $http.get(config.apiUrlDev + 'movies').then(function (response) {
        return response.data;
      });
    };
  }]);
