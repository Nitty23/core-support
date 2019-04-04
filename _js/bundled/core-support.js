(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*global document, require*/

(function () {
  'use strict';

  var sidenav = document.getElementById("side-nav-section"),
      events = document.getElementById("events-description"),
      resources = document.getElementById("resources"),
      sideNavNodeSpans = document.querySelectorAll('.side-nav-inner ul a li'),
      resourcesHeight = resources.clientHeight,
      sticky = events.offsetTop,
      sticky2 = events.offsetTop + events.clientHeight,
      slideIndex = 1,
      i;

  /*********************************************
  *
  * Misc. Modules
  *
  *********************************************/

  // Checks if the client has tablet or below view
  function isMobile() {
    var mobileStatus = false;

    if (document.body.clientWidth < 768) {
      mobileStatus = true;
    }

    return mobileStatus;
  }

  // Disables the gif if not tablet or below
  function gifControl() {
    var gif = document.getElementById("mastheadGif"),
        mobileStatus = isMobile();

    if (mobileStatus) {
      gif.setAttribute("src", "/e2/images/rv7/acft/banner/banner_640x360_optimized.gif");
    } else {
      gif.setAttribute("src", "");
    }
  }
})();

},{}]},{},[1]);
