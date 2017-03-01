Toolbar = function() {
	var _this = this;
	this.height = 40;
	this.btn = {};
	this.create = function() {
		var tb = document.createElement('div');
		tb.id = 'toolbar';
		tb.style.bottom = shell.height + 'px';
		tb.style.height = _this.height + 'px';

		_this.btn.playPause = document.createElement('img');
		_this.btn.playPause.src = 'img/play.png'
		_this.btn.playPause.style.marginTop = (_this.height - 24)/2 + 'px';
		_this.btn.playPause.onclick = function() {
			itpr.toggle();
		};
		tb.appendChild(_this.btn.playPause);

		_this.btn.clear = document.createElement('img');
		_this.btn.clear.src = 'img/clear.png'
		_this.btn.clear.style.marginTop = (_this.height - 24)/2 + 'px';
		_this.btn.clear.onclick = function() {
			itpr.clear(true)
		};
		tb.appendChild(_this.btn.clear);

		document.body.appendChild(tb);
	}
};