'use strict';
describe('Service: WatchHistoryService', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var watchHistoryService, httpBackend;
  var titleTestString = 'things I did';
  var rootUrl = 'http://localhost:9000/api/v0/watchhistory/';
  var sessionId = 'sess1';

  // Initialize the controller and mocks for scope and http
  beforeEach(inject(function(_WatchHistoryService_, $httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.whenGET(rootUrl + sessionId).respond([{
      title: titleTestString,
      movieId: 1,
      watchDate: new Date(),
      session: sessionId
    }, {
      title: 'things I saw',
      movieId: 2,
      watchDate: new Date(),
      session: sessionId
    }]);
    httpBackend.whenPOST(rootUrl).respond({
      title: titleTestString,
      movieId: 1,
      watchDate: new Date(),
      session: sessionId
    });
    watchHistoryService = _WatchHistoryService_;
  }));

  it('findBySession should return all movies with matching sessions', function() {
    var watchHistory;
    watchHistoryService.findBySession(sessionId).then(function(data) {
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
