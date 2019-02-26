(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*global document, require*/
var Header = require('./modules/Header');
var ScrollNav = require('./modules/ScrollNav');

(function () {
    'use strict';

    var navbar = document.getElementsByClassName('navbar')[0].parentNode;
    new Header('menu');
    new Header('search');
    new ScrollNav(navbar, 150);
})();

},{"./modules/Header":3,"./modules/ScrollNav":5}],2:[function(require,module,exports){
/*global document, window, require*/

var Helper = require('./modules/Helper');

(function () {
    'use strict';

    var autoScrolling = false,
        body = document.body,
        dist = 0,
        doc = document.documentElement,
        id,
        increment = 16,
        lastScrollTop = 0,
        pos,
        topBtn = document.getElementsByClassName('top-btn')[0];

    window.onscroll = function () {
        pos = body.scrollTop || doc.scrollTop;

        if (!autoScrolling) {
            if (pos >= 750 && pos < lastScrollTop) {
                Helper.addClass(topBtn, 'visible');
            } else {
                Helper.removeClass(topBtn, 'visible');
            }
        }

        lastScrollTop = pos;
    };

    function scrollUp() {
        dist = pos / (-1 * increment);

        window.scrollBy(0, dist < -1 ? dist : -1.5);

        if (pos > 0) {
            id = window.requestAnimationFrame(scrollUp);
        } else {
            window.cancelAnimationFrame(id);

            // allow scrolling
            enableScroll();
        }
    }

    function preventScroll(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
    }

    function disableScroll() {
        window.onwheel = preventScroll;
        window.ontouchmove = preventScroll;
        autoScrolling = true;
    }

    function enableScroll() {
        window.onwheel = null;
        window.ontouchmove = null;
        autoScrolling = false;
    }

    topBtn.addEventListener('click', function (e) {
        if (window.requestAnimationFrame) {
            e.preventDefault();
            Helper.removeClass(topBtn, 'visible');
            scrollUp();

            // prevent user from scrolling
            disableScroll();
        }
        return;
    }, false);
})();

},{"./modules/Helper":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */
var Helper = require('./Helper');

var Header = function () {
    function Header(section) {
        _classCallCheck(this, Header);

        //This is for main navbar
        this.section = section;
        this.sectionBtn = document.getElementsByClassName(section + '-button')[0];
        this.sectionWin = document.getElementsByClassName(section + '-window')[0];
        this.headerElem = document.getElementsByTagName('header')[0];
        this.navbtns = document.getElementsByClassName('nav-button');
        this.navwins = document.getElementsByClassName('nav-window');
        this.sectionBtn.addEventListener('click', this.toggleNavOption.bind(this), false);

        // uncheck boxes on refresh
        var checkboxes = this.headerElem.querySelectorAll('input[type=checkbox]:checked'),
            i = 0,
            len;

        for (i, len = checkboxes.length; i < len; i++) {
            checkboxes[i].checked = false;
        }
    }

    _createClass(Header, [{
        key: 'toggleNavOption',
        value: function toggleNavOption() {
            var body = document.getElementsByTagName('body')[0],
                html = document.getElementsByTagName('html')[0],
                i = 0,
                secClass = this.sectionBtn.className,
                sectionOpen = secClass.indexOf('close-button') === -1;

            for (i = 0; i < this.navbtns.length; i++) {
                Helper.removeClass(this.navbtns[i], 'close-button');
                Helper.removeClass(this.navwins[i], 'open-window');
                this.navbtns[i].setAttribute('aria-expanded', 'false');
                Helper.removeClass(html, 'menu-open');
                Helper.removeClass(body, 'menu-open');
            }
            if (sectionOpen) {
                Helper.addClass(this.sectionBtn, 'close-button');
                Helper.addClass(this.sectionWin, 'open-window');
                this.sectionBtn.setAttribute('aria-expanded', 'true');
                if (this.section === 'search') {
                    document.getElementById('usagov-search-query').focus();
                } else {
                    Helper.addClass(html, 'menu-open');
                    Helper.addClass(body, 'menu-open');
                }
            }
        }
    }]);

    return Header;
}();

;

exports.default = Header;
module.exports = exports['default'];

},{"./Helper":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */
var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'hasClass',
        value: function hasClass(el, className) {
            if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }, {
        key: 'addClass',
        value: function addClass(el, className) {
            if (el.classList) el.classList.add(className);else if (!this.hasClass(el, className)) el.className += ' ' + className;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(el, className) {
            if (el.classList) el.classList.remove(className);else if (this.hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        }
    }, {
        key: 'toggleClass',
        value: function toggleClass(el, className) {
            if (this.hasClass(el, className)) this.removeClass(el, className);else this.addClass(el, className);
        }
    }, {
        key: 'randomNumberToken',
        value: function randomNumberToken() {
            return new Date().valueOf();
        }
    }]);

    return Helper;
}();

;

exports.default = Helper;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint -W032 */ /* ignore unnecessary semicolon */
var Helper = require('./Helper');
/**
 * Toggle class name on element as user scrolls page
 */

var ScrollNav = function () {

    /**
     * elem {obj}           - DOM element to add scroll class to
     * minTop {int}         - minimum px distance from top of page to start
                              adding scroll class
     */
    function ScrollNav(elem, minTop) {
        _classCallCheck(this, ScrollNav);

        this.navElem = elem;
        // window.pageYOffset for all browsers, except IE9 and lower
        this.scrollPos = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop;
        this.minTop = !minTop ? 0 : minTop;
        this.minScroll = 25; // minimum scrolling distance before transitioning
        window.addEventListener('scroll', this.runOnScroll.bind(this));
        this.runOnScroll(this);
    }

    _createClass(ScrollNav, [{
        key: 'runOnScroll',
        value: function runOnScroll(e) {
            var newPos = window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop,
                navOpen = document.getElementsByClassName('open-window');

            if (!navOpen.length) {
                // scrolling down
                if (this.scrollPos + this.minScroll <= newPos && newPos > this.minTop) {
                    Helper.addClass(this.navElem, 'scrolled-down');
                    this.scrollPos = newPos;
                    // scrolling up
                } else if (this.scrollPos - this.minScroll >= newPos) {
                    Helper.removeClass(this.navElem, 'scrolled-down');
                    this.scrollPos = newPos;
                }
            }
        }
    }]);

    return ScrollNav;
}();

;

exports.default = ScrollNav;
module.exports = exports['default'];

},{"./Helper":4}]},{},[1,2]);
