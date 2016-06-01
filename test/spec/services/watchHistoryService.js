'use strict';
describe('Service: WatchHistoryService', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var watchHistoryService, httpBackend;
  var titleTestString = 'things I did';
  var rootUrl = 'http://localhost:9000/api/v0/watchhistory/';
  var userId = 1;

  // Initialize the controller and mocks for scope and http
  beforeEach(inject(function(_WatchHistoryService_, $httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.whenGET(rootUrl + userId).respond([{
      title: titleTestString,
      movieId: 1,
      watchDate: new Date(),
      userId: userId
    }, {
      title: 'things I saw',
      movieId: 2,
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

  it('findByUserId should return all movies with matching userIds', function() {
    var watchHistory;
    watchHistoryService.findByUserId(userId).then(function(data) {
      watchHistory = data;
    });
    httpBackend.flush();
    expect(watchHistory[0].title).toBe(titleTestString);
  });

  it('should return persistet movieItem', function() {
    var movieItem;
    watchHistoryService.addWatchedMovie({}).then(function(data) {
      movieItem = data;
    });
    httpBackend.flush();
    expect(movieItem.title).toBe(titleTestString);
  });
});
