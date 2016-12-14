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
			doc: 'AV pixels //The turtle moves pixels foward',
			duration: 400,
			easing: 'ease',
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				var newPos = Math.rotate(0, 0, 0, -move, turtle.a);
				if (percent == 1) {
					turtle.currentMoveX = 0;
					turtle.currentMoveY = 0;
					turtle.x += newPos.x;
					turtle.y += newPos.y;
				}
				else {
					turtle.currentMoveX = newPos.x;
					turtle.currentMoveY = newPos.y;
				}
			}
		},
		RE: {
			type: 'procedure',
			reg: /^(RE)\s([0-9]+|:[a-zA-Z0-9_$]+)/,
			doc: 'RE pixels //The turtle moves pixels backward',
			duration: 400,
			easing: 'ease',
			exec: function(percent) {
				var move = itpr.buffer[0].args * percent;
				var newPos = Math.rotate(0, 0, 0, move, turtle.a);
				if (percent == 1) {
					turtle.currentMoveX = 0;
					turtle.currentMoveY = 0;
					turtle.x += newPos.x;
					turtle.y += newPos.y;
				}
				else {
					turtle.currentMoveX = newPos.x;
					turtle.currentMoveY = newPos.y;
				}
			}
		},
		TD: {
			type: 'procedure',
			reg: /^(TD)\s([0-9]+|:[a-zA-Z0-9_$]+)/,
			doc: 'TD degrees //The turtle turns degrees to the right',
			duration: 400,
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
			doc: 'TG degrees //The turtle turns degrees to the left',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		FCC: {
			type: 'procedure',
			reg: /^(FCC)\s(#([[:xdigit:]]{6}|[[:xdigit:]]{3}))/,
			doc: 'FCC color //Change the trace color to color in RGB format as #FF0000 for red',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		LC: {
			type: 'procedure',
			reg: /^(LC)/,
			doc: 'LC //Pen up (no trace)',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		BC: {
			type: 'procedure',
			reg: /^(BC)/,
			doc: 'BC //Pen down (trace active)',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		VE: {
			type: 'procedure',
			reg: /^(VE)/,
			doc: 'VE //Clears the screen and put the turtle at the center, facing upwards',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		CT: {
			type: 'procedure',
			reg: /^(CT)/,
			doc: 'CT //Hide the turtle',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		MT: {
			type: 'procedure',
			reg: /^(MT)/,
			doc: 'MT //Show the turtle',
			duration: 500,
			exec: function(percent) {
				console.log(
	    			'Running ' + 
	    			itpr.buffer[0].instruction 
	    			+' '+ 
	    			itpr.buffer[0].args
	    			+ ' ('+ 
	    			percent
	    			+')'
	    		);
			}
		},
		REPETE: {
			type: 'structure',
			reg: /^REPETE\s([0-9]+|:[a-zA-Z0-9_$]+)\s\[([^\]]+)\]/,
			doc: 'REPETE x [commands] //Do the commands x times',
			duration: 0,
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
							animLoop.play();
						}
					}
					itpr.capture = match[2] + '';
				}
			}
		},
		FIN: {
			type: 'procedure',
			reg: /^(FIN)/,
			doc: 'FIN //End of capture',
			store: function(match) {
				itpr.capture = false
			}
		}
	},
	buffer: [],
	store: function(match) {
		if (itpr.capture) {
			if (itpr.commands[itpr.capture]) {
				itpr.commands[itpr.capture].buffer[itpr.commands[itpr.capture].buffer.length] = [match[1], match[2]];
			}
		}
		else {
			itpr.buffer[itpr.buffer.length] = {
				instruction: match[1],
				args: match[2],
				start: undefined
			};

			// launch animation loop
			animLoop.play();
		}
	},
	// reset buffer
	clear: function() {
		itpr.buffer = [];
	},

	// which command is capturing user input
	capture: false,

	// interprete a string input
	run: function(str) {
		str = trimWhiteSpace(str);
		for (var i in this.commands) {
			var match = str.match(this.commands[i].reg);
			if (match) {
				this.commands[i].store ? this.commands[i].store(match) : itpr.store(match); 
				str = str.replace(match[0], '');
				itpr.run(str);
			}

		}
	}
}