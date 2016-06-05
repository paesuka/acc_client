'use strict';

describe('Controller: MovieListCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var movieListCtrl, scope, window, rootScope;
  var promiseValue = 1;

  // Initialize the controller and mocks for scope and MovieService
  beforeEach(inject(function($controller, $q, $rootScope, $window) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    deferred.resolve(promiseValue);
    rootScope = $rootScope;
    scope = $rootScope.$new();
    window = $window;
    movieListCtrl = $controller('MovieListCtrl', {
      $scope: scope,
      MovieService: {
        findAll: function() {
          return promise;
        }
      }
    });
    movieListCtrl.slickConfig = {
      enabled: true,
      method: {
        slickNext: function() {},
        slickPrev: function() {}
      }
    };
    movieListCtrl.mobile = false;
    movieListCtrl.playMovie = function() {};
  }));

  it('should set movies to promise when call finished', function() {
    expect(movieListCtrl.movies).toBe(undefined);
    scope.$apply();
    expect(movieListCtrl.movies).toBe(promiseValue);
  });

  it('view model mobile should be set to true', function() {
    window.innerWidth = 550;
    angular.element(window).triggerHandler('resize');
    expect(movieListCtrl.mobile).toBe(true);
  });

  it('view model mobile should be set to false', function() {
    window.innerWidth = 551;
    angular.element(window).triggerHandler('resize');
    expect(movieListCtrl.mobile).toBe(false);
  });

  it('should have called slickConfig.method.slickNext when right arrow event fired', function() {
    spyOn(movieListCtrl.slickConfig.method, 'slickNext');
    rootScope.$broadcast('keydown:39', event);
    expect(movieListCtrl.slickConfig.method.slickNext).toHaveBeenCalled();
  });

  it('should have called slickConfig.method.slickPrev when left arrow event fired', function() {
    spyOn(movieListCtrl.slickConfig.method, 'slickPrev');
    rootScope.$broadcast('keydown:37', event);
    expect(movieListCtrl.slickConfig.method.slickPrev).toHaveBeenCalled();
  });

  it('should have called playMovie when enter event fired', function() {
    movieListCtrl.movies = [];
    spyOn(movieListCtrl, 'playMovie');
    rootScope.$broadcast('keydown:13', event);
    expect(movieListCtrl.playMovie).toHaveBeenCalled();
  });

  it('should not execute movie controlls when on mobile', function() {
    movieListCtrl.mobile = true;
    spyOn(movieListCtrl.slickConfig.method, 'slickNext');
    rootScope.$broadcast('keydown:39', event);
    expect(movieListCtrl.slickConfig.method.slickNext.calls.count()).toBe(0);
  });

  it('should not execute movie controlls when slick disabled', function() {
    movieListCtrl.slickConfig.enabled = false;
    spyOn(movieListCtrl.slickConfig.method, 'slickNext');
    rootScope.$broadcast('keydown:39', event);
    expect(movieListCtrl.slickConfig.method.slickNext.calls.count()).toBe(0);
  });
});
