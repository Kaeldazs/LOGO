events = {
	create: function(name, element, event, handler) {
		this.list[name] = [element, event, handler];
	},
	add: function(names) {
		var name = names.split(' ');
		for (var j = 0; j < name.length; j++) {
			arr = _.events.list[name[j]];
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
	},
	remove: function(names) {
		var name = names.split(' ');
		for (var j = 0; j < name.length; j++) {
			var arr = _.events.list[name[j]];
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
	}
};

function trimWhiteSpace(str) {
	while (str[0] == ' ') {
		str = str.replace(/^ /,'');
	}
	while (str.match(/  /img)) {
		str = str.replace(/  /img, ' ');
	}
	return str;
}