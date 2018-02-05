/**
 * Menu Button
 */
const util = require('./utilities.js');
const menuBtn = document.querySelector('.js-btn-menu');
const closeBtn = document.querySelector('.js-btn-close');
const menuActiveClass = 'is-open';
const bodyActiveClass = 'menu-is-open';
let menuOpen = false;

// Dispatch event making application aware that state has changed
const menuToggleEvent = new CustomEvent('menuToggle', {
    bubbles: true,
    cancelable: false,
    detail: {
        menuOpen
    }
});

function openView() {
    util.addClass(menuBtn, menuActiveClass);
    util.addClass(document.body, bodyActiveClass);
    menuOpen = true;
}

function closeView() {
    util.removeClass(menuBtn, menuActiveClass);
    util.removeClass(document.body, bodyActiveClass);
    menuOpen = false;
}

// Toggle view
function toggleView() {
    if (menuOpen) {
        closeView();
    } else {
        openView();
    }
}

// Public close event
function close() {
    closeView();
}

// Handle menu button click
function handleButtonClick() {
    toggleView();

    window.dispatchEvent(menuToggleEvent);
}

// Initialize menu button
function init() {
    if (menuBtn) {
        menuBtn.addEventListener('click', handleButtonClick, false);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', handleButtonClick, false);
    }
}

init();

module.exports = {close};
