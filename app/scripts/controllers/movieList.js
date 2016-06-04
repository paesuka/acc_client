'use strict';

/**
 * @ngdoc function
 * @name accClientApp.controller:MovieListCtrl
 * @description
 * # MovieListCtrl
 * Showing a list of all movies and handles interaction for browsing,
 * selecting and keeping track of watch history.
 */
angular.module('accClientApp')
  .controller('MovieListCtrl', ['$window', '$scope', '$uibModal', 'MovieService', 'WatchHistoryService',
    function($window, $scope, $uibModal, MovieService, WatchHistoryService) {

      function isMobileScreen() {
        return $window.innerWidth <= 550;
      }

      $scope.mobile = isMobileScreen();
      var movieContentIndex = 0;
      var currentMovieIndex = 0;
      var modalShowing = false;

      MovieService.findAll().then(function(data) {
        $scope.movies = data;
      }, function(data) {
        console.log('error: ' + data);
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
          init: function() {
            currentMovieIndex = 0;
          },
          beforeChange: function(event, slick, currentSlide, nextSlide) {
            currentMovieIndex = nextSlide;
          }
        }
      };

      // handle keypress events fired from rootscope
      $scope.$on('keydown:13', function() {
        executeMovieSelection($scope.playMovie, $scope.movies[currentMovieIndex]);
      });
      $scope.$on('keydown:39', function() {
        executeMovieSelection($scope.slickConfig.method.slickNext);
      });
      $scope.$on('keydown:37', function() {
        executeMovieSelection($scope.slickConfig.method.slickPrev);
      });

      // disable keyboard controls when modal is showing or on mobile
      function executeMovieSelection(func, param) {
        if (!modalShowing && !$scope.mobile && $scope.slickConfig.enabled) {
          func(param);
        }
      }

      //bind window resize to change movie list layout
      angular.element($window).bind('resize', function() {
        if ($scope.mobile !== isMobileScreen()) {
          $scope.$apply($scope.mobile = !$scope.mobile);
        }
      });

      // open modal and add movie to watched list when closed
      $scope.playMovie = function(movieItem) {
        modalShowing = true;
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
              console.log('error: failed to persist new watch item ' + data);
            });
        });
      };
    }
  ]);
