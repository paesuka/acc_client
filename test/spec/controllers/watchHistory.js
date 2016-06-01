'use strict';

describe('Controller: WatchHistoryCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var watchHistoryCtrl, scope;
  var promiseValue = 1;

  // Initialize the controller and mocks for scope and WatchHistoryService
  beforeEach(inject(function($controller, $q, $rootScope, _WatchHistoryService_) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    deferred.resolve(promiseValue);
    scope = $rootScope.$new();
    watchHistoryCtrl = $controller('WatchHistoryCtrl', {
      $scope: scope,
      WatchHistoryService: {
        findByUserId: function(session) {
          return promise;
        }
      }
    });
  }));

  it('should set watchHistory to promise when call finished', function() {
    expect(scope.watchHistory).toBe(undefined);
    scope.$apply();
    expect(scope.watchHistory).toBe(promiseValue);
  });
});
