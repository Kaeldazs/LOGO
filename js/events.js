Events = {
	create: function(name, element, event, handler) {
		this.list[name] = [element, event, handler];
	},
	add: function(names, element, event, handler) {
		if (element) {
			Events.create(names, element, event, handler);
			Events.add(names);
		}
		else {
			var name = names.split(' ');
			for (var j = 0; j < name.length; j++) {
				arr = Events.list[name[j]];
				var event = arr[1].split(' ');
				for (var i = 0; i < event.length; i++) {
					if (document.addEventListener) {
						arr[0].addEventListener(event[i], arr[2], false);
					}
					else {
						arr[0].attachEvent('on' + event[i], arr[2]);
					}
				}
			}
		}
	},
	remove: function(names) {
		var name = names.split(' ');
		for (var j = 0; j < name.length; j++) {
			var arr = Events.list[name[j]];
			var event = arr[1].split(' ');
			for (var i = 0; i < event.length; i++) {
				if (document.addEventListener) {
					arr[0].removeEventListener(event[i], arr[2], false);
				}
				else {
					arr[0].detachEvent('on' + event[i], arr[2]);
				}
			}
		}
	},
	list: {},

	setWindowEvents: function() {

		// window resize
		Events.add('windowResize', window, 'resize', function() {
			canvasDraw.clear();
			canvasTurtle.clear();
	        clearTimeout(windowResizeTimeout);
	        windowResizeTimeout = setTimeout(function() {
	        	var paused = itpr.pauseStart;
		        if (!paused) {
		        	itpr.pause();
		        }

	            // set canvas sizes
	            canvasDraw.setSize();
	            canvasTurtle.setSize();
	            var tmpBuffer = itpr.buffer.slice(0);
	            var tmprI = itpr.rI.slice(0);
	            itpr.buffer = itpr.rI.slice(0);

	            // reset buffer and turtle properties
	            itpr.rI = [];
	            turtle.reset();

	            // execute rendered instructions
	            var length = tmprI.length
	            for (var i = 0; i < length; i++) {
	            	itpr.execBuffer(false);
	            }

	            // reset buffer and rendered instructions
	            itpr.buffer = tmpBuffer,
	            itpr.rI = tmprI;

	            // draw turtle
    			draw.turtle(canvasTurtle);

	            // restart if was running
	            if (!paused) {
	            	itpr.play();
	            }
	        }, 300);
	    });

		// prevent context menu
	    Events.add('contextMenu', window, 'contextmenu', function(e) {
	    	e.preventDefault();
	    });
	}
};