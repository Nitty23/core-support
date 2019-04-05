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
        slideIndex = 1, i;

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
      
      if(mobileStatus) {
        gif.setAttribute("src", "/e2/images/rv7/acft/banner/banner_640x360_optimized.gif");
      } else {
        gif.setAttribute("src", "");
      }
    }
}());
