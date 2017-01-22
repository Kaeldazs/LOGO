var itpr = {
	// commands list
	commands: {
		/*
			type: type of command (for syntaxic coloration),
			reg: RegExp for find this command,
			doc: documentation
			duration: animation duration
			exec: what append when execute this command,
			store: what append when storing this command on buffer
		*/
		AV: {
			type: 'procedure',
			reg: /^(AV)\s([0-9]+|:[a-zA-Z0-9_$]+)/,
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
			reg: /^(RE)\s([0-9]+|:[a-zA-Z0-9_$]+)/,
			doc: 'RE pixels // The turtle moves pixels backward',
			duration: function() { return turtle.speed },
			easing: 'ease',
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				var newPos = Math.rotate(0, 0, 0, move, turtle.a);
				if (percent == 1) {

					var newPosX = turtle.x + newPos.x,
						newPosY = turtle.y + newPos.y;

					if (turtle.draw) {
						draw.line(canvasDraw, turtle.x, turtle.y, newPosX, newPosY);
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
			reg: /^(TD)\s([0-9]+|:[a-zA-Z0-9_$]+)/,
			doc: 'TD degrees // The turtle turns degrees to the right',
			duration: function() { return turtle.speed },
			easing: 'ease',
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				if (percent == 1) {
					turtle.currentMoveA = 0;
					turtle.a += move;
				}
				else {
					turtle.currentMoveA = move;
				}
			}
		},
		TG: {
			type: 'procedure',
			reg: /^(TG)\s([0-9]+|:[a-zA-Z0-9_$]+)/,
			doc: 'TG degrees // The turtle turns degrees to the left',
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
			exec: function() {
				turtle.colorLine = itpr.buffer[0].args;
			}
		},
		LC: {
			type: 'procedure',
			reg: /^(LC)/,
			doc: 'LC // Pen up (no trace)',
			exec: function() {
				turtle.draw = false;
			}
		},
		BC: {
			type: 'procedure',
			reg: /^(BC)/,
			doc: 'BC // Pen down (trace active)',
			exec: function() {
				turtle.draw = true;
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
					turtle.opacity = 1 - percent;
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
					turtle.opacity = percent;
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
				if (itpr.capture) {
					if (itpr.commands[itpr.capture]) {
						itpr.commands[itpr.capture].buffer[itpr.commands[itpr.capture].buffer.length] = ['REPETE', match[1], match[2]];
					}
				}
				else {
					for (var i = 0; i < iterations; i++) {
						itpr.run(commands);
					}
				}
			}
		},
		POUR: {
			type: 'function',
			reg: /^(POUR)\s([^\s]+)(?:\s:(?:[a-zA-Z0-9_$]+))*/,
			doc: '',
			store: function(match) {
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
						buffer: [],
						localVar: args,
						store: function(match) {
							var i;
							for (i = 0; i < this.buffer.length; i++) {
								if (this.buffer[i][0] == 'REPETE') {
									var tmp = this.buffer[i][2];
									var iteration = this.buffer[i][1];
									for (var j = 0; j < this.localVar.length; j++) {
										var r = new RegExp(' ' + this.localVar[j] + '$', 'g');
										tmp = tmp.replace(r, ' ' + match[j + 2]);
										r = new RegExp('^' + this.localVar[j] + '$', 'g');
										iteration = iteration.replace(r, match[j + 2]);
										r = new RegExp(' ' + this.localVar[j] + ' ', 'g');
										tmp = tmp.replace(r, ' ' + match[j + 2] + ' ');
									}
									for (var k = 0; k < iteration; k++) {
										itpr.run(tmp);
									}
								}
								else {
									var argsStr = this.buffer[i][1];
									for (var j = 0; j < this.localVar.length; j++) {
										var r = new RegExp('^'+ this.localVar[j] +'$', 'g')
										argsStr = argsStr.replace(r, match[j + 2]);
									}
									itpr.buffer[itpr.buffer.length] = {
										instruction: this.buffer[i][0],
										args: argsStr,
										start: undefined
									};
								}
							}
							itpr.play();
						}
					}
					itpr.capture = match[2] + '';
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

	store: function(match) {
		// si la capture de l'instruction est déléguée
		if (itpr.capture) {
			if (itpr.commands[itpr.capture]) {
				itpr.commands[itpr.capture].buffer[itpr.commands[itpr.capture].buffer.length] = [match[1], match[2]];
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
	clear: function(animate) {

		itpr.pause();
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
			var turtlePos = [turtle.x, turtle.y, turtle.a % 360, turtle.opacity];
			Kaylee.animate(function(start, curr) {
				var percent = ((curr - start) / 300);
	            percent = Kaylee.easing['ease'](percent, 0, 1, 1);

	            turtle.x = turtlePos[0] * (1 - percent);
	            turtle.y = turtlePos[1] * (1 - percent);
	            turtle.a = turtlePos[2] * (1 - percent);
	            turtle.opacity = turtle[3] + (1 - turtle[3]) * percent;

	            canvasTurtle.clear();
				draw.turtle(canvasTurtle);

	            canvasDraw.el.style.opacity = 1 - percent;
	            if (curr - start > 300) {
	            	this.stop();
	            	turtle.reset();
					canvasDraw.clear();
					canvasTurtle.clear();
					canvasDraw.el.style.opacity = '';
					draw.turtle(canvasTurtle);
	            }
			});
		}
	},

	// which command is capturing user input
	capture: false,

	// animation is running ?
	pauseStart: Date.now(),

	// interpreter controls
	pause: function() {
		animLoop.pause();
		itpr.pauseStart = Date.now();
	},

	play: function() {
		animLoop.play();
	},

	toggle: function() {
		itpr.pauseStart ? itpr.play() : itpr.pause();
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

	// execution du buffer
	execBuffer: function(animation) {
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

	    		itpr.commands[itpr.buffer[0].instruction].exec(1);

	    		// move instruction to rendered instructions
	    		if (itpr.buffer[0] && itpr.rI) {
	    			itpr.buffer[0].start = undefined;
		    		itpr.buffer[0].duration = undefined;
		    		itpr.rI[itpr.rI.length] = itpr.buffer[0];
		    		itpr.buffer.splice(0,1);
	    		}
	    	}

	    	// if instruction is curently running
	    	else {
	    		var percent = ((time-itpr.buffer[0].start)/itpr.buffer[0].duration);
	            if (turtle.speed > 100 && Kaylee.easing[itpr.commands[itpr.buffer[0].instruction].easing]) {
	                percent = Kaylee.easing[itpr.commands[itpr.buffer[0].instruction].easing](percent, 0, 1, 1);
	            }

	            if (itpr.speedChanged) {
	            	// itpr.buffer[0].duration
	            	// percent
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
	},

	// interprete a string input
	run: function(str) {
		str = trimWhiteSpace(str);
		for (var i in this.commands) {
			var match = str.match(this.commands[i].reg);
			if (match && match[1] == 'REPETE') {
				var bracket = 1;
				var j = match[0].length - 1;
				while (bracket > 0 || j < str.length) {
					j++;
					if (str[j] == '[') bracket++;
					else if (str[j] == ']') bracket--;
				}
				match = ['REPETE', match[2], str.substring(match[0].length, j - 1)];
			}
			if (match) {
				this.commands[i].store ? this.commands[i].store(match) : itpr.store(match); 
				str = str.replace(match[0], '');
				itpr.run(str);
			}
		}
	}
}