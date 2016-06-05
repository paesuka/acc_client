# acc-client

[![Build Status](https://travis-ci.org/paesuka/acc_client.svg?branch=master)](https://travis-ci.org/paesuka/acc_client)

* [Application](#application)
* [Developing](#developing)
* [Build & development](#build--development)
* [Testing](#testing)

## Application
A simple media application to play VODs which keeps track of previously watched videos.

<a href="http://morning-spire-75286.herokuapp.com/#/">http://morning-spire-75286.herokuapp.com/#/</a>

The application provides two views, landscape and portrait (screen-size < 550px). As mobile devices will mostly use portrait, keyboard functionality is disabled in this mode.  
The watch history is saved on browser basis with cookies and therefore works across browsing sessions. The watch history is lost when the cookie gets deleted.

### Landscape Navigation
Use the arrow keys left and right to navigate through the videos. You can also drag and scroll to the next item.  
Press Enter to open a video highlighted by the blue border or click on a picture.  
Video controls work with mouse/touch interaction. To close the video, either wait until it's finished, press ESC or click/touch beside it.

### Portrait Navigation
Scroll up and down to navigate through the videos.  
Click on an image to start a video.  
Video controls work with mouse/touch interaction. To close the video, either wait until it's finished, press ESC or click/touch beside it.

## Developing

1. Run `npm install -g grunt-cli bower` to install necessary tools.

2. Run `npm install` to install server dependencies.

3. Run `bower install` to install client dependencies.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
