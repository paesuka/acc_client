'use strict';

/**
 * @ngdoc function
 * @name accClientApp.service:MovieService
 * @description
 * # MovieService
 * Service of the accClientApp
 */
 angular.module('accClientApp')
   .service('MovieService', function($http) {
    this.findAll = function() {
      return $http.get('http://localhost:9000/api/v0/movies').then(function (response) {
        return response.data;
      });
    };
  });
