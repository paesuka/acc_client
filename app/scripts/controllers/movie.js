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

      $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: true,
        infinite: true,
        arrows: false,
        slidesToShow: 10,
        variableWidth: true,
        slidesToScroll: 1,
        method: {},
        event: {
          beforeChange: function(event, slick, currentSlide, nextSlide) {},
          afterChange: function(event, slick, currentSlide, nextSlide) {},
          init: function(event, slick, currentSlide, nextSlide) {}
        }
      };

      $scope.toggleSlick = function() {
        $scope.slickConfig.enabled = !$scope.slickConfig.enabled;
      };

      MovieService.findAll().then(function(data) {
        $scope.movies = data;
      }, function(data) {
        console.log('error : ' + data);
      });

      $scope.playMovie = function(movieItem) {
        var uibModalInstance = $uibModal.open({
          templateUrl: '../../views/moviePlayer.html',
          controller: 'MoviePlayerCtrl',
          resolve: {
            movieUrl: function() {
              return movieItem.contents[0].url;
            }
          }
        });

        uibModalInstance.result.then(function() {}, function() {
          var watchItem = {
            title: movieItem.title,
            movieId: movieItem.id,
            watchDate: new Date(),
            session: 'sess1'
          };

          WatchHistoryService.addWatchedMovie(watchItem).then(function(data) {
              console.log('persistet new watch item ' + data);
            },
            function(data) {
              console.log('error persisting new watch item ' + data);
            });
          console.log('modal dismissed at: ' + new Date());
        });

      };
    }
  ]);
