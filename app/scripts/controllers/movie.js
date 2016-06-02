'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Controller of the accClientApp
 */
 angular.module('accClientApp')
   .controller('MovieCtrl', ['$scope', '$uibModal', 'MovieService', 'WatchHistoryService',
    function($scope, $uibModal, MovieService, WatchHistoryService) {

      MovieService.findAll().then(function(data) {
        $scope.movies = data;
      }, function(data) {
        console.log('error : ' + data);
      });

      $scope.slickConfig = {
        enabled: true,
        draggable: true,
        infinite: true,
        variableWidth: true,
        autoplay: false,
        arrows: false,
        slidesToShow: 10,
        slidesToScroll: 1
      };

      $scope.playMovie = function(movieItem) {
        var uibModalInstance = $uibModal.open({
          templateUrl: 'views/moviePlayer.html',
          controller: 'MoviePlayerCtrl',
          resolve: {
            movieUrl: function() {
              return movieItem.contents[0].url;
            }
          }
        });
        uibModalInstance.result.then(function() {}, function() {
          WatchHistoryService.addWatchedMovie(movieItem).then(function(data) {
              console.log('persisted new watch item ' + data);
            },
            function(data) {
              console.log('error persisting new watch item ' + data);
            });
          console.log('modal dismissed at: ' + new Date());
        });
      };
    }
  ]);
