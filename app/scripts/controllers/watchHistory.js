'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:WatchHistoryCtrl
 * @description
 * # WatchHistoryCtrl
 * Controller of the accClientApp
 */
angular.module('accClientApp')
  .controller('WatchHistoryCtrl', ['$scope', '$rootScope', 'WatchHistoryService',
    function($scope, $rootScope, WatchHistoryService) {
      WatchHistoryService.findByUserId($rootScope.cookie).then(function(data) {
        $scope.watchHistory = data.sort(sortWatchItem);
      }, function(data) {
        console.log('error : ' + data);
      });

      function sortWatchItem(left, right) {
        return new Date(right.watchDate).getTime() - new Date(left.watchDate).getTime();
      }
    }
  ]);
