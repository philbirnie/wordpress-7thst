// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

const debounce = function(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        let args = arguments;

        // This function is called.
        const later = function() {
            // Null out timeout when this is called.
            timeout = null;

            // If not immediate, call it - otherwise don't because this doesn't apply.
            if (!immediate) func.apply(context, args);
        };

        // boolean - if immediate is TRUE and there is no timeout
        const callNow = immediate && !timeout;

        // Remove Timemout
        clearTimeout(timeout);

        // Set a new Timeout based upon the waiting time
        timeout = setTimeout(later, wait);

        // If allowed to call, call now - this will only occur for immediate functions - otherwise - use the function stored in the timeout.
        if (callNow) func.apply(context, args);
    };
};
module.exports = debounce;
