var itpr = {
	// commands list
	commands: {
		/*
			type: type of command (for syntaxic coloration),
			reg: RegExp for find this command,
			doc: documentation
			easing: 'linear' by default
			duration: animation duration
			exec: what append when execute this command,
			store: what append when storing this command on buffer
		*/
		AV: {
			type: 'procedure',
			reg: /^(AV)\s(-?[0-9]+(?:\.[0-9]+)?|:([a-zA-Z0-9_$]+))/,
			doc: 'AV pixels // The turtle moves pixels foward',
			duration: function() { return turtle.speed },
			easing: 'ease',
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				var newPos = Math.rotate(0, 0, 0, -move, turtle.a);
				if (percent == 1) {
					var newPosX = turtle.x + newPos.x,
						newPosY = turtle.y + newPos.y;
					if (turtle.draw) {
						draw.line(canvasDraw, turtle.x, turtle.y, newPosX, newPosY);
						if (mG.current && mG.current.checkMove) {
							mG.current.checkMove(turtle.x, turtle.y, newPosX, newPosY);
						}
					}

					turtle.currentMoveX = 0;
					turtle.currentMoveY = 0;
					turtle.x = newPosX;
					turtle.y = newPosY;
				}
				else {
					turtle.currentMoveX = newPos.x;
					turtle.currentMoveY = newPos.y;
					if (turtle.draw) {
						draw.line(canvasTurtle, turtle.x, turtle.y, turtle.x + turtle.currentMoveX, turtle.y + turtle.currentMoveY);
					}
				}
			}
		},
		RE: {
			type: 'procedure',
			reg: /^(RE)\s(-?[0-9]+(?:\.[0-9]+)?|:([a-zA-Z0-9_$]+))/,
			doc: 'RE pixels // The turtle moves pixels backward',
			duration: function() { return turtle.speed },
			easing: 'ease',
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				var newPos = Math.rotate(0, 0, 0, move, turtle.a);
				if (percent == 1) {

					var newPosX = turtle.x + newPos.x,
						newPosY =turtle.y + newPos.y;

					if (turtle.draw) {
						draw.line(canvasDraw, turtle.x, turtle.y, newPosX, newPosY);
						if (mG.current && mG.current.checkMove) {
							mG.current.checkMove(turtle.x, turtle.y, newPosX, newPosY);
						}
					}
					turtle.currentMoveX = 0;
					turtle.currentMoveY = 0;
					turtle.x += newPos.x;
					turtle.y += newPos.y;
				}
				else {
					turtle.currentMoveX = newPos.x;
					turtle.currentMoveY = newPos.y;
					if (turtle.draw) {
						draw.line(canvasTurtle, turtle.x, turtle.y, turtle.x + turtle.currentMoveX, turtle.y + turtle.currentMoveY);
					}
				}
			}
		},
		TD: {
			type: 'procedure',
			reg: /^(TD)\s(-?[0-9]+(?:\.[0-9]+)?|:([a-zA-Z0-9_$]+))/,
			doc: 'TD degrees // The turtle turns degrees to the right',
			easing: 'ease',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				if (percent == 1) {
					turtle.currentMoveA = 0;

					turtle.a += move;
					if (turtle.a > 360) turtle.a = turtle.a%360;
					else if (turtle.a < -360) turtle.a = -(Math.abs(turtle.a)%360);
				}
				else {
					turtle.currentMoveA = move;
				}
			}
		},
		TG: {
			type: 'procedure',
			reg: /^(TG)\s(-?[0-9]+(?:\.[0-9]+)?|:([a-zA-Z0-9_$]+))/,
			doc: 'TG degrees // The turtle turns degrees to the left',
			easing: 'ease',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				var move = -itpr.buffer[0].args * percent;
				if (percent == 1) {
					turtle.currentMoveA = 0;
					turtle.a += move;
				}
				else {
					turtle.currentMoveA = move;
				}
			}
		},
		FCC: {
			type: 'procedure',
			reg: /^(FCC)\s(#([[0-9A-Fa-f]{6}|[[0-9A-Fa-f]{3}))/,
			doc: 'FCC color // Change the trace color to color in RGB format as #FF0000 for red',
			easing: 'ease',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				var color = Kaylee.hex2rgb(itpr.buffer[0].args);
				if (percent == 1) {
					turtle.colorLine = color;
					turtle.currentColorMove = [0, 0, 0];
				}
				else {
					turtle.currentColorMove = [
						(turtle.colorLine[0] - color[0]) * percent,
						(turtle.colorLine[1] - color[1]) * percent,
						(turtle.colorLine[2] - color[2]) * percent,
					]
				}
			}
		},
		LC: {
			type: 'procedure',
			reg: /^(LC)/,
			doc: 'LC // Pen up (no trace)',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				var move = -itpr.buffer[0].args * percent;
				if (percent == 1) {
					turtle.draw = false;
					turtle.shadow = 1;
				}
				else {
					if (turtle.shadow !== 1) {
						turtle.shadow = percent;
					}
				}
			}
		},
		BC: {
			type: 'procedure',
			reg: /^(BC)/,
			doc: 'BC // Pen down (trace active)',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				var move = -itpr.buffer[0].args * percent;
				if (percent == 1) {
					turtle.draw = true;
					turtle.shadow = 0;
				}
				else {
					if (turtle.shadow !== 0) {
						turtle.shadow = 1 - percent;
					}
				}
			}
		},
		VE: {
			type: 'procedure',
			reg: /^(VE)/,
			doc: 'VE // Clears the screen and put the turtle at the center, facing upwards',
			exec: function(percent) {
				itpr.clear(true);
			}
		},
		CT: {
			type: 'procedure',
			reg: /^(CT)/,
			doc: 'CT // Hide the turtle',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				if (percent == 1) {
					turtle.opacity = 0;
				}
				else {
					if (turtle.opacity !== 0) {
						turtle.opacity = 1 - percent;
					}
				}
			}
		},
		MT: {
			type: 'procedure',
			reg: /^(MT)/,
			doc: 'MT // Show the turtle',
			duration: function() { return turtle.speed },
			exec: function(percent) {
				if (percent == 1) {
					turtle.opacity = 1;
				}
				else {
					if (turtle.opacity !== 1) {
						turtle.opacity = percent;
					}
				}
			}
		},
		REPETE: {
			type: 'structure',
			reg: /^(REPETE)\s([0-9]+|:[a-zA-Z0-9_$]+)\s\[/,
			doc: 'REPETE x [commands] // Do the commands x times',
			store: function(match) {
				var iterations = match[1];
				var commands = match[2];
				var ret = '';
				for (var i = 0; i < iterations; i++) {
					ret += ' ' + commands;
				}
				return ret;
			}
		},
		POUR: {
			type: 'function',
			reg: /^(POUR)\s([^\s]+)(?:\s:(?:[a-zA-Z0-9_$]+))*/,
			doc: '',
			store: function(match) {
				if (!inArray(match[2], itpr.primitives)) {
					if (!itpr.capture) {
						var argsRegex = /(\s:([a-zA-Z0-9_$]+))/g;
						var args = match[0].match(argsRegex);
						var regVar = '(?:'+ match[2] +')';
						var regFunction = '^(' + match[2] + ')';
						for (var i in args) {
							args[i] = args[i].replace(/^\s/g, '');

							regVar += '(?:\\\s(\\\d+))';
							regFunction += '(?:\\\s(\\\d+))';
						}
						itpr.commands[match[2] + ''] = {
							type: 'function',
							reg: new RegExp(regFunction),
							buffer: '',
							localVar: args,
							store: function(match) {
								var commands = this.buffer;
								if (this.localVar) {
									for (var j = 0; j < this.localVar.length; j++) {
										var r = new RegExp('(^|\\\s|\\\[)(?:'+ this.localVar[j] +')($|\\\s|\\\])', 'g');
										commands = commands.replace(r, "$1"+ match[j+2] +"$2");
									}
								}
								return commands;
							}
						}
						itpr.capture = match[2] + '';
					}
				}
				else {
					shell.error('La fonction "'+ match[2] +'" ne peut être remplacée.', true);
				}
			}
		},
		FIN: {
			type: 'procedure',
			reg: /^(FIN)/,
			doc: 'FIN // End of capture',
			store: function(match) {
				itpr.capture = false
			}
		}
	},

	// running instructions
	buffer: [],

	// rendered instructions
	rI: [],

	primitives: [],
	protectPrimitives: function() {
		var tmp = [];
		for (var p in itpr.commands) {
			tmp[tmp.length] = p;
		}
		itpr.primitives = tmp;
	},

	store: function(match) {
		// si la capture de l'instruction est déléguée
		if (itpr.capture) {
			if (itpr.commands[itpr.capture]) {
				itpr.commands[itpr.capture].buffer += ' ' + match;
			}
		}
		// sinon, insertion de l'instruction dans le buffer
		else {

			itpr.buffer[itpr.buffer.length] = {
				instruction: match[1],
				args: match[2],
				start: undefined
			};

			// launch animation loop
			itpr.play();
		}
	},

	// reset all
	clear: function(animate, callback) {
		if (shell.clearCanvas) {
			toolbar.btn.slow.click();
			turtle.speed = turtle.speedInitial;
			shell.clearCanvas = false;
		}
		itpr.pause();

		if (itpr.recursionTimeout) clearTimeout(itpr.recursionTimeout);
		itpr.recursion = false;

		itpr.buffer = [];
		itpr.rI = [];

		if (!animate) {
			canvasDraw.clear();
			turtle.reset();
			draw.turtle(canvasTurtle);
		}

		else {
			turtle.x += turtle.currentMoveX;
			turtle.y += turtle.currentMoveY;
			turtle.currentMoveX = 0;
			turtle.currentMoveY = 0;
			var turtlePos = [turtle.x, turtle.y, turtle.a % 360, turtle.opacity, turtle.shadow];
			Kaylee.animate(function(start, curr) {
				var percent = ((curr - start) / 300);
	            percent = Kaylee.easing['ease'](percent, 0, 1, 1);
	            turtle.x = turtlePos[0] * (1 - percent);
	            turtle.y = turtlePos[1] * (1 - percent);
	            turtle.a = turtlePos[2] * (1 - percent);
	            turtle.opacity = turtlePos[3] + (1 - turtlePos[3]) * percent;
	            turtle.shadow = turtlePos[4] * (1 - percent);

	            turtle.currentColorMove = [
					(turtle.colorLine[0] - 255) * percent,
					(turtle.colorLine[1] - 255) * percent,
					(turtle.colorLine[2] - 255) * percent,
				]

	            canvasTurtle.clear();
				draw.turtle(canvasTurtle);

	            canvasDraw.el.style.opacity = 1 - percent;
	            if (curr - start > 300) {

	            	if (mG.current) {
	            		mG.current.reset();
	            	}

	            	this.stop();
	            	turtle.reset();
					canvasDraw.clear();
					canvasTurtle.clear();
					canvasDraw.el.style.opacity = '';
					draw.turtle(canvasTurtle);
					if (callback) callback();
	            }
			});
		}
	},

	// which command is capturing user input
	capture: false,

	pauseStart: Date.now(),

	// interpreter controls
	pause: function() {
		animLoop.pause();
		itpr.pauseStart = Date.now();
		toolbar.activeBtn(toolbar.btn.pause, 'active', '#toolbar .playPause.active');
	},

	play: function() {
		animLoop.play();
		if (animLoop.isRunning()) toolbar.activeBtn(toolbar.btn.play, 'active', '#toolbar .playPause.active');
	},

	toggle: function() {
		!animLoop.isRunning() && itpr.buffer.length > 0 ? itpr.play() : itpr.pause();
	},

	stop: function() {
		if (itpr.recursionTimeout) clearTimeout(itpr.recursionTimeout);
		itpr.recursion = false;

		if (!animLoop.isRunning()) {
			itpr.buffer.splice(0);
		}
		else {
			itpr.buffer.splice(1);
		}
	},

	speedChanged: false,
	speed: function(speed) {
		if (speed == 0) {
			turtle.speed = 0;
		}
		else {
			turtle.speed = turtle.speedInitial / speed;
		}
		itpr.speedChanged = true;
	},

	interruption: 0,

	// execution du buffer
	execBuffer: function(animation, redraw) {

		// if instruction in buffer
	    if (itpr.buffer.length > 0 && itpr.buffer[0]) {
	    	time = Date.now();

	    	// set start time
	    	if (!itpr.buffer[0].start) itpr.buffer[0].start = time;
	    	else if (itpr.pauseStart) {
	    		if (animation) {
	    			itpr.buffer[0].start = itpr.buffer[0].start + (time - itpr.pauseStart);
	    		}
	    	}
	    	if (animation) itpr.pauseStart = false;

	    	// set animation duration
	    	if (animation) {
	    		if (!itpr.buffer[0].duration && itpr.commands[itpr.buffer[0].instruction].duration) {
		    		itpr.buffer[0].duration = itpr.commands[itpr.buffer[0].instruction].duration();
		    	}
		        if (!itpr.buffer[0].duration) itpr.buffer[0].duration = 0;
	    	}
	    	else itpr.buffer[0].duration = 0;

	    	// if instruction is running for the last time
	    	if (time >= itpr.buffer[0].start + itpr.buffer[0].duration) {

	    		itpr.commands[itpr.buffer[0].instruction].exec(!redraw && itpr.interruption === -1 ? 0 : 1);
	    		// move instruction to rendered instructions
	    		if (itpr.buffer[0] && itpr.rI) {
	    			itpr.buffer[0].start = undefined;
		    		itpr.buffer[0].duration = undefined;
		    		itpr.rI[itpr.rI.length] = itpr.buffer.splice(0, 1)[0];
	    		}

	    		if (!redraw && itpr.interruption !== 0) {
	    			itpr.pause();
	    			itpr.interruption = 0;
	    		}
	    	}

	    	// if instruction is curently running
	    	else {
	    		var percent = ((time-itpr.buffer[0].start)/itpr.buffer[0].duration);
	            if (turtle.speed > 100 && Kaylee.easing[itpr.commands[itpr.buffer[0].instruction].easing]) {
	                percent = Kaylee.easing[itpr.commands[itpr.buffer[0].instruction].easing](percent, 0, 1, 1);
	            }

	            if (!redraw && itpr.interruption === -1) percent = 1 - percent;
	            if (itpr.speedChanged) {
	            	var lastDuration = itpr.buffer[0].duration;
	            	itpr.buffer[0].duration = itpr.commands[itpr.buffer[0].instruction].duration();
			        if (!itpr.buffer[0].duration) itpr.buffer[0].duration = 0;

	            	var percentTimeInitial = lastDuration * percent;
	            	var percentTimeCurrent = itpr.buffer[0].duration * percent;
	            	var diff = percentTimeInitial - percentTimeCurrent; // +
	            	itpr.buffer[0].start += diff;

	            	itpr.speedChanged = false;
	            }
	    		if (percent) itpr.commands[itpr.buffer[0].instruction].exec(percent);
	    	}
	    }
	    // if buffer is empty
	    else {
	    	// stop animation loop
	    	itpr.pause();
	    }

	    toolbar.setInactive();
	},

	// interprete a string input
	run: function(str) {
		try {
			str = trimWhiteSpace(str);
			var match;
			if (itpr.capture && itpr.commands[itpr.capture]) {
				match = str.match(/^([^F]|F[^I]|FI[^N])+/g) || [''];
				var fin = str.match(/(FIN)/g);
				if (fin) {
					itpr.commands[itpr.capture].buffer = trimWhiteSpace(itpr.commands[itpr.capture].buffer + ' ' + match[0]);
					str = str.replace(match[0], '');
					itpr.checkIfRecursive(itpr.capture);
					itpr.capture = false;
					itpr.run(str);
				}
				else {
					itpr.commands[itpr.capture].buffer = trimWhiteSpace(itpr.commands[itpr.capture].buffer + ' ' + str);
				}
			}
			else {
				var bracket, j;
				for (var i in this.commands) {
					match = str.match(this.commands[i].reg);
					if (match) {
						if (match[1] == 'REPETE') {
							bracket = 1;
							j = match[0].length - 1;
							while (bracket > 0 && j < str.length) {
								j++;
								if (str[j] == '[') bracket++;
								else if (str[j] == ']') bracket--;
							}
							match = ['REPETE', match[2], str.substring(match[0].length, j)];
							str = str.slice(j + 1);
						}
						else {
							str = str.replace(match[0], '');
						}
						var store;
						this.commands[i].store ? store = this.commands[i].store(match) : itpr.store(match);
						if (store) {
							itpr.run(store + str);
						}
						else itpr.run(str);
					}
				}

				if (str.length > 0 && !match && str[0] != ' ') {
					shell.error(str);
				}
			}
			shell.setMode();
		} catch (e) {
			itpr.recursion = true;
			itpr.recursiveExec(str);
		}
	},

	recursionTimeout: undefined,
	recursion: false,
	checkIfRecursive: function(name) {
		if (itpr.commands[name].buffer.match(new RegExp('(^|\\\s|\\\[)('+ escapeRegExp(name) +')($|\\\s|\\\])'))) {
			shell.message("Pour comprendre le principe de récursivité, il faut d'abord comprendre le principe de récursivité.");
		}
	},
	recursiveExec: function(str) {
		if (itpr.buffer.length < 300) {
			itpr.recursionTimeout = setTimeout(function() {
				itpr.recursion = false;
				itpr.run(str);
			}, 500);
		}
		else {
			itpr.recursionTimeout = setTimeout(function() {
				itpr.recursiveExec(str);
			}, 500);
		}
	},

	rI2MG: function() {
		var x = y = a = 0;
		var d = true;
		var dump = [];
		var move = false;
		var c, newPos;
		for (var i = 0; i < itpr.rI.length; i++) {
			c = itpr.rI[i];

			if (c.instruction == 'AV') {
				if (!move && d) {
					move = true;
					dump = [[x, y]];
				}
				newPos = Math.translate(x, y, parseInt(c.args), a);
				x = Math.round(newPos.x * 100)/100, y = Math.round(newPos.y * 100)/100;
				if (d) {
					dump[dump.length] = [x, y];
				}
			}
			else if (c.instruction == 'RE') {
				if (!move && d) {
					move = true;
					dump = [[x, y]];
				}
				newPos = Math.translate(x, y, -parseInt(c.args), a);
				x = Math.round(newPos.x * 100)/100, y = Math.round(newPos.y * 100)/100;
				if (d) {
					dump[dump.length] = [x, y];
				}
			}
			else if (c.instruction == 'TD') {
				a += parseInt(c.args);
			}
			else if (c.instruction == 'TG') {
				a -= parseInt(c.args);
			}
			else if (c.instruction == 'LC') {
				dump[dump.length] = false;
				d = false;
			}
			else if (c.instruction == 'BC') {
				d = true;
				dump[dump.length] = [x, y];
			}
		}
		
		return JSON.stringify({
			arr: dump,
			margin: 10,
			checkMargin: 10
		});
	},

	redraw: {
		rI: function() {
			itpr.pause();
			canvasDraw.clear();

			mG.current.validPoints = [];

			var tmpBuffer = itpr.buffer.slice(0);
		    var tmprI = itpr.rI.slice(0);
		    itpr.buffer = itpr.rI.slice(0);

	        // reset buffer and turtle properties
	        itpr.rI = [];
	        turtle.reset();

	        // execute rendered instructions
	        var length = itpr.buffer.length;

	        for (var i = 0; i < length; i++) {
	        	itpr.execBuffer(false, true);
	        }

	        // reset buffer and rendered instructions
	        itpr.buffer = tmpBuffer,
	        itpr.rI = tmprI;

	        if (mG.current) {
	        	mG.current.win = mG.current.lose = false
	        	mG.current.validPoints = [];
	        	mG.current.draw();
	        }

	        canvasTurtle.clear();

	        // draw turtle
			draw.turtle(canvasTurtle);
		},
		all: function() {
			itpr.pause();

			if (mG.current) mG.current.validPoints = [];
			itpr.buffer = itpr.rI.slice(0).concat(itpr.buffer.slice(0));

			canvasDraw.clear();

			itpr.rI = [];
			turtle.reset();
			var length = itpr.buffer.length;
			for (var i = 0; i < length; i++) itpr.execBuffer(false, true);
			canvasTurtle.clear();

			draw.turtle(canvasTurtle);
		}
	}
};

(function() {
    itpr.protectPrimitives();
})();

// REPETE 18 [TD 20 REPETE 9 [TD 20 AV 20] LC TD 100 AV 115 BC TD 80]

// REPETE 18 [TD 20 REPETE 9 [TD 20 AV 20]]

// REPETE 18 [AV 100 TD 100] CT

// POUR rect :x :y CT REPETE :y [AV :x TD 180 AV :x TG 90 AV 1 TG 90] MT FIN rect 100 10