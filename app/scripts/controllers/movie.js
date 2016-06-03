'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Controller of the accClientApp
 */
angular.module('accClientApp')
  .controller('MovieCtrl', ['$scope', '$uibModal', '$window', 'MovieService', 'WatchHistoryService',
    function($scope, $uibModal, $window, MovieService, WatchHistoryService) {

      var currentMovieId = 0;
      var modalShowing = false;
      var movieContentIndex = 0;

      MovieService.findAll().then(function(data) {
        $scope.movies = data;
      }, function(data) {
        console.log('error : ' + data);
      });

      // configuration for the slick movie carousel
      $scope.slickConfig = {
        enabled: true,
        draggable: true,
        infinite: true,
        variableWidth: true,
        autoplay: false,
        arrows: false,
        slidesToShow: 10,
        slidesToScroll: 1,
        method: {},
        event: {
          beforeChange: function(event, slick, currentSlide, nextSlide) {
            currentMovieId = nextSlide;
          }
        }
      };

      // handle keypress events fired from rootscope
      $scope.$on('keydown:13', function() {
        executeRegardingModal($scope.playSelectedMovieItem);
      });
      $scope.$on('keydown:39', function() {
        executeRegardingModal($scope.slickConfig.method.slickNext);
      });
      $scope.$on('keydown:37', function() {
        executeRegardingModal($scope.slickConfig.method.slickPrev);
      });

      function executeRegardingModal(func) {
        if (!modalShowing) {
          func();
        }
      }

      $scope.playSelectedMovieItem = function() {
        modalShowing = true;
        var movieItem = $scope.movies[currentMovieId];
        var uibModalInstance = $uibModal.open({
          templateUrl: 'views/moviePlayer.html',
          controller: 'MoviePlayerCtrl',
          resolve: {
            movieContent: function() {
              return movieItem.contents[movieContentIndex];
            }
          }
        });
        uibModalInstance.result.then(function() {}, function() {
          modalShowing = false;
          WatchHistoryService.addWatchedMovie(movieItem).then(function() {},
            function(data) {
              console.log('error persisting new watch item ' + data);
            });
        });
      };
    }
  ]);
