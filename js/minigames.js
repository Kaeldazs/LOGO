mG = {
	current: false,

	trace: function() {
		_this = this;
		this.lose = false;
		this.win = false;
		this.name = 'trace';
		this.margin = 10;
		this.checkMargin = 10;
		mG.current = this;
		this.checkpoints = undefined;
		this.validPoints = [];
		this.arr = [[0,0],[0,-100],[34.47,-93.92],[0.27,0.05],[64.55,-76.55],[87.05,-49.74],[0.45,0.26],[98.93,-17.1],[98.93,17.9],[0.45,0.54],[87.05,50.54],[64.55,77.35],[0.27,0.75],[34.47,94.72],[0,100.8],[0,0.8],[-34.2,94.77],[-64.51,77.27],[-0.23,0.67],[-86.83,50.67],[-98.8,17.78],[-0.32,0.42],[-98.8,-16.94],[-86.83,-49.83],[-0.23,0.17],[-64.51,-76.43],[-34.2,-93.93],[0,0.04]];

		//this.arr = [[-199.26,-237.47],[-199.26,-37.47],[-199.26,-17.47],[-191.13,0.8],[-176.27,14.18],[-157.25,20.36],[-137.36,18.27],false,[-77.36,-74.73],[-57.36,-74.73],[-39.09,-66.6],[-25.71,-51.74],[-19.53,-32.72],[-21.62,-12.83],[-31.62,4.49],[-47.8,16.25],[-67.36,20.41],[-86.92,16.25],[-103.1,4.49],[-113.1,-12.83],[-115.19,-32.72],[-109.01,-51.74],[-95.63,-66.6],[-77.36,-74.73],[-57.36,-74.73],false,[42.64,-74.73],[62.64,-74.73],[80.91,-66.6],[94.29,-51.74],[100.47,-32.72],[98.38,-12.83],[88.38,4.49],[72.2,16.25],[52.64,20.41],[33.08,16.25],[16.9,4.49],[6.9,-12.83],[4.81,-32.72],[10.99,-51.74],[24.37,-66.6],[42.64,-74.73],[62.64,-74.73],false,[53.5,21.2],[72.82,26.38],[88.36,38.97],[97.44,56.79],[98.49,76.76],[91.32,95.43],[77.18,109.57],[58.51,116.74],[38.54,115.69],[20.72,106.61],[8.13,91.07],[21.25,75.98],[39.38,67.53],[59.38,67.18],[77.79,74.99],[91.43,89.62],false,[160.95,-74.24],[180.92,-75.29],[199.59,-68.12],[213.73,-53.98],[220.9,-35.31],[219.85,-15.34],[210.77,2.48],[195.23,15.07],[175.91,20.25],[156.16,17.12],[139.39,6.23],[128.5,-10.54],[125.37,-30.29],[130.55,-49.61],[143.14,-65.15],[160.96,-74.23],[180.93,-75.28]];

		//this.arr = [[0,0],[0,-100],[100,-100]];

		this.quit = function() {
			mG.current = false;
			itpr.clear(true);
		};

		this.reset = function() {
			_this.validPoints = [];
			_this.lose = false;
			_this.win = false;
			_this.draw();
		};

		this.dashTo = function(c, x, y, lx, ly, margin) {
			var dots = [];
			var dist = Math.distPoints(x, y, lx, ly);
			var angle = Math.getAngle(x, y, lx, ly);
			var nbPoints = Math.round(dist/margin);
			var segmentSize = dist/nbPoints;
			var pos;
			for (var i = 1; i <= nbPoints; i++) {
				pos = Math.translate(lx, ly, i * segmentSize, angle);
				dots[dots.length] = [Math.round(pos.x), Math.round(pos.y)];
			}
			return dots;
		};

		this.extremity = function(c, x, y, color) {
			canvasMG.ctx.beginPath();
			canvasMG.ctx.strokeStyle = color;
			canvasMG.ctx.fillStyle = 'rgba(0, 0, 180, 1)';
			canvasMG.ctx.lineWidth = 6;
	 		canvasMG.ctx.arc(x, y, _this.margin, 0, 2 * Math.PI, false);
	 		canvasMG.ctx.stroke();
			canvasMG.ctx.fill();
		};

		this.genCheckpoints = function() {
			var lastDots = [this.arr[0][0], this.arr[0][1]];
			this.checkpoints = [[this.arr[0][0], this.arr[0][1]]];
			for (var i = 1; i < this.arr.length; i++) {
				this.checkpoints = this.checkpoints.concat(
					_this.dashTo(canvasMG, this.arr[i][0], this.arr[i][1], lastDots[0], lastDots[1], this.checkMargin)
				);
				lastDots = [this.arr[i][0], this.arr[i][1]];
			}
		}

		this.checkMove = function(x, y, nx, ny) {
			var dash = this.dashTo(canvasMG, x, y, nx, ny, this.margin/3);
			var uncheckedDash = false;
			for (var d = 0; d < dash.length; d++) {
				var lose = true;
				for (var i = 0; i < this.checkpoints.length; i++) {
					if (dash[d][0] >= this.checkpoints[i][0] - this.margin &&
						dash[d][0] <= this.checkpoints[i][0] + this.margin && 
						dash[d][1] >= this.checkpoints[i][1] - this.margin &&
						dash[d][1] <= this.checkpoints[i][1] + this.margin) {
						if (!inArray(i, this.validPoints)) {
							this.validPoints.push(i);
						}
						lose = false;
					}
				}
				if (lose) {
					uncheckedDash = true;
				}
			}

			if (uncheckedDash) {
				this.lose = true;
				this.draw();
			}
			else if (this.validPoints.length == this.checkpoints.length) {
				this.win = true;
				this.draw();
			}
		}

		this.getColor = function() {
			if (this.lose) {
				return 'rgba(255, 100, 120, 1)';
			}
			else if (this.win) {
				return 'rgba(0, 200, 90, 1)';
			}
			return 'rgba(120, 120, 255, 1)';
		}

		this.closePath = function(color) {
			canvasMG.ctx.lineWidth = _this.margin * 2 + 6;
			canvasMG.ctx.strokeStyle = color;
			canvasMG.ctx.stroke();

			canvasMG.ctx.lineWidth = _this.margin * 2;
			canvasMG.ctx.strokeStyle = 'rgba(0, 0, 180, 1)';
			canvasMG.ctx.stroke();
		}

		this.drawCheckpoints = function(_this) {
			canvasMG.ctx.save();
			canvasMG.ctx.lineJoin = "round";
			canvasMG.ctx.translate(canvasMG.cx, canvasMG.cy);
        	for (var i = 0; i < _this.checkpoints.length; i++) {
			    canvasMG.ctx.beginPath();
			    canvasMG.ctx.arc(_this.checkpoints[i][0], _this.checkpoints[i][1], _this.margin, 0, 2 * Math.PI, false);
			    canvasMG.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
			    canvasMG.ctx.lineWidth = 1 * canvasMG.pxRatio;
			    canvasMG.ctx.stroke();
			}
			canvasMG.ctx.restore();
		}

		this.draw = function() {
			canvasMG.clear();
			var color = this.getColor();
			var lastDots = [this.arr[0][0], this.arr[0][1]];
			canvasMG.ctx.save();
			canvasMG.ctx.lineJoin = "round";
			canvasMG.ctx.translate(canvasMG.cx, canvasMG.cy);

			for (var i = 0; i < this.arr.length; i++) {
				if (i == 0 || i == this.arr.length - 1 || !this.arr[i+1]) {
					_this.extremity(canvasMG, this.arr[i][0], this.arr[i][1], color);
				}
			}

			canvasMG.ctx.beginPath();
			canvasMG.ctx.moveTo(this.arr[0][0], this.arr[0][1]);
			for (var i = 1; i < this.arr.length; i++) {
				if (!this.arr[i - 1]) {
					_this.extremity(canvasMG, this.arr[i][0], this.arr[i][1], color);
					canvasMG.ctx.beginPath();
				}
				if (this.arr[i] !== false) {
					canvasMG.ctx.lineTo(this.arr[i][0], this.arr[i][1]);
				}
				else {
					this.closePath(color);
					canvasMG.ctx.beginPath();
				}
			}

			this.closePath(color);

			canvasMG.ctx.restore();
		};

		itpr.clear(true, function() {
			canvasMG.el.style.opacity = 0;
			_this.genCheckpoints();
			_this.draw();
			Kaylee.animate(function(start, curr) {
				var percent = ((curr - start) / 300);
	            percent = Kaylee.easing['ease'](percent, 0, 1, 1);
	            canvasMG.el.style.opacity = percent;
	            if (curr - start > 300) {
	            	this.stop();
	            	canvasMG.el.style.opacity = '';

					//_this.drawCheckpoints(_this);
	            }
			});
		});
	}
}