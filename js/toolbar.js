Toolbar = function() {
	var _ = this;
	this.height = 40;
	this.btn = {};
	this.el;

	this.setInactive = function() {
		if (itpr.rI.length > 0) {
			if (this.btn.firstStep.classList.contains('inactive')) this.btn.firstStep.classList.remove('inactive');
			if (this.btn.backStep.classList.contains('inactive')) this.btn.backStep.classList.remove('inactive');
		}
		else {
			this.btn.firstStep.classList.add('inactive');
			this.btn.backStep.classList.add('inactive');
		}

		if (itpr.buffer.length > 0) {
			if (this.btn.play.classList.contains('inactive')) this.btn.play.classList.remove('inactive');
			if (this.btn.stop.classList.contains('inactive')) this.btn.stop.classList.remove('inactive');
			if (this.btn.nextStep.classList.contains('inactive')) this.btn.nextStep.classList.remove('inactive');
			if (this.btn.lastStep.classList.contains('inactive')) this.btn.lastStep.classList.remove('inactive');
		}
		else {
			this.btn.play.classList.add('inactive');
			this.btn.stop.classList.add('inactive');
			this.btn.nextStep.classList.add('inactive');
			this.btn.lastStep.classList.add('inactive');
		}
	}

	this.setSize = function() {
		_.el.style.width = (window.innerWidth - menu.width) + 'px';
	}

	this.create = function() {
		_.el = document.createElement('div');
		_.el.id = 'toolbar';
		_.el.style.bottom = shell.height + 'px';
		_.el.style.height = _.height + 'px';
		this.setSize();

		_.genBtnImg({
			src: 'img/clear.png',
			tooltip: 'gommer',
			onclick: function() {
				itpr.clear(true);
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			src: 'img/first_step.png',
			name: 'firstStep',
			tooltip: 'première étape',
			onclick: function() {
				itpr.pause();
				itpr.buffer = itpr.rI.concat(itpr.buffer);
				itpr.rI = [];
				itpr.redraw.rI();
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			src: 'img/back_step.png',
			name: 'backStep',
			tooltip: 'étape précédente',
			onclick: function() {
				if (itpr.rI.length > 0) {
					itpr.pause();
					itpr.interruption = -1;
					itpr.buffer.splice(0, 0, itpr.rI.splice(-1)[0]);
					itpr.redraw.rI();

					itpr.buffer[0].start = undefined;
				}
				itpr.play();
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			class: 'playPause',
			src: 'img/play.png',
			name: 'play',
			tooltip: 'jouer',
			onclick: function() {
				itpr.play();
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			class: 'playPause',
			src: 'img/pause.png',
			name: 'pause',
			tooltip: 'pause',
			onclick: function() {
				itpr.pause();
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			src: 'img/stop.png',
			name: 'stop',
			tooltip: 'stop',
			onclick: function() {
				itpr.stop();
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			src: 'img/next_step.png',
			name: 'nextStep',
			tooltip: 'étape suivante',
			onclick: function() {
				itpr.interruption = 1;
				itpr.play();
				toolbar.setInactive();
			}
		});

		_.genBtnImg({
			src: 'img/last_step.png',
			name: 'lastStep',
			tooltip: 'dernière étape',
			onclick: function() {
				itpr.redraw.all();
				toolbar.setInactive();
			}
		});
		
		_.genBtnImg({
			src: 'img/slow.png',
			name: 'slow',
			class: 'speed',
			tooltip: 'vitesse lente',
			onclick: function(el) {
				_.activeBtn(el, 'active', '#toolbar .active.speed');
				itpr.speed(1);
			}
		});

		_.genBtnImg({
			name: 'normal',
			src: 'img/normal.png',
			class: 'speed',
			tooltip: 'vitesse normale',
			onclick: function(el) {
				_.activeBtn(el, 'active', '#toolbar .active.speed');
				itpr.speed(3);
			}
		});

		_.genBtnImg({
			name: 'fast',
			src: 'img/fast.png',
			class: 'speed',
			tooltip: 'vitesse rapide',
			onclick: function(el) {
				_.activeBtn(el, 'active', '#toolbar .active.speed');
				itpr.speed(6);
			}
		});

		_.btn.fast.click();

		_.genBtnImg({
			src: 'img/grid.png',
			class: 'grid active right',
			tooltip: 'grille',
			onclick: function(el) {
				if (grid.canvas.el.style.opacity == 1) {
					grid.hide();
					el.classList.remove('active');
				}
				else {
					grid.show();
					el.classList.add('active');
				}
			}
		});
		document.body.appendChild(_.el);
		toolbar.setInactive();
	}

	_.genBtnImg = function(opt) {
		var name = opt.name ? opt.name : 'btn-' + inc.next();
		if (opt.src) {
			_.btn[name] = document.createElement('img');
			_.btn[name].src = opt.src;
			_.btn[name].style.marginTop = (_.height - 24)/2 + 'px';
		}

		if (opt.onclick) {
			_.btn[name].onclick = function() {
				if (!this.classList.contains('inactive')) {
					opt.onclick(this);
				}
			}
		}

		if (opt.class) _.btn[name].className = opt.class;
		_.btn[name].ondragstart = function(e) {
			e.preventDefault();
		};
		_.el.appendChild(_.btn[name]);
		if (opt.tooltip) {
			_.btn[name].onmouseover = function() {
				tooltip(this, opt.tooltip);
			}
		}
	};

	_.activeBtn = function(el, remove, selector) {
		removeClassName(remove, selector);
		el.classList.add(remove);
	};
};