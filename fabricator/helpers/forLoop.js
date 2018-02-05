const forLoop = function(from, to, block) {
    var accum = '';
    for (var i = from; i < to; i += 1) {
        accum += block.fn(i);
    }

    return accum;
};

module.exports = forLoop;
