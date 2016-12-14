var turtle = {
    x: 0,
    currentMoveX: 0,
    y: 0,
    currentMoveY: 0,
    a: 45,
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

// render function
var render = function() {
    canvas.clear();
    draw.turtle();
};

// animation loop
var animLoop = Kaylee.add(function() {
	// if instruction in buffer
    if (itpr.buffer.length > 0) {
    	time = Date.now();
    	// if start time is unset
    	if (!itpr.buffer[0].start) itpr.buffer[0].start = time;

    	// if duration is unset
    	if (!itpr.buffer[0].duration) itpr.buffer[0].duration = itpr.commands[itpr.buffer[0].instruction].duration;

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
    	console.log('Buffer is empty, animation is paused');
    	// stop animation loop
    	animLoop.pause();
    }

    // draw rendered instructions
    render();
}, {
	// prepare animation loop without running it
    prepare: true
});

(function() {
	// generate a new canvas object
	canvas = new Canvas();
    canvas.create();
    draw.turtle();
})();
