/**
 * Utilities
 */

// Adds a class
function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

// Removes a class
function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

// Check for existence of a class
function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
}

// Get element's position
function getPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
        if (el.tagName === 'BODY') {
            // deal with browser quirks with body/window/document and page scroll
            const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            const yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }

    return {
        x: xPos,
        y: yPos,
    };
}

module.exports = { addClass, removeClass, hasClass, getPosition };
