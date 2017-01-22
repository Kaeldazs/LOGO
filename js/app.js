// turtle properties
var turtle = {
    speedInitial: 300,
    speed: 300,
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

function test() {
    var cmd =  'LC TG 90 AV 200 TD 90 BC LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90 AV 100 TD 72 AV 180 TD 104 AV 235 TG 104 LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 REPETE 8 [AV 200 TD 135] LC AV 10 TD 90 AV 20 TG 90 BC FCC #FFF CT REPETE 8 [AV 180 TD 135] LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC REPETE 10 [FCC #000 AV 34 TD 18 FCC #FFF AV 34 TD 18] LC AV 17 TD 90 AV 110 TG 90';

    itpr.run(cmd);
    itpr.pause();
}

var windowResizeTimeout = undefined;

(function() {
    // generate Shell
    shell = new Shell();
    shell.create();

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

    //test();
})();

