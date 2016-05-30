'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Controller of the accClientApp
 */
angular.module('accClientApp')
  .controller('MovieCtrl', ['$scope', 'MovieService', function ($scope, MovieService) {
      MovieService.findAll().then(function( data ){
      $scope.movies = data;
    }, function( data ){
        console.log('error : '+ data);
    });
  }]);
