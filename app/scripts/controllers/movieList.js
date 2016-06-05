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
      // use specific view model instead of missusing $scope as model, see
      // https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y030
      var vm = this;
      var movieContentIndex = 0;
      var currentMovieIndex = 0;
      var modalShowing = false;

      vm.mobile = isMobileScreen();

      MovieService.findAll().then(function(data) {
        vm.movies = data;
      }, function(data) {
        console.log('error: ' + data);
      });

      // configuration for the slick movie carousel
      vm.slickConfig = {
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
        executeMovieSelection(vm.playMovie, vm.movies[currentMovieIndex]);
      });
      $scope.$on('keydown:39', function() {
        executeMovieSelection(vm.slickConfig.method.slickNext);
      });
      $scope.$on('keydown:37', function() {
        executeMovieSelection(vm.slickConfig.method.slickPrev);
      });

      // disable keyboard controls when modal is showing or on mobile
      function executeMovieSelection(func, param) {
        if (!modalShowing && !vm.mobile && vm.slickConfig.enabled) {
          func(param);
        }
      }

      function isMobileScreen() {
        return $window.innerWidth <= 550;
      }

      //bind window resize to change movie list layout
      angular.element($window).bind('resize', function() {
        if (vm.mobile !== isMobileScreen()) {
          $scope.$apply(vm.mobile = !vm.mobile);
        }
      });

      // open modal and add movie to watched list when closed
      vm.playMovie = function(movieItem) {
        modalShowing = true;
        var uibModalInstance = $uibModal.open({
          templateUrl: 'views/moviePlayer.html',
          controller: 'MoviePlayerCtrl',
          controllerAs: 'moviePlayer',
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
