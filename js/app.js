// rendered instructions
var rI = [];

// render function
var render = function() {
    canvas.clear();
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

    		if (itpr.buffer[0]) {
    			console.log('Shift buffer, next is ' + itpr.buffer[0].instruction + ' '+ itpr.buffer[0].args);
    		}
    	}

    	// if instruction is curently running
    	else {
    		var percent = ((time-itpr.buffer[0].start)/itpr.buffer[0].duration);
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
})();
