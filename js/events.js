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
		Events.add('windowResize', window, 'resize', function() {
	        itpr.pause();
	        clearTimeout(windowResizeTimeout);
	        windowResizeTimeout = setTimeout(function() {
	            // set canvas sizes
	            canvasDraw.setSize();
	            canvasTurtle.setSize();

	            // reset buffer and turtle properties
	            itpr.buffer = itpr.rI.concat(itpr.buffer);
	            itpr.rI = [];
	            turtle.reset();

	            itpr.play();
	        }, 300);
	    });
	    Events.add('contextMenu', window, 'contextmenu', function(e) {
	    	e.preventDefault();
	    });
	}
};