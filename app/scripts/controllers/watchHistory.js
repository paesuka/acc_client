'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:WatchHistoryCtrl
 * @description
 * # WatchHistoryCtrl
 * Controller of the accClientApp
 */
angular.module('accClientApp')
  .controller('WatchHistoryCtrl', ['$scope', 'WatchHistoryService', function ($scope, WatchHistoryService) {
      WatchHistoryService.findBySession('sess1').then(function(data){
      $scope.watchHistory = data;
    }, function(data){
        console.log('error : '+ data);
    });
  }]);
