/*global document, require*/

var ParallaxImg = require('./globals/modules/ParallaxImage'),
    Helper = require('./globals/modules/Helper');

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
    * Inits
    *
    *********************************************/
        
    new ParallaxImg(0);
    window.onscroll = function() {setStickyNav()};
    gifControl();
    
    /*********************************************
    *
    * Event Listeners
    *
    *********************************************/
    
    // Sets event listener to the video mobile thumbnails
    $( ".videoSlide" ).click(function( index ) {
      var index = $('.videoSlide').index(this);
      
      window.selectedLightbox = "video";
      openModal();
      currentSlide(index + 1);
    });
    
    // Sets event listener to the video desktop thumbnails
    $( ".videoDesktopSlide" ).click(function( index ) {
      var index = $('.videoDesktopSlide').index(this);
      
      window.selectedLightbox = "videoDesktop";
      openModal();
      currentSlide(index + 1);
    });
    
    // Sets event listener to the tips buttons
    $( ".tipSlide" ).click(function( index ) {
      var index = $('.tipSlide').index(this);
      
      window.selectedLightbox = "tips";
      openModal();
      currentSlide(index + 1);
    });
    
    // Sets event listener to close the video modal
    $( ".close" ).click(function() {
      closeModal();
    });
    
    // Sets event listener to show previous option
    $( ".prev" ).click(function() {
      plusSlides(-1);
    });
    
    // Sets event listener to show next option
    $( ".next" ).click(function() {
      plusSlides(1);
    });
    
    // Sets event listener to open event cards
    $( ".mobileCardBtn" ).click(function(index) {
      var index = $('.mobileCardBtn').index(this);
      
      displayEventCard(index);
    });
    
    // Sets event listener to close event cards
    $( ".mobileCardCloseBtn" ).click(function(index) {
      var index = $('.mobileCardCloseBtn').index(this);
      
      closeEventCard(index);
    });
    
    // Closes lightbox when clicking outside
    $(document).on('click', function(event) {
      if ($(event.target).has('.modal-content').length) {
        closeModal();
      }
    });
    
    // Checks if the window is resized
    $(window).resize(function(){
      gifControl();
    });
    
    /*********************************************
    *
    * Sidenav code
    *
    *********************************************/
    
    // Sets waypoints for showing sidenav node animations
    function waypointSet(parentId, navElem) {
      var waypoints = new Waypoint({
        element: document.getElementById(parentId),
        handler: function (direction) {
          clearActive();
          Helper.addClass(navElem, 'active');
        },
        offset: 'bottom-in-view'
      });
  
      new Waypoint({
        element: document.getElementById(parentId),
        handler: function (direction) {
          clearActive();
          Helper.addClass(navElem, 'active');
        },
        offset: 68
      });
    }
    
    // Initiates setting of waypoints for sidenav nodes
    if(sideNavNodeSpans.length > 0) {
      for (i = 0; i < sideNavNodeSpans.length; i++) {
        // IE 9 COMPATIBLE WAY TO RETRIEVE TEXT
        var id = i + 1,
            parentId = 'event' + id;
        
        waypointSet(parentId, sideNavNodeSpans[i]);
      }
    }
    
    // Clears nodes of active setting
    function clearActive() {
      for (i = 0; i < sideNavNodeSpans.length; i++) {
        Helper.removeClass(sideNavNodeSpans[i], 'active');
      }
    }
    
    // Sets the show/hide of the sidenav
    function setStickyNav() {
      var events = document.getElementById("events-description"),
          sticky = events.offsetTop,
          sticky2 = events.offsetTop + events.clientHeight;
      
      if (window.pageYOffset >= sticky && window.pageYOffset <= sticky2 - window.innerHeight) {
        sidenav.classList.add("sticky");
      } else {
        sidenav.classList.remove("sticky");
      }
    }
      
    // Adds smooth scrolling effect to sidenav
    $(".smooth-scroll").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;

        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
   
          window.location.hash = hash;
        });
      }
    });
    
    /*********************************************
    *
    * Modal code
    *
    *********************************************/
    
    // Open the Modal
    function openModal() {
      $("body").addClass("noScroll");
      
      if (window.selectedLightbox == "video") {
        document.getElementById('videoModal').style.display = "block";
      } else if (window.selectedLightbox == "tips") {
        document.getElementById('tipsModal').style.display = "block";
      } else {
        document.getElementById('videoDesktopModal').style.display = "block";
      }
      
    }

    // Clears videos to prevent playing when closing or cycling modal
    function clearVideos() {
      var i, slides, iframe;
      
      if (window.selectedLightbox == "video") {
        slides = document.getElementsByClassName("videoSlides");
      } else if (window.selectedLightbox == "tips") {
        slides = document.getElementsByClassName("tipSlides");
      } else {
        slides = document.getElementsByClassName("videoDesktopSlides");
      }
      
      for (i = 0; i < slides.length; i++) {
        var youtubeContainer,
            iframe = slides[i].children[0];
        
        if (window.selectedLightbox == "video") {
          youtubeContainer = slides[i].children[0];
          iframe = youtubeContainer.children[0];
        }
        
        iframe.setAttribute("src", "");
      }
    }

    // Close the Modal
    function closeModal() {
      $("body").removeClass("noScroll");
      document.getElementById('videoModal').style.display = "none";
      document.getElementById('tipsModal').style.display = "none";
      document.getElementById('videoDesktopModal').style.display = "none";
      clearVideos();
    }
    
    // Next/previous controls
    function plusSlides(n) {
      clearVideos();
      showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
      clearVideos();
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i, slideindex, slides;
      
      if (window.selectedLightbox == "video") {
        slides = document.getElementsByClassName("videoSlides");
      } else if (window.selectedLightbox == "tips") {
        slides = document.getElementsByClassName("tipSlides");
      } else {
        slides = document.getElementsByClassName("videoDesktopSlides");
      }
      
      if (n > slides.length) {
        slideIndex = 1;
      }
      
      if (n < 1) {
        slideIndex = slides.length;
      }
      
      for (i = 0; i < slides.length; i++) {
        var youtubeContainer,
            video = slides[i].dataset.video,
            iframe = slides[i].children[0];
        
        if (window.selectedLightbox == "video") {
          youtubeContainer = slides[i].children[0];
          iframe = youtubeContainer.children[0];
        }
        
        if (i == slideIndex - 1) {
          iframe.setAttribute("src", video + "?autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0");
        }
        
        slides[i].style.display = "none";
      }

      slides[slideIndex-1].style.display = "block";
    }
    
    /*********************************************
    *
    * Event card code
    *
    *********************************************/
    
    function displayEventCard(index) {
      var i, cards = document.getElementsByClassName("eventCard"),
          mobileVideo = document.getElementsByClassName("mobileVideo");
      
      for (i = 0; i < cards.length; i++) {
        var video = mobileVideo[i].dataset.video,
            iframe = mobileVideo[i].children[0];
        
        cards[i].classList.remove("open");

        if (i == index) {
          cards[i].classList.add("open");
          iframe.setAttribute("src", video + "?rel=0&modestbranding=1&autohide=1&showinfo=0");
        }
      }
    }
    
    function closeEventCard(index) {
      var i, cards = document.getElementsByClassName("eventCard");
      
      for (i = 0; i < cards.length; i++) {
        if (i == index) {
          cards[i].classList.remove("open");
        }
      }
    }
    
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