Menu = function() {


	this.width = 200;

	this.container = document.createElement('div');
	this.container.id = 'menu-container';
	this.container.style.width = this.width + 'px';
	document.body.appendChild(this.container);
};