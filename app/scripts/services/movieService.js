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
      return $http.get('https://demo2697834.mockable.io/movies').then(function (response) {
        return response.data.entries;
      });
    };
  });
