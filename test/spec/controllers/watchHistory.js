'use strict';

describe('Controller: WatchHistoryCtrl', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var watchHistoryCtrl, scope;
  var promiseValue = [{
    title: 'things I did',
    movieId: 1,
    watchDate: new Date("2012-04-23T18:25:43.511Z"),
    userId: 1
  }, {
    title: 'things I saw',
    movieId: 2,
    watchDate: new Date("2014-04-23T18:26:43.511Z"),
    userId: 1
  }, {
    title: 'things I avoid',
    movieId: 3,
    watchDate: new Date("2014-04-23T18:25:43.511Z"),
    userId: 1
  }];

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

  it('should return all movies in sorted order', function() {
    scope.$apply();
    var watchHistory = scope.watchHistory;
    expect(watchHistory[0].movieId).toBe(2);
    expect(watchHistory[1].movieId).toBe(3);
    expect(watchHistory[2].movieId).toBe(1);
  });
});
