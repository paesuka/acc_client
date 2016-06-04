'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:WatchHistoryCtrl
 * @description
 * # WatchHistoryCtrl
 * Presents a list of previously watched movies.
 */
angular.module('accClientApp')
  .controller('WatchHistoryCtrl', ['$scope', '$rootScope', 'WatchHistoryService',
    function($scope, $rootScope, WatchHistoryService) {
      // use specific view model instead of missusing $scope as model, see
      // https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y030
      var vm = this;

      WatchHistoryService.findByUserId($rootScope.cookie).then(function(data) {
        vm.watchItems = data.sort(sortWatchItemDateDesc);
      }, function(data) {
        console.log('error: ' + data);
      });

      function sortWatchItemDateDesc(left, right) {
        return new Date(right.watchDate).getTime() - new Date(left.watchDate).getTime();
      }
    }
  ]);
