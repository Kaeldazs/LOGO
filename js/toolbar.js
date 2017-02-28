Toolbar = function() {
	var _this = this;
	this.height = 40;
	this.create = function() {
		var tb = document.createElement('div');
		tb.id = 'toolbar';
		tb.style.bottom = shell.height + 'px';
		tb.style.height = _this.height + 'px';

		var btn1 = document.createElement('span');
		btn1.innerHTML = 'play/pause';
		btn1.style.lineHeight = _this.height + 'px';
		tb.appendChild(btn1);

		var btn2 = document.createElement('span');
		btn2.innerHTML = 'clear';
		btn2.onclick = function() {
			itpr.clear(true)
		};
		btn2.style.lineHeight = _this.height + 'px';
		tb.appendChild(btn2);

		document.body.appendChild(tb);
	}
};