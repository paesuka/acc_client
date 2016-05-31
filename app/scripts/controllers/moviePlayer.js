'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MoviePlayerCtrl
 * @description
 * # MoviePlayerCtrl
 * Controller of the accClientApp
 */
angular.module('accClientApp')
  .controller('MoviePlayerCtrl', ['$scope', 'movieUrl', function($scope, movieUrl) {
    $scope.movieUrl = movieUrl;
  }]);
