var interpreter = {
	commands: {
		AV: {
			type: 'procedure',
			reg: /^(AV)\s([0-9])/i,
			doc: 'AV pixels //The turtle moves pixels foward'
		},
		RE: {
			type: 'procedure',
			reg: /^(RE)\s([0-9])/i,
			doc: 'RE pixels //The turtle moves pixels backward'
		},
		TD: {
			type: 'procedure',
			reg: /^(TD)\s([0-9]+)/i,
			doc: 'TD degrees //The turtle turns degrees to the right'
		},
		TG: {
			type: 'procedure',
			reg: /^(TG)\s([0-9]+)/i,
			doc: 'TG degrees //The turtle turns degrees to the left'
		},
		FCC: {
			type: 'procedure',
			reg: /^(FCC)\s(#([[:xdigit:]]{6}|[[:xdigit:]]{3})+)/i,
			doc: 'FCC color //Change the trace color to color in RGB format as #FF0000 for red'
		},
		LC: {
			type: 'procedure',
			reg: /^(LC)/i,
			doc: 'LC //Pen up (no trace)'
		},
		BC: {
			type: 'procedure',
			reg: /^(BC)/i,
			doc: 'BC //Pen down (trace active)'
		},
		VE: {
			type: 'procedure',
			reg: /^(VE)/i,
			doc: 'VE //Clears the screen and put the turtle at the center, facing upwards'
		},
		CT: {
			type: 'procedure',
			reg: /^(CT)/i,
			doc: 'CT //Hide the turtle'
		},
		MT: {
			type: 'procedure',
			reg: /^(MT)/i,
			doc: 'MT //Show the turtle'
		},
		REPETE: {
			type: 'structure',
			reg: /^REPETE\s([0-9])\s\[([^\]]+)\]/i,
			doc: 'REPETE x [commands] //Do the commands x times',
			store: function(match) {
				var iterations = match[1];
				var commands = match[2];
				for (var i = 0; i < iterations; i++) {
					interpreter.run(commands);
				}
			}
		},
		POUR: {
			type: 'function',
			reg: /^(POUR)\s([^\s]+)(?:\s:(?:[a-zA-Z0-9_$]+))*/i,
			doc: '',
			store: function(match) {
				var argsRegex = /(\s:([a-zA-Z0-9_$]+))/i;
			}
		}
	},
	buffer: [],
	store: function(match) {
		interpreter.buffer[interpreter.buffer.length] = [match[1], match[2]];
	},
	run: function(str) {
		str = trimWhiteSpace(str);
		for (var i in this.commands) {
			var match = str.match(this.commands[i].reg);
			if (match) {
				this.commands[i].store ? this.commands[i].store(match) : interpreter.store(match); 
				str = str.replace(match[0], '');
				interpreter.run(str);
			}
		}
	}
}