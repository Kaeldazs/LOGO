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

		_.genBtnImg('clear', 'img/clear.png', function() {
			itpr.clear(true);
		});

		_.genBtnImg('backStep', 'img/back_step.png', function() {

		});

		_.genBtnImg('playPause', 'img/play.png', function() {
			itpr.toggle();
		});

		_.genBtnImg('stop', 'img/stop.png', function() {
			itpr.toggle();
		});
		
		_.genBtnImg('nextStep', 'img/next_step.png', function() {
			if (itpr.interruption === false) {
				itpr.interruption = 0;
			}
			itpr.interruption++;
			itpr.play();
		});

		_.genBtnImg('lastStep', 'img/last_step.png', function() {
			itpr.pause();

			itpr.buffer = itpr.rI.slice(0).concat(itpr.buffer.slice(0));

			canvasDraw.clear();

			itpr.rI = [];
			turtle.reset();
			var length = itpr.buffer.length;
			for (var i = 0; i < length; i++) itpr.execBuffer(false);
			canvasTurtle.clear();

			draw.turtle(canvasTurtle);

		});
		_.genBtnImg('slow', 'img/slow.png', function() {
			_.activeBtn(_.btn.slow, 1);
		});

		_.genBtnImg('normal', 'img/normal.png', function() {
			_.activeBtn(_.btn.normal, 6);
		});
		_.activeBtn(_.btn.normal, 6);

		_.genBtnImg('fast', 'img/fast.png', function() {
			_.activeBtn(_.btn.fast, 0);
		});


		document.body.appendChild(_.el);
	}

	_.genBtnImg = function(name, src, func) {
		_.btn[name] = document.createElement('img');
		_.btn[name].src = src;
		_.btn[name].style.marginTop = (_.height - 24)/2 + 'px';
		_.btn[name].onclick = func;
		_.btn[name].ondragstart = function(e) {
			e.preventDefault();
		};
		_.el.appendChild(_.btn[name]);
	};

	_.activeBtn = function(el, speed) {
		removeClassName('active', '#toolbar .active');
		el.classList.add('active');
		itpr.speed(speed);
	};
};