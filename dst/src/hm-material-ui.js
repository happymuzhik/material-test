"use strict";

document.addEventListener("DOMContentLoaded", function () {
    (function (document, window, undefined) {

        var rippleElements = document.querySelectorAll('.ma-button');

        //Create Ripple Effect
        function createRipple(event) {

            //Create Ripple
            var rippleClassName = "ripple-effect";
            var ripple = document.createElement("div");
            ripple.className = rippleClassName;

            //Add Ripple to document
            this.appendChild(ripple);

            //Position Ripple
            var rect = event.target.getBoundingClientRect();
            ripple.style.top = (event.pageY || event.targetTouches[0].pageY) - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop + 'px';
            ripple.style.left = (event.pageX || event.targetTouches[0].pageX) - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft + 'px';

            ripple.addEventListener("animationend", destroyRipple, false);
            ripple.addEventListener("webkitAnimationEnd", destroyRipple, false);
            ripple.addEventListener("oAnimationEnd", destroyRipple, false);
            ripple.addEventListener("MSAnimationEnd", destroyRipple, false);
        };

        function destroyRipple() {
            this.parentElement.removeChild(this);
        };

        //Add Event Listeners
        for (var i = 0; i < rippleElements.length; i++) {
            // this is for FF
            var ripple = rippleElements[i].querySelectorAll('.ripple')[0];
            rippleElements[i].addEventListener('mousedown', createRipple.bind(ripple), false);
            rippleElements[i].addEventListener('touchstart', createRipple.bind(ripple), false);
        };
    })(document, window);
});