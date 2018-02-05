/**
 * Detects window resize, toggles class on body to disable CSS animations
 */

const util = require('./utilities.js');
let windowResizeEvent = null;

function handleResize() {
    util.addClass(document.body, 'disable-transitions');

    clearTimeout(windowResizeEvent);

    windowResizeEvent = setTimeout(() => {
        util.removeClass(document.body, 'disable-transitions');
    }, 200);
}

window.addEventListener('resize', handleResize, false);
