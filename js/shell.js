var Shell = function() {
	var _this = this;
	this.height = 200;

	this.history = {
		arr: [],
		cursor: -1,
		maxLen: 100,
		push: function(str) {
			if (str != '' && _this.history.arr[_this.history.arr.length - 1] != str) {
				_this.history.arr[_this.history.arr.length] = str;
				if (_this.history.arr.length > _this.history.maxLen) {
					_this.history.arr.shift();
				}
			}
		},
		last: function() {
			_this.history.cursor = -1;
			return '';
		},
		prev: function() {
			if (_this.history.cursor + 1 < _this.history.arr.length) {
				_this.history.cursor += 1;
			}
			var output = _this.history.arr[_this.history.arr.length - _this.history.cursor - 1];
			return output ? output : '';
		},
		next: function() {
			_this.history.cursor -= 1;
			if (_this.history.cursor <= -1) {
				return _this.history.last();
			}
			else {
				return _this.history.arr[_this.history.arr.length - _this.history.cursor - 1];
			}
		}
	};

	this.clearCanvas = true;

	this.setMode = function() {
		_this.shellMode.innerHTML = itpr.capture ? '> ' : '? ';
	};

	this.writeLine = function(str, mode) {
		var space = ' ';
		if (!mode) {
			space = '';
			mode = '';
		}
    	_this.shellHistory.innerHTML = this.shellHistory.innerHTML + mode + space + str + '<br>';
    	_this.scrollBottom();
	}

	this.message = function(str) {
		this.writeLine("<span style=\"color:white\">" + str + "</span>");
	};

	this.error = function(str, fullSize) {
		if (!fullSize && str.length > 15) str = str.substring(0, 30) + '... <span style="font-size:0.8em">(+'+ (str.length - 15) +' characters)</span>';
		this.writeLine('<span class ="error">ERROR: '+ str +'</span>');
	};

	this.scrollBottom = function() {
		_this.container.scrollTop = _this.container.scrollHeight;
	};

	this.create = function() {
		_this.el = document.createElement('div');
		_this.el.id = 'shell';
		_this.el.className = 'shell';

		_this.shellHistory = document.createElement('div');
		_this.shellHistory.id = 'shell-history';
		_this.shellHistory.className = 'shell';

		_this.elLine = document.createElement('div');
		_this.elLine.style.bottom = '14px';

		_this.shellMode = document.createElement('span');
		_this.elLine.appendChild(_this.shellMode);
		_this.setMode();

		_this.input = document.createElement('input');
		_this.input.type = 'text';
		_this.input.id = 'shell-input';
		_this.elLine.appendChild(_this.input);

		_this.fakeInput = document.createElement('span');
		_this.fakeInput.style.position = 'absolute';
		_this.fakeInput.style.padding = '0 8px 8px 0';
		_this.fakeInput.innerHTML = '&nbsp';
		_this.elLine.appendChild(_this.fakeInput);

		_this.caretPos = document.createElement('span');
		_this.caretPos.style.position = 'absolute';
		_this.caretPos.style.padding = '0 8px 8px 0';
		_this.elLine.appendChild(_this.caretPos);

		_this.caretPosText = document.createElement('span');
		_this.caretPosText.style.opacity = 0;
		_this.caretPosText.innerHTML = '&nbsp';
		_this.caretPos.appendChild(_this.caretPosText);

		_this.caret = document.createElement('span');
		_this.caret.id = 'caret';
		_this.caret.className = 'blink';
		_this.caret.innerHTML = '&nbsp';
		_this.caretPos.appendChild(_this.caret);

		_this.el.appendChild(_this.elLine);

		_this.container = document.createElement('div');
		_this.container.id = 'shell-container';
		_this.container.style.height = _this.height + "px";

		_this.container.appendChild(_this.shellHistory);
		_this.container.appendChild(_this.el);

		document.body.appendChild(_this.container);

		this.shellInput = function() {
			var val = _this.input.value;
			_this.fakeInput.innerHTML = '&nbsp' + val;
			var pos = 0;
			if (document.selection) {
				var selection = document.selection.createRange();
				selection.moveStart('character', - _this.input.value.length);
				pos = selection.text.length;
			}
			else if (_this.input.selectionStart || _this.input.selectionStart == '0') {
				pos = _this.input.selectionStart;
			}
			_this.caretPosText.innerHTML = '&nbsp' + val.substring(0, pos);
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
				if (trimWhiteSpace(_this.input.value) != '') {
					_this.history.push(_this.input.value);

					var val = _this.input.value;
					_this.writeLine(val, itpr.capture ? '>' : '?');
					_this.scrollBottom();
					_this.input.value = _this.history.last();

					var func = function() {
						var capture = itpr.run(val);
					}
					if (_this.clearCanvas) {
						itpr.clear(true);
						setTimeout(func, 400);
					}
					else {
						func();
					}
				}
			}

			// ctrl-C
			else if (e.which == 67 && e.ctrlKey) {
				if (trimWhiteSpace(_this.input.value) != '') {
					_this.writeLine(_this.input.value, itpr.capture ? '>' : '?');
				}
				_this.input.value = _this.history.last();
				_this.scrollBottom();
			}

			// ctrl-L
			else if (e.which == 76 && e.ctrlKey) {
				e.preventDefault();
				_this.shellHistory.innerHTML = '';
				_this.scrollBottom();
			}

			// arrow up
			else if (e.which == 38) {
				e.preventDefault();
				_this.input.value = _this.history.prev();
				_this.scrollBottom();
			}

			// arrow down
			else if (e.which == 40) {
				e.preventDefault();
				_this.input.value = _this.history.next();
				_this.scrollBottom();
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