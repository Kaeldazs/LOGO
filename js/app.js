var canvas = new Canvas();

var render = function() {
    canvas.clear();
};

var animLoop = Kaylee.add(function() {
    render();
}, {
    prepare: true
});

(function() {
    canvas.create();
    animLoop.play();
})();