'use strict';

describe('Controller: MoviePlayerCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var moviePlayerCtrl, scope;
  var movieContent = [];

  // Initialize the controller and mock for scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    moviePlayerCtrl = $controller('MoviePlayerCtrl', {
      $scope: scope,
      movieContent: movieContent
    });
  }));

  it('should set movie url to argument passed', function() {
    expect(scope.movieUrl).toBe(movieContent);
  });
});
