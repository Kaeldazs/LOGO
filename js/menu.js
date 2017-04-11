Menu = function() {
	this.width = 200;
	this.submenu = {};
	this.container = document.createElement('div');
	this.container.id = 'menu-container';
	this.container.style.width = this.width + 'px';
	document.body.appendChild(this.container);

	this.add = function(name, title) {
		var el = document.createElement('div');
		el.className = 'submenu';
		this.container.appendChild(el);
		this.submenu[name] = {
			el: el,
			title: title,
		};
	};
};