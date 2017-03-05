mG = {
	current: false,

	trace: function() {
		_this = this;
		this.lose = false;
		this.win = false;
		this.name = 'trace';
		this.margin = 5;
		this.checkMargin = 5;
		mG.current = this;
		this.checkpoints = undefined;
		this.validPoints = [];
		this.arr = [
			[0, 0],
			[0, -150],
			[100, -150]
		];

		this.quit = function() {
			mG.current = false;
			itpr.clear(true);
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
			var lose = true;
			for (var d = 0; d < dash.length; d++) {
				for (var i = 0; i < this.checkpoints.length; i++) {
					if (dash[d][0] >= this.checkpoints[i][0] - this.margin &&
						dash[d][0] <= this.checkpoints[i][0] + this.margin && 
						dash[d][1] >= this.checkpoints[i][1] - this.margin &&
						dash[d][1] <= this.checkpoints[i][1] + this.margin) {
						if (!inArray(i, this.validPoints)) {
							this.validPoints.push(i);
							lose = false;
						}
					}
				}
				if (lose) break;
			}

			if (lose) {
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
				return 'rgba(255, 120, 120, 1)';
			}
			else if (this.win) {
				return 'rgba(20, 220, 20, 1)'
			}
			return 'rgba(120, 120, 255, 1)';
		}

		this.draw = function() {
			canvasMG.clear();
			var color = this.getColor();
			var lastDots = [this.arr[0][0], this.arr[0][1]];
			canvasMG.ctx.save();
			canvasMG.ctx.lineJoin = "round";
			canvasMG.ctx.translate(canvasMG.cx - Math.round(turtle.width/2), canvasMG.cy - Math.round(turtle.height/2));


			_this.extremity(canvasMG, this.arr[0][0], this.arr[0][1], color);
			_this.extremity(canvasMG, this.arr[this.arr.length - 1][0], this.arr[this.arr.length - 1][1], color);


			canvasMG.ctx.beginPath();
			canvasMG.ctx.moveTo(this.arr[0][0], this.arr[0][1]);
			for (var i = 1; i < this.arr.length; i++) {
				canvasMG.ctx.lineTo(this.arr[i][0], this.arr[i][1]);
			}

			canvasMG.ctx.lineWidth = _this.margin * 2 + 6;
			canvasMG.ctx.strokeStyle = color;
			canvasMG.ctx.stroke();

			canvasMG.ctx.lineWidth = _this.margin * 2;
			canvasMG.ctx.strokeStyle = 'rgba(0, 0, 180, 1)';
			canvasMG.ctx.stroke();

			for (var i = 0; i < this.checkpoints.length; i++) {
			    canvasMG.ctx.beginPath();
			    canvasMG.ctx.arc(this.checkpoints[i][0], this.checkpoints[i][1], _this.margin, 0, 2 * Math.PI, false);
			    canvasMG.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
			    canvasMG.ctx.lineWidth = 1 * canvasMG.pxRatio;
			    canvasMG.ctx.stroke();
			}

			canvasMG.ctx.restore();
		};

		itpr.clear(true, function() {
			_this.genCheckpoints();
			_this.draw();
		});
	}
}