Toolbar = function() {
	var _ = this;
	this.height = 40;
	this.btn = {};
	this.el;
	this.create = function() {
		_.el = document.createElement('div');
		_.el.id = 'toolbar';
		_.el.style.bottom = shell.height + 'px';
		_.el.style.height = _.height + 'px';

		_.genBtnImg({
			src: 'img/clear.png',
			onclick: function() {
				itpr.clear(true);
			}
		});

		_.genBtnImg({
			src: 'img/back_step.png',
			onclick: function() {
				if (itpr.rI.length > 0) {
					itpr.pause();
					itpr.interruption = -1;
					itpr.buffer.splice(0, 0, itpr.rI.splice(-1)[0]);
					itpr.redraw.rI();

					itpr.buffer[0].start = undefined;
				}
				itpr.play();
			}
		});

		_.genBtnImg({
			class: 'playPause',
			src: 'img/play.png',
			name: 'play',
			onclick: function() {
				itpr.play();
			}
		});

		_.genBtnImg({
			class: 'playPause',
			src: 'img/pause.png',
			name: 'pause',
			onclick: function() {
				itpr.pause();
			}
		});

		_.genBtnImg({
			src: 'img/stop.png',
			onclick: function() {
				itpr.stop();
			}
		});

		_.genBtnImg({
			src: 'img/next_step.png',
			onclick: function() {
				itpr.interruption = 1;
				itpr.play();
			}
		});

		_.genBtnImg({
			src: 'img/last_step.png',
			onclick: function() {
				itpr.redraw.all();
			}
		});
		
		_.genBtnImg({
			src: 'img/slow.png',
			name: 'slow',
			class: 'speed',
			onclick: function() {
				_.activeBtn(this, 'active', '#toolbar .active.speed');
				itpr.speed(1);
			}
		});

		_.genBtnImg({
			name: 'normal',
			src: 'img/normal.png',
			class: 'speed',
			onclick: function() {
				_.activeBtn(this, 'active', '#toolbar .active.speed');
				itpr.speed(5);
			}
		});

		_.genBtnImg({
			name: 'fast',
			src: 'img/fast.png',
			class: 'speed',
			onclick: function() {
				_.activeBtn(this, 'active', '#toolbar .active.speed');
				itpr.speed(0);
			}
		});

		_.btn.fast.click();

		_.genBtnImg({
			src: 'img/grid.png',
			class: 'grid active',
			onclick: function() {
				if (grid.canvas.el.style.opacity == 1) {
					grid.hide();
					this.classList.remove('active');
				}
				else {
					grid.show();
					this.classList.add('active');
				}
			}
		});
		document.body.appendChild(_.el);
	}

	_.genBtnImg = function(opt) {
		var name = opt.name ? opt.name : 'btn-' + inc.next();
		if (opt.src) {
			_.btn[name] = document.createElement('img');
			_.btn[name].src = opt.src;
			_.btn[name].style.marginTop = (_.height - 24)/2 + 'px';
		}
		if (opt.onclick) _.btn[name].onclick = opt.onclick;
		if (opt.class) _.btn[name].className = opt.class;
		_.btn[name].ondragstart = function(e) {
			e.preventDefault();
		};
		_.el.appendChild(_.btn[name]);
	};

	_.activeBtn = function(el, remove, selector) {
		removeClassName(remove, selector);
		el.classList.add(remove);
	};
};