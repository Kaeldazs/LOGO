mG = {
	current: false,

	trace: function(data) {
		this.launch = function() {
			this.lose = false;
			this.win = false;
			this.name = 'trace';
			this.margin = this.data.margin ? this.data.margin : 10;
			this.checkMargin = this.data.checkMargin ? this.data.checkMargin : 10;
			mG.current = this;
			this.checkpoints = undefined;
			this.validPoints = [];

			this.arr = this.data.arr;

			//this.arr = [[0,0],[0,-100],[34.47,-93.92],[0.27,0.05],[64.55,-76.55],[87.05,-49.74],[0.45,0.26],[98.93,-17.1],[98.93,17.9],[0.45,0.54],[87.05,50.54],[64.55,77.35],[0.27,0.75],[34.47,94.72],[0,100.8],[0,0.8],[-34.2,94.77],[-64.51,77.27],[-0.23,0.67],[-86.83,50.67],[-98.8,17.78],[-0.32,0.42],[-98.8,-16.94],[-86.83,-49.83],[-0.23,0.17],[-64.51,-76.43],[-34.2,-93.93],[0,0.04]];

			//this.arr = [[0,0],[0,-100],[0,0],[17.36,-98.48],[0,0],[34.2,-93.97],[0,0],[50,-86.6],[0,0],[64.28,-76.6],[0,0],[76.6,-64.28],[0,0],[86.6,-50],[0,0],[93.97,-34.2],[0,0],[98.48,-17.36],[0,0],[100,0],[0,0],[98.48,17.36],[0,0],[93.97,34.2],[0,0],[86.6,50],[0,0],[76.6,64.28],[0,0],[64.28,76.6],[0,0],[50,86.6],[0,0],[34.2,93.97],[0,0],[17.36,98.48],[0,0],[0,100],[0,0],[-17.36,98.48],[0,0],[-34.2,93.97],[0,0],[-50,86.6],[0,0],[-64.28,76.6],[0,0],[-76.6,64.28],[0,0],[-86.6,50],[0,0],[-93.97,34.2],[0,0],[-98.48,17.36],[0,0],[-100,0],[0,0],[-98.48,-17.36],[0,0],[-93.97,-34.2],[0,0],[-86.6,-50],[0,0],[-76.6,-64.28],[0,0],[-64.28,-76.6],[0,0],[-50,-86.6],[0,0],[-34.2,-93.97],[0,0],[-17.36,-98.48],[0,0]];

			//this.arr = [[0,0],[0,-100],[100,-100]];

			this.quit = function() {
				mG.current = false;
				canvasMG.clear();
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
				canvasMG.ctx.lineWidth = 12;
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
				canvasMG.ctx.lineWidth = _this.margin * 2 + 12;
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
				toolbar.setInactive();
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

		_this = this;
		this.data = data;

		if (!this.data || !this.data.arr) {
			var file = new File();
			file.open(function(data) {
				_this.data = JSON.parse(data);
				if (_this.data && _this.data.arr) {
					_this.launch();
				}
			});
		}
		else {
			this.launch();
		}
	}
}