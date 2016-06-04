'use strict';

describe('Controller: MovieListCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var movieListCtrl, scope;
  var promiseValue = 1;

  // Initialize the controller and mocks for scope and MovieService
  beforeEach(inject(function($controller, $q, $rootScope) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    deferred.resolve(promiseValue);
    scope = $rootScope.$new();
    movieListCtrl = $controller('MovieListCtrl', {
      $scope: scope,
      MovieService: {
        findAll: function() {
          return promise;
        }
      }
    });
  }));

  it('should set movies to promise when call finished', function() {
    expect(movieListCtrl.movies).toBe(undefined);
    scope.$apply();
    expect(movieListCtrl.movies).toBe(promiseValue);
  });
});
