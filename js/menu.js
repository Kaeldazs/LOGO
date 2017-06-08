Menu = function() {
	this.width = 200;
	this.submenu = {};
	this.container = document.createElement('div');
	this.container.id = 'menu-container';
	this.container.style.width = this.width + 'px';
	document.body.appendChild(this.container);

	this.add = function(name, text) {
		var el = document.createElement('div');
		el.className = 'submenu';
		el.innerHTML = text;
		this.container.appendChild(el);
		this.submenu[name] = {
			el: el,
			text: text
		};
	};

	for (var p in itpr.commands) {
		this.add(p, 
			'<div class="synthax">'+
				itpr.commands[p].doc.synthax +
			'</div>'+
			'<div>'+
				itpr.commands[p].doc.description +
			'</div>'
		);
	}
};