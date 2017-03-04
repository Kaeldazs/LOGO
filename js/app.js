// turtle properties
var turtle = {
    speedInitial: 300,
    speed: 50,
    height: 30,
    width: 30,
    shadow: 0,
    getPos: function() {
        return [
            this.x + this.currentMoveX,
            this.y + this.currentMoveY,
            this.a + this.currentMoveA
        ];
    },
    reset: function() {
        this.x = this.currentMoveX = this.y = this.currentMoveY = this.a = this.currentMoveA = 0;
        this.opacity = 1;
        this.draw = this.visible = true;
        this.colorLine = '#FFFFFF';
    },
    set: function() {
        this.reset();
    }
};

// animation loop
var animLoop = Kaylee.prepare(function() {
    // clear canvas
    canvasTurtle.clear();

    // run commands
	itpr.execBuffer(true);

    // draw turtle
    draw.turtle(canvasTurtle);
});

function drawLogo() {
    //var cmd =  'LC TG 90 AV 200 TD 90 BC LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 TD 104 AV 235 TG 104 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90';

    var cmd = 'LC TG 180 AV 180 TD 90 AV 440 TD 90 AV 360 BC FCC #01D758 TG 180 AV 339 TG 45 AV 30 TG 45 AV 144 LC AV 217 FCC #766F64 BC TG 45 AV 30 TG 45 AV 318 TG 45 AV 30 TG 45 AV 123 TG 45 AV 30 TG 45 AV 318 TG 45 AV 30 TG 45 AV 123 LC FCC #01D758 AV 95 TG 90 AV 360 TD 90 AV 144 TD 45 AV 30 BC TD 180 AV 30 TG 45 AV 123 TG 45 AV 30 TG 45 AV 318 TG 45 AV 30 TG 45 AV 123 TG 45 AV 30 TG 45 AV 159 TG 90 AV 80 LC TG 180 AV 80 TD 90 AV 180 TG 90 AV 220 FCC #766F64 BC TG 45 AV 30 TG 45 AV 318 TG 45 AV 30 TG 45 AV 123 TG 45 AV 30 TG 45 AV 318 TG 45 AV 30 TG 45 AV 123 LC TG 180 AV 422 TD 90 AV 180.42640687119288145';

    //var cmd = 'POUR circle :s REPETE :s [AV 20 TD 24] FIN FCC #BA68C8 TG 40 LC AV 310 TG 140 BC AV 200 REPETE 5 [AV 20 TG 24] LC TD 30 FCC #F0A32F AV 60 TG 90 AV 93 TD 90 BC circle 16 FCC #EC4A94 LC TG 24 AV 100 BC circle 16 LC RE 10 TD 66 AV 100 TG 75 BC circle 10 TD 56 circle 5 TG 164 LC FCC #F9ED3A AV 160 TD 90 AV 78 BC circle 16 LC RE 10 TD 68 AV 47 TG 90 RE 120 TG 90';

    //var cmd = 'AV 100';

    itpr.run(cmd);
}

var windowResizeTimeout = undefined;

(function() {
    // generate Shell
    shell = new Shell();
    shell.create();

    // generate Toolbar
    toolbar = new Toolbar();
    toolbar.create();

    // set turtle
    turtle.set();

	// generate a new canvas objects
    // canvas: draw
    canvasDraw = new Canvas();
    canvasDraw.create();

    // canvas: turtle && temporary draw
	canvasTurtle = new Canvas();
    canvasTurtle.create();

    // set window events
    Events.setWindowEvents();

    // draw turtle
    draw.turtle(canvasTurtle);

    drawLogo();
})();
