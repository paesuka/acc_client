'use strict';

describe('Service: MovieService', function() {

  // load the controller's module
  beforeEach(module('accClientApp'));

  var movieService, httpBackend;
  var titleTestString = '10 Things I Hate About You';

  // Initialize the controller and mocks for scope and http
  beforeEach(inject(function(_MovieService_, $httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.whenGET('http://localhost:9000/api/v0/movies/').respond(
      [{
        title: titleTestString,
        contents: [{
          url: 'http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4'
        }],
        images: [{
          type: 'cover',
          url: 'http://lorempixel.com/214/317/?t=1',
          id: 'f67e6e8a7478d1dae24e869f3d7081cf'
        }],
        id: '10-things-i-hate-about-you'
      }]
    );
    movieService = _MovieService_;
  }));

  it('findAll should return all movies from http get call', function() {
    var movies;
    movieService.findAll().then(function(data) {
      movies = data;
    });
    httpBackend.flush();
    expect(movies[0].title).toBe(titleTestString);
  });
});
