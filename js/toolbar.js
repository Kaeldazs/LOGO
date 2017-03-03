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
			itpr.clear(true);
		};
		tb.appendChild(_this.btn.clear);

		_this.btn.slow = document.createElement('img');
		_this.btn.slow.src = 'img/slow.png'
		_this.btn.slow.style.marginTop = (_this.height - 24)/2 + 'px';
		_this.btn.slow.onclick = function() {
			_this.activeBtn(_this.btn.slow, 1);
		};
		tb.appendChild(_this.btn.slow);

	_this.btn.normal = document.createElement('img');
		_this.btn.normal.src = 'img/normal.png'
		_this.btn.normal.style.marginTop = (_this.height - 24)/2 + 'px';
		_this.btn.normal.onclick = function() {
			_this.activeBtn(_this.btn.normal, 6);
		};
		tb.appendChild(_this.btn.normal);

	_this.btn.fast = document.createElement('img');
		_this.btn.fast.src = 'img/fast.png'
		_this.btn.fast.style.marginTop = (_this.height - 24)/2 + 'px';
		_this.btn.fast.onclick = function() {
			_this.activeBtn(_this.btn.fast, 0);
		};
		tb.appendChild(_this.btn.fast);

		document.body.appendChild(tb);
	}

	_this.activeBtn = function(el, speed) {
		removeClassName('active', '#toolbar .active');
		el.classList.add('active');
		itpr.speed(speed);
	};
};