window.requestAnimFrame = (function() {
	  return  window.requestAnimationFrame	   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame	||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

Kaylee = {
	run: false,
	inc: 0,
	easing: {
		linear: function(t, b, c, d) {
			return (c-b)/d*t;
		},
		ease: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	
	transformStyle: [
		'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 
		'skewX', 'skewY', 'perspective', 'translateX', 'translateY', 'translateZ', 'scaleZ'
	],
	
	colorStyle: [
		'color', 'background-color', 'background', 'border-color'
	],
			
	inArray: function(needle, haystack) {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	},
	limitator: function(nb, min, max, float) {
		if (!float) nb = Math.round(nb);
		if (nb < min) return min;
		if (nb > max) return max;
		return nb;
	},
	prepare: function(elem, args, duration, options) {
		if (!options) options = {};
		options.prepare = true;
		if (!options.id) {
			options.id = 'Kaylee-' + (this.inc++);
		}
		Kaylee.animate(elem, args, duration, options);
		return this.instance(options.id);
	},
	animate: function(elem, args, duration, options) {
		if (!options) options = {};
		if (elem.length === undefined) {
			elem = [elem];
		}
		if (!elem || !args || !duration) {
			if (options.callback) {
				options.callback(elem);
			};
			return;
		}
		if (!options.id) {
			options.id = 'Kaylee-' + (this.inc++);
		}

		for (var i = 0; i < args.length; i++) {
			if (options.reverse) {
				var tmp = args[i].from;
				args[i].from = args[i].to;
				args[i].to = tmp;
			}
			if (!args[i].ease || !Kaylee.easing[args[i].ease]) args[i].ease = 'ease';
			if (!args[i].unit) args[i].unit = '';
			if (this.inArray(args[i].style, this.colorStyle)) {
				alpha = false;
				var arr = ['from', 'to'];
				for (var j = 0; j < 2; j++) {
					if (!Array.isArray(args[i][arr[j]]) && args[i][arr[j]].match(/^\#/)) {
						var r = parseInt(args[i][arr[j]].substr(1, 2), 16),
							g = parseInt(args[i][arr[j]].substr(3, 2), 16),
							b = parseInt(args[i][arr[j]].substr(5, 2), 16);			
						args[i][arr[j]] = [r, g, b];
					}
					else if (!Array.isArray(args[i][arr[j]]) && args[i][arr[j]].match(/^rgba?\(/)) {
						args[i][arr[j]] = args[i][arr[j]].replace(/^(rgba?\()|(\))|( )/img, '').split(',');
						args[i][arr[j]][0] = parseInt(args[i][arr[j]][0]);
						args[i][arr[j]][1] = parseInt(args[i][arr[j]][1]);
						args[i][arr[j]][2] = parseInt(args[i][arr[j]][2]);
						if (args[i][arr[j]][3] !== undefined) {
							alpha = true;
							args[i][arr[j]][3] = parseFloat(args[i][arr[j]][3]);
						}
					}
				}
				args[i].diff = [
					args[i].to[0] - args[i].from[0],
					args[i].to[1] - args[i].from[1],
					args[i].to[2] - args[i].from[2]
				];
				if (alpha || (args[i].from[3] !== undefined && args[i].to[3] !== undefined)) {
					args[i].type = 'rgba';
					if (args[i].from[3] === undefined) args[i].from[3] = 1;
					if (args[i].to[3] === undefined) args[i].to[3] = 1;
					args[i].diff[3] = args[i].to[3] - args[i].from[3];
					args[i].pre = 'rgba(';
				}
				else {
					args[i].type = 'rgb';
					args[i].pre = 'rgb(';
				}
				args[i].unit = ')';
			}
			else {
				if (this.inArray(args[i].style, this.transformStyle)) {
					args[i].pre = args[i].style + '(';
					args[i].unit += ')';
					args[i].style = 'transform';
				}
				args[i].diff = args[i].to - args[i].from;
			}
			if (!args[i].pre) {
				args[i].pre = '';
			}
			for (var el = 0; el < elem.length; el++) {
				elem[el].style[args[i].style] = args[i].from + args[i].unit;
			}
		}
		
		var end = function() {
			var transformTxt = '';
			for (var i = 0; i < args.length; i++) {
				args[i].value = args[i].pre + args[i].to + args[i].unit;
				if (args[i].style == 'transform') {
					transformTxt += args[i].value + ' ';
				}
				else {
					for (var el = 0; el < elem.length; el++) {
						elem[el].style[args[i].style] = args[i].value;
					}
				}
			}
			if (transformTxt != '') {
				for (var el = 0; el < elem.length; el++) {
					elem[el].style.transform = transformTxt;
					elem[el].style.webkitTransform = transformTxt;
					elem[el].style.MozTransform = transformTxt;
					elem[el].style.msTransform = transformTxt;
					elem[el].style.OTransform = transformTxt;
				}
			}
			if (options.loop) {
				options.reverse = true;
				Kaylee.animate(elem, args, duration, options);
			}
		};

		var anim = function(start, current) {
			var transformTxt = '';
			for (var i = 0; i < args.length; i++) {
				if (args[i].type == 'rgb' || args[i].type == 'rgba') {
					args[i].value = args[i].pre + 
						Kaylee.limitator(args[i].from[0] + 
						Kaylee.easing[args[i].ease](current - start, 0, args[i].diff[0], duration), 0, 255) + ',' + 
						Kaylee.limitator(args[i].from[1] + 
						Kaylee.easing[args[i].ease](current - start, 0, args[i].diff[1], duration), 0, 255) + ',' +
						Kaylee.limitator(args[i].from[2] + 
						Kaylee.easing[args[i].ease](current - start, 0, args[i].diff[2], duration), 0, 255) +
						(args[i].type == 'rgba' ? ','+ (args[i].from[3] + 
						Kaylee.easing[args[i].ease](current - start, 0, args[i].diff[3], duration)) : '') +
						args[i].unit;
						
					for (var el = 0; el < elem.length; el++) {
						elem[el].style[args[i].style] = args[i].value;
					}
				}
				else {
					args[i].value = args[i].pre + 
						(args[i].from + Kaylee.easing[args[i].ease](current - start, 0, args[i].diff, duration)) + 
						args[i].unit;
					if (args[i].style == 'transform') {
						transformTxt += args[i].value + ' ';
					}
					else {
						for (var el = 0; el < elem.length; el++) {
							elem[el].style[args[i].style] = args[i].value;
						}
					}
				}
			}
			if (transformTxt != '') {
				for (var el = 0; el < elem.length; el++) {
					elem[el].style.transform = transformTxt;
					elem[el].style.webkitTransform = transformTxt;
					elem[el].style.MozTransform = transformTxt;
					elem[el].style.msTransform = transformTxt;
					elem[el].style.OTransform = transformTxt;
				}
			}
		};
		
		this.add(anim, {
			id: options.id,
			prepare: options.prepare,
			duration: duration,
			callback: function() {
				end();
				if (options.callback) options.callback();
			}
		});
		return this.instance(options.id);
	},
	rmFromArr: function(arr, from, to) {
		var rest = arr.slice((to || from) + 1 || arr.length);
		arr.length = from < 0 ? arr.length + from : from;
		return arr.push.apply(arr, rest);
	},
	toggle: function(id) {
		if (!Kaylee.pause(id)) Kaylee.play(id);
	},
	pause: function(id) {
		if (id) {
			for (var i = 0; i < this.running.length; i++) {
				if (this.running[i].id == id) {
					this.running[i].pause = Date.now();
					this.paused[this.paused.length] = this.running[i];
					this.rmFromArr(this.running, i);
					return true;
				}
			}
		}
		return false;
	},
	play: function(id) {
		Kaylee.pause(id);
		if (id) {
			for (var i = 0; i < this.paused.length; i++) {
				if (this.paused[i].id == id) {
					this.paused[i].end = undefined;
					this.running[this.running.length] = this.paused[i];
					this.rmFromArr(this.paused, i);
					if (!this.run) {
						this.loop();
					}
					return true;
				}
			}
		}
		return false;
	},
	stop: function(id) {
		if (id) {
			for (var i = 0; i < this.running.length; i++) {
				if (this.running[i].id == id) {
					this.rmFromArr(this.running, i);
					break;
				}
			}
		}
		else {
			this.running = [];
		}
	},
	instance: function(id) {
		return {
			stop: function() {
				Kaylee.stop(id);
			},
			pause: function() {
				Kaylee.pause(id);
			},
			play: function() {
				Kaylee.play(id);
			},
			toggle: function() {
				Kaylee.toggle(id);
			}
		};
	},
	add: function(func, args) {
		if (!args) args = {};
		var start, pause, duration;
        if (args.duration) {
            duration = args.duration;
        }
		if (args.prepare) {
			start = pause = Date.now();
		}
		if (!args.id) args.id = 'Kaylee-' + (this.inc++);
		var tmp = {
			id: args.id,
			func: func,
			duration: duration,
			end: undefined,
			start: start,
			pause: pause,
			callback: args.callback,
			stop: function() {Kaylee.stop(args.id)},
			pause:  function() {Kaylee.pause(args.id)},
			play:  function() {Kaylee.play(args.id)},
			toggle:  function() {Kaylee.toggle(args.id)}
		}
		if (args.prepare) {
			this.paused[this.paused.length] = tmp;
		}
		else {
			this.running[this.running.length] = tmp;
		}
		if (!this.run) {
			this.loop();
		}
		return this.instance(args.id);
	},
	loop: function() {
		this.run = true;
		var curr = Date.now();
		for (var i = 0; i < this.running.length; i++) {
			if (this.running[i].duration && !this.running[i].end) {
				if (this.running[i].pause) {
					var newCurr = curr - (this.running[i].pause - this.running[i].start);
					this.running[i].end = newCurr + this.running[i].duration;
					this.running[i].start = newCurr;
					this.running[i].pause = undefined;
				}
				else {
					this.running[i].end = curr + this.running[i].duration;
					this.running[i].start = curr;
				}
			}
			if (this.running[i].end < curr) {
				if (this.running[i].callback) this.running[i].callback();
				this.rmFromArr(this.running, i);
			}
			else {
				if (this.running[i].func) this.running[i].func(this.running[i].start, curr);
			}
		}
		if (this.running.length) {
			requestAnimFrame(function() {
				Kaylee.loop();
			});
		}
		else {
			this.run = false;
		}
	},
	running: [],
	paused: []
};