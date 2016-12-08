var itpr = {
	commands: {
		AV: {
			type: 'procedure',
			reg: /^(AV)\s([0-9]|:[a-zA-Z0-9_$]+)/,
			doc: 'AV pixels //The turtle moves pixels foward',
			exec: function() {
				//
			}
		},
		RE: {
			type: 'procedure',
			reg: /^(RE)\s([0-9]|:[a-zA-Z0-9_$]+)/,
			doc: 'RE pixels //The turtle moves pixels backward',
			exec: function() {
				//
			}
		},
		TD: {
			type: 'procedure',
			reg: /^(TD)\s([0-9]|:[a-zA-Z0-9_$]+)/,
			doc: 'TD degrees //The turtle turns degrees to the right',
			exec: function() {
				//
			}
		},
		TG: {
			type: 'procedure',
			reg: /^(TG)\s([0-9]|:[a-zA-Z0-9_$]+)/,
			doc: 'TG degrees //The turtle turns degrees to the left',
			exec: function() {
				//
			}
		},
		FCC: {
			type: 'procedure',
			reg: /^(FCC)\s(#([[:xdigit:]]{6}|[[:xdigit:]]{3}))/,
			doc: 'FCC color //Change the trace color to color in RGB format as #FF0000 for red',
			exec: function() {
				//
			}
		},
		LC: {
			type: 'procedure',
			reg: /^(LC)/,
			doc: 'LC //Pen up (no trace)',
			exec: function() {
				//
			}
		},
		BC: {
			type: 'procedure',
			reg: /^(BC)/,
			doc: 'BC //Pen down (trace active)',
			exec: function() {
				//
			}
		},
		VE: {
			type: 'procedure',
			reg: /^(VE)/,
			doc: 'VE //Clears the screen and put the turtle at the center, facing upwards',
			exec: function() {
				//
			}
		},
		CT: {
			type: 'procedure',
			reg: /^(CT)/,
			doc: 'CT //Hide the turtle',
			exec: function() {
				//
			}
		},
		MT: {
			type: 'procedure',
			reg: /^(MT)/,
			doc: 'MT //Show the turtle',
			exec: function() {
				//
			}
		},
		REPETE: {
			type: 'structure',
			reg: /^REPETE\s([0-9]|:[a-zA-Z0-9_$])\s\[([^\]]+)\]/,
			doc: 'REPETE x [commands] //Do the commands x times',
			store: function(match) {
				var iterations = match[1];
				var commands = match[2];
				for (var i = 0; i < iterations; i++) {
					itpr.run(commands);
				}
			},
			exec: function() {
				//
			}
		},
		POUR: {
			type: 'function',
			reg: /^(POUR)\s([^\s]+)(?:\s:(?:[a-zA-Z0-9_$]+))*/,
			doc: '',
			store: function(match) {
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
							var argsStr = this.buffer[i][1];
							for (var j = 0; j < this.localVar.length; j++) {
								var r = new RegExp('^'+ this.localVar[j] +'$', 'g')
								argsStr = argsStr.replace(r, match[j + 2]);
							}
							itpr.buffer[itpr.buffer.length] = [this.buffer[i][0], argsStr];
						}
					}
				}
				itpr.capture = match[2] + '';
			}
		},
		FIN: {
			type: 'procedure',
			reg: /^(FIN)/,
			doc: 'FIN //End of capture',
			store: function(match) {
				itpr.capture = false
			},
			exec: function() {
				//
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
			itpr.buffer[itpr.buffer.length] = [match[1], match[2]];
		}
	},
	clear: function() {
		itpr.buffer = [];
	},
	capture: false,
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