'use strict';
describe('Service: WatchHistoryService', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var watchHistoryService, httpBackend;
  var rootUrl = 'http://localhost:9000/api/v0/watchhistory/';
  var userId = 1;
  var titleTestString = 'things I want';

  // Initialize the controller and mocks for scope and http
  beforeEach(inject(function(_WatchHistoryService_, $httpBackend, $localStorage) {
    $localStorage.cookie = userId;
    httpBackend = $httpBackend;
    httpBackend.whenGET(rootUrl + userId).respond([{
      title: 'things I did',
      movieId: 1,
      watchDate: new Date(),
      userId: userId
    }, {
      title: 'things I saw',
      movieId: 2,
      watchDate: new Date(),
      userId: userId
    }, {
      title: 'things I avoid',
      movieId: 3,
      watchDate: new Date(),
      userId: userId
    }]);
    httpBackend.whenPOST(rootUrl).respond({
      title: titleTestString,
      movieId: 1,
      watchDate: new Date(),
      userId: userId
    });
    watchHistoryService = _WatchHistoryService_;
  }));

  it('should return all movies with matching userIds for findByUserId', function() {
    var watchHistory;
    watchHistoryService.findByCurrentUser().then(function(data) {
      watchHistory = data;
    });
    httpBackend.flush();
    expect(watchHistory.length).toBe(3);
  });

  it('should return persistet movieItem after adding', function() {
    var movieItem;
    watchHistoryService.addWatchedMovie({}).then(function(data) {
      movieItem = data;
    });
    httpBackend.flush();
    expect(movieItem.title).toBe(titleTestString);
  });
});
