// turtle properties
var turtle = {
    x: 0,
    currentMoveX: 0,
    y: 0,
    currentMoveY: 0,
    a: 0,
    opacity: 1,
    draw: true,
    visible: true,
    colorLine: '#FFFFFF',
    currentMoveA: 0,
    getPos: function() {
        return [
            turtle.x + turtle.currentMoveX, 
            turtle.y + turtle.currentMoveY, 
            turtle.a + turtle.currentMoveA
        ];
    }
};

// rendered instructions
var rI = [];

// animation loop
var animLoop = Kaylee.prepare(function() {

    // clear canvas
    canvasTurtle.clear();

	// if instruction in buffer
    if (itpr.buffer.length > 0) {
    	time = Date.now();
    	// if start time is unset
    	if (!itpr.buffer[0].start) itpr.buffer[0].start = time;

    	// if duration is unset
    	if (!itpr.buffer[0].duration) itpr.buffer[0].duration = itpr.commands[itpr.buffer[0].instruction].duration;
        if (!itpr.buffer[0].duration) itpr.buffer[0].duration = 0;

    	// if instruction is running for the last time
    	if (time >= itpr.buffer[0].start + itpr.buffer[0].duration) {
    		itpr.commands[itpr.buffer[0].instruction].exec(1);

    		// move instruction to rendered instructions
    		itpr.buffer[0].start = undefined;
    		rI[rI.length] = itpr.buffer[0];
    		itpr.buffer.shift();
    	}

    	// if instruction is curently running
    	else {
    		var percent = ((time-itpr.buffer[0].start)/itpr.buffer[0].duration);
            if (Kaylee.easing[itpr.commands[itpr.buffer[0].instruction].easing]) {
                percent = Kaylee.easing[itpr.commands[itpr.buffer[0].instruction].easing](percent, 0, 1, 1);
            }
    		if (percent) itpr.commands[itpr.buffer[0].instruction].exec(percent);
    	}
    }
    // if buffer is empty
    else {
    	// stop animation loop
    	animLoop.pause();
    }
    // draw turtle
    draw.turtle(canvasTurtle);
});

(function() {
	// generate a new canvas objects

    // canvas: draw
    canvasDraw = new Canvas();
    canvasDraw.create();

    // canvas: turtle && temporary draw
	canvasTurtle = new Canvas();
    canvasTurtle.create();

    // draw turtle
    draw.turtle(canvasTurtle);
})();

function test() {
    var cmd =  'POUR CIRCLE :size REPETE 10 [FCC #000 AV :size TD 18 FCC #FFF AV :size TD 18] FIN POUR STAR :size REPETE 8 [AV :size TD 135] FIN LC RE 60 TG 90 AV 60 TD 90 BC FCC #000 STAR 200 LC AV 10 TD 90 AV 20 TG 90 BC FCC #CCC CT STAR 180 LC AV 90 TG 90 MT AV 75 TD 90 RE 17 BC CIRCLE 34 LC AV 17 TD 90 AV 110';

    itpr.run(cmd);
}
