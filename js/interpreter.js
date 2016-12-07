var itpr = {
	commands: {
		AV: {
			type: 'procedure',
			reg: /^(AV)\s([0-9]+)/,
			doc: 'AV pixels //The turtle moves pixels foward'
		},
		RE: {
			type: 'procedure',
			reg: /^(RE)\s([0-9]+)/,
			doc: 'RE pixels //The turtle moves pixels backward'
		},
		TD: {
			type: 'procedure',
			reg: /^(TD)\s([0-9]+)/,
			doc: 'TD degrees //The turtle turns degrees to the right'
		},
		TG: {
			type: 'procedure',
			reg: /^(TG)\s([0-9]+)/,
			doc: 'TG degrees //The turtle turns degrees to the left'
		},
		FCC: {
			type: 'procedure',
			reg: /^(FCC)\s(#([[:xdigit:]]{6}|[[:xdigit:]]{3})+)/,
			doc: 'FCC color //Change the trace color to color in RGB format as #FF0000 for red'
		},
		LC: {
			type: 'procedure',
			reg: /^(LC)/,
			doc: 'LC //Pen up (no trace)'
		},
		BC: {
			type: 'procedure',
			reg: /^(BC)/,
			doc: 'BC //Pen down (trace active)'
		},
		VE: {
			type: 'procedure',
			reg: /^(VE)/,
			doc: 'VE //Clears the screen and put the turtle at the center, facing upwards'
		},
		CT: {
			type: 'procedure',
			reg: /^(CT)/,
			doc: 'CT //Hide the turtle'
		},
		MT: {
			type: 'procedure',
			reg: /^(MT)/,
			doc: 'MT //Show the turtle'
		},
		REPETE: {
			type: 'structure',
			reg: /^REPETE\s([0-9])\s\[([^\]]+)\]/,
			doc: 'REPETE x [commands] //Do the commands x times',
			store: function(match) {
				var iterations = match[1];
				var commands = match[2];
				for (var i = 0; i < iterations; i++) {
					itpr.run(commands);
				}
			}
		},
		POUR: {
			type: 'function',
			reg: /^(POUR)\s([^\s]+)(?:\s:(?:[a-zA-Z0-9_$]+))*/,
			doc: '',
			store: function(match) {
				var argsRegex = /(\s:([a-zA-Z0-9_$]+))/g;
				var args = match[0].match(argsRegex);
				for (var i in args) {
					args[i] = args[i].replace(/^\s:/g, '');
				}
				itpr.commands[match[2] + ''] = {
					type: 'function',
					reg: new RegExp('^(' + match[2] + ')', 'i'),
					buffer: [],
					store: function() {
						for (var i = 0; i < this.buffer.length; i++) {
							itpr.buffer[itpr.buffer.length] = this.buffer[i];
						}
					}
				}
				itpr.capture = match[2] + '';
			}
		},
		FIN: {
			type: 'procedure',
			reg: /^(FIN)/,
			doc: '',
			store: function(match) {
				itpr.capture = false
			}
		}
	},
	buffer: [],
	store: function(match) {
		if (itpr.capture) {
			itpr.commands[itpr.capture].buffer[itpr.commands[itpr.capture].buffer.length] = [match[1], match[2]]
		}
		else {
			itpr.buffer[itpr.buffer.length] = [match[1], match[2]];
		}
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