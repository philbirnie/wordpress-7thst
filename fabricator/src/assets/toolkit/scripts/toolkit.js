/**
 * Toolkit JavaScript
 */
require('es6-promise').polyfill();
require('custom-event-polyfill'); // Adds CustomEvent support to IE
require('picturefill');
require('focus-visible'); // Polyfill for `:focus-visible`

const SmoothScroll = require('smooth-scroll');

const smoothScroll = new SmoothScroll('a[href*="#"]'); /* eslint-disable-line */

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
