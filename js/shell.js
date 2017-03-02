var Shell = function() {
	var _this = this;
	this.height = 200;
	this.history = [];
	this.historyCursor = -1;
	this.historyMaxLen = 100;
	this.clearCanvas = true;

	this.setMode = function() {
		_this.shellMode.innerHTML = itpr.capture ? '> ' : '? ';
	};

	this.create = function() {
		_this.el = document.createElement('div');
		_this.el.id = 'shell';
		_this.el.style.height = _this.height + "px";

		_this.elLine = document.createElement('div');
		_this.shellMode = document.createElement('span');
		_this.elLine.appendChild(_this.shellMode);
		_this.setMode();

		_this.input = document.createElement('input');
		_this.input.type = 'text';
		_this.input.id = 'shell-input';
		_this.elLine.appendChild(_this.input);

		_this.fakeInput = document.createElement('span');
		_this.fakeInput.style.position = 'absolute';
		_this.elLine.appendChild(_this.fakeInput);

		_this.caretPos = document.createElement('span');
		_this.caretPos.style.position = 'relative';
		_this.caretPos.style.opacity = 0;
		_this.elLine.appendChild(_this.caretPos);

		_this.caret = document.createElement('span');
		_this.caret.id = 'caret';
		_this.caret.className = 'blink';
		_this.caret.innerHTML = '_';
		_this.elLine.appendChild(_this.caret);

		_this.el.appendChild(_this.elLine);
		document.body.appendChild(_this.el);

		this.shellInput = function() {
			var val = _this.input.value;
			var regNbsp = new RegExp('\\\s', 'img');
			_this.fakeInput.innerHTML = val.replace(regNbsp, '&nbsp');
			var pos = 0;
			if (document.selection) {
				var selection = document.selection.createRange();
				selection.moveStart('character', - _this.input.value.length);
				pos = selection.text.length;
			}
			else if (_this.input.selectionStart || _this.input.selectionStart == '0') {
				pos = _this.input.selectionStart;
			}
			_this.caretPos.innerHTML = val.substring(0, pos).replace(regNbsp, '&nbsp');
		}
		_this.input.onkeyup = function(e) {
			_this.caret.className = 'blink';
			_this.shellInput();
		}
		_this.input.onkeydown = function(e) {
			// echap
			if (e.which == 27) {
				_this.input.value = '';
			}

			// enter
			else if (e.which == 13) {

				if (_this.history[_this.history.length - 1] != _this.input.value) {
					_this.history[_this.history.length] = _this.input.value;
				}
				if (_this.history.length > this.historyMaxLen) {
					_this.history.shift();
				}
				var val = _this.input.value;
				_this.input.value = '';
				_this.historyCursor = -1;

				var func = function() {
					var capture = itpr.run(val);
				}
				if (_this.clearCanvas) {
					itpr.clear(true);
					turtle.speed = turtle.speedInitial;
					setTimeout(func, 500);
				}
				else {
					func();
				}
			}

			// ctrl-C
			else if (e.which == 67 && e.ctrlKey) {
				_this.input.value = '';
				_this.historyCursor = -1;
			}

			// arrow up
			else if (e.which == 38) {
				e.preventDefault();
				if (_this.historyCursor + 1 < _this.history.length) {
					_this.historyCursor += 1;
					_this.input.value = _this.history[_this.history.length - _this.historyCursor - 1];
				}
			}

			// arrow down
			else if (e.which == 40) {
				e.preventDefault();
				_this.historyCursor -= 1;
				if (_this.historyCursor <= -1) {
					_this.input.value = '';
					_this.historyCursor = -1;
					_this.input.value = '';
				}
				else {
					_this.input.value = _this.history[_this.history.length - _this.historyCursor - 1];
				}
			}

			_this.caret.className = '';
			_this.shellInput();
		}
		window.onclick = function(e) {
			_this.input.focus();
		}
		_this.input.focus();
	};
};