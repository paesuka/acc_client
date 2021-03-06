'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MoviePlayerCtrl
 * @description
 * # MoviePlayerCtrl
 * Handles the movie playback.
 * DOMException while jumping in video, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=593273
 */
angular.module('accClientApp')
  .controller('MoviePlayerCtrl', ['$scope', '$sce', '$uibModalInstance', 'movieContent',
    function($scope, $sce, $uibModalInstance, movieContent) {
      // use specific view model instead of missusing $scope as model, see
      // https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y030
      var vm = this;

      vm.videogularConfig = {
        sources: [{
          src: $sce.trustAsResourceUrl(movieContent.url),
          type: 'video/' + movieContent.format
        }],
        tracks: []
      };

      vm.movieCompleted = function() {
        $uibModalInstance.dismiss();
      };
    }
  ]);
