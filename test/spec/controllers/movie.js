'use strict';

describe('Controller: MovieCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var movieCtrl, scope;
  var promiseValue = 1;

  // Initialize the controller and mocks for scope and MovieService
  beforeEach(inject(function($controller, $q, $rootScope) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    deferred.resolve(promiseValue);
    scope = $rootScope.$new();
    movieCtrl = $controller('MovieCtrl', {
      $scope: scope,
      MovieService: {
        findAll: function() {
          return promise;
        }
      }
    });
  }));

  it('should set movies to promise when call finished', function() {
    expect(scope.movies).toBe(undefined);
    scope.$apply();
    expect(scope.movies).toBe(promiseValue);
  });
});
