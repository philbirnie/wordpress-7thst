/**
 * Toolkit JavaScript
 */
import 'custom-event-polyfill'; // Adds CustomEvent support to IE
import Promise from 'es6-promise';
import SmoothScroll from 'smooth-scroll';
import 'picturefill';
import 'focus-visible'; // Polyfill for `:focus-visible`

// Initialize smooth scrolling
const anchors = document.querySelectorAll('[href*="#"]');
for (let i = 0, len = anchors.length; i < len; i++) {
  anchors[i].setAttribute('data-scroll', true);
}
const smoothScroll = new SmoothScroll('[data-scroll]', {
  durationMax: 3000,
  easing: 'easeInOutQuint',
});

const $ = require('jquery');
const boomsvgloader = require('boomsvgloader');

const spriteSheetURL = document.body.getAttribute('data-sprites');

// Load svg spritesheet
if (spriteSheetURL) {
  boomsvgloader.load(spriteSheetURL);
}

// Adds object-fit functionality to older browsers
// const objectFitImages = require('object-fit-images');
// const heroImg = document.querySelector('.c-hero__img img');
// objectFitImages(heroImg);
