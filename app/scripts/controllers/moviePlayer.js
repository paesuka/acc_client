'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MoviePlayerCtrl
 * @description
 * # MoviePlayerCtrl
 * Handles the movie playback.
 */
angular.module('accClientApp')
  .controller('MoviePlayerCtrl', ['$scope', '$sce', '$uibModalInstance', 'movieContent',
    function($scope, $sce, $uibModalInstance, movieContent) {

      $scope.config = {
        sources: [{
          src: $sce.trustAsResourceUrl(movieContent.url),
          type: 'video/' + movieContent.format
        }],
        tracks: []
      };

      $scope.movieCompleted = function() {
        $uibModalInstance.dismiss();
      };
    }
  ]);
