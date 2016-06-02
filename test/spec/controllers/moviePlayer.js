'use strict';

describe('Controller: MoviePlayerCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var moviePlayerCtrl, scope;
  var movieContent = [];
  var uibModalInstance = {dismiss: function() {}};

  // Initialize the controller and mock
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    spyOn(uibModalInstance, 'dismiss');
    moviePlayerCtrl = $controller('MoviePlayerCtrl', {
      $scope: scope,
      $uibModalInstance: uibModalInstance,
      movieContent: movieContent
    });
  }));

  it('should define a movieCompleted function', function() {
      expect(scope.movieCompleted).toBeDefined();
      expect(angular.isFunction(scope.movieCompleted)).toBeTruthy();
    });

  it('should have called uibModalInstance dismiss', function() {
    scope.movieCompleted();
    expect(uibModalInstance.dismiss).toHaveBeenCalled();
  });
});
