mG = {
	current: false,

	trace: function() {
		_this = this;
		this.lose = false;
		this.win = false;
		this.name = 'trace';
		this.margin = 10;
		this.checkMargin = 20;
		mG.current = this;
		this.checkpoints = undefined;
		this.validPoints = [];
		this.arr = [[0,0],[12.86,-15.32],[30.18,-25.32],[49.88,-28.79],[69.58,-25.32],[86.9,-15.32],[99.76,0],[106.6,18.79],[106.6,38.79],[99.76,57.58],[86.9,72.9],[69.58,82.9],[49.88,86.37],[30.18,82.9],[12.86,72.9],[0,57.58],[-6.84,38.79],[-6.84,18.79],[0,0],[17.32,-10],[37.02,-13.47],[56.72,-10],[74.04,0],[86.9,15.32],[93.74,34.11],[93.74,54.11],[86.9,72.9],[74.04,88.22],[56.72,98.22],[37.02,101.69],[17.32,98.22],[0,88.22],[-12.86,72.9],[-19.7,54.11],[-19.7,34.11],[-12.86,15.32],[0,0],[19.7,-3.47],[39.4,0],[56.72,10],[69.58,25.32],[76.42,44.11],[76.42,64.11],[69.58,82.9],[56.72,98.22],[39.4,108.22],[19.7,111.69],[0,108.22],[-17.32,98.22],[-30.18,82.9],[-37.02,64.11],[-37.02,44.11],[-30.18,25.32],[-17.32,10],[0,0],[19.7,3.47],[37.02,13.47],[49.88,28.79],[56.72,47.58],[56.72,67.58],[49.88,86.37],[37.02,101.69],[19.7,111.69],[0,115.16],[-19.7,111.69],[-37.02,101.69],[-49.88,86.37],[-56.72,67.58],[-56.72,47.58],[-49.88,28.79],[-37.02,13.47],[-19.7,3.47],[0,0],[17.32,10],[30.18,25.32],[37.02,44.11],[37.02,64.11],[30.18,82.9],[17.32,98.22],[0,108.22],[-19.7,111.69],[-39.4,108.22],[-56.72,98.22],[-69.58,82.9],[-76.42,64.11],[-76.42,44.11],[-69.58,25.32],[-56.72,10],[-39.4,0],[-19.7,-3.47],[0,0],[12.86,15.32],[19.7,34.11],[19.7,54.11],[12.86,72.9],[0,88.22],[-17.32,98.22],[-37.02,101.69],[-56.72,98.22],[-74.04,88.22],[-86.9,72.9],[-93.74,54.11],[-93.74,34.11],[-86.9,15.32],[-74.04,0],[-56.72,-10],[-37.02,-13.47],[-17.32,-10],[0,0],[6.84,18.79],[6.84,38.79],[0,57.58],[-12.86,72.9],[-30.18,82.9],[-49.88,86.37],[-69.58,82.9],[-86.9,72.9],[-99.76,57.58],[-106.6,38.79],[-106.6,18.79],[-99.76,0],[-86.9,-15.32],[-69.58,-25.32],[-49.88,-28.79],[-30.18,-25.32],[-12.86,-15.32],[0,0],[0,20],[-6.84,38.79],[-19.7,54.11],[-37.02,64.11],[-56.72,67.58],[-76.42,64.11],[-93.74,54.11],[-106.6,38.79],[-113.44,20],[-113.44,0],[-106.6,-18.79],[-93.74,-34.11],[-76.42,-44.11],[-56.72,-47.58],[-37.02,-44.11],[-19.7,-34.11],[-6.84,-18.79],[0,0],[-6.84,18.79],[-19.7,34.11],[-37.02,44.11],[-56.72,47.58],[-76.42,44.11],[-93.74,34.11],[-106.6,18.79],[-113.44,0],[-113.44,-20],[-106.6,-38.79],[-93.74,-54.11],[-76.42,-64.11],[-56.72,-67.58],[-37.02,-64.11],[-19.7,-54.11],[-6.84,-38.79],[0,-20],[0,0],[-12.86,15.32],[-30.18,25.32],[-49.88,28.79],[-69.58,25.32],[-86.9,15.32],[-99.76,0],[-106.6,-18.79],[-106.6,-38.79],[-99.76,-57.58],[-86.9,-72.9],[-69.58,-82.9],[-49.88,-86.37],[-30.18,-82.9],[-12.86,-72.9],[0,-57.58],[6.84,-38.79],[6.84,-18.79],[0,0],[-17.32,10],[-37.02,13.47],[-56.72,10],[-74.04,0],[-86.9,-15.32],[-93.74,-34.11],[-93.74,-54.11],[-86.9,-72.9],[-74.04,-88.22],[-56.72,-98.22],[-37.02,-101.69],[-17.32,-98.22],[0,-88.22],[12.86,-72.9],[19.7,-54.11],[19.7,-34.11],[12.86,-15.32],[0,0],[-19.7,3.47],[-39.4,0],[-56.72,-10],[-69.58,-25.32],[-76.42,-44.11],[-76.42,-64.11],[-69.58,-82.9],[-56.72,-98.22],[-39.4,-108.22],[-19.7,-111.69],[0,-108.22],[17.32,-98.22],[30.18,-82.9],[37.02,-64.11],[37.02,-44.11],[30.18,-25.32],[17.32,-10],[0,0],[-19.7,-3.47],[-37.02,-13.47],[-49.88,-28.79],[-56.72,-47.58],[-56.72,-67.58],[-49.88,-86.37],[-37.02,-101.69],[-19.7,-111.69],[0,-115.16],[19.7,-111.69],[37.02,-101.69],[49.88,-86.37],[56.72,-67.58],[56.72,-47.58],[49.88,-28.79],[37.02,-13.47],[19.7,-3.47],[0,0],[-17.32,-10],[-30.18,-25.32],[-37.02,-44.11],[-37.02,-64.11],[-30.18,-82.9],[-17.32,-98.22],[0,-108.22],[19.7,-111.69],[39.4,-108.22],[56.72,-98.22],[69.58,-82.9],[76.42,-64.11],[76.42,-44.11],[69.58,-25.32],[56.72,-10],[39.4,0],[19.7,3.47],[0,0],[-12.86,-15.32],[-19.7,-34.11],[-19.7,-54.11],[-12.86,-72.9],[0,-88.22],[17.32,-98.22],[37.02,-101.69],[56.72,-98.22],[74.04,-88.22],[86.9,-72.9],[93.74,-54.11],[93.74,-34.11],[86.9,-15.32],[74.04,0],[56.72,10],[37.02,13.47],[17.32,10],[0,0],[-6.84,-18.79],[-6.84,-38.79],[0,-57.58],[12.86,-72.9],[30.18,-82.9],[49.88,-86.37],[69.58,-82.9],[86.9,-72.9],[99.76,-57.58],[106.6,-38.79],[106.6,-18.79],[99.76,0],[86.9,15.32],[69.58,25.32],[49.88,28.79],[30.18,25.32],[12.86,15.32],[0,0],[0,-20],[6.84,-38.79],[19.7,-54.11],[37.02,-64.11],[56.72,-67.58],[76.42,-64.11],[93.74,-54.11],[106.6,-38.79],[113.44,-20],[113.44,0],[106.6,18.79],[93.74,34.11],[76.42,44.11],[56.72,47.58],[37.02,44.11],[19.7,34.11],[6.84,18.79],[0,0],[6.84,-18.79],[19.7,-34.11],[37.02,-44.11],[56.72,-47.58],[76.42,-44.11],[93.74,-34.11],[106.6,-18.79],[113.44,0],[113.44,20],[106.6,38.79],[93.74,54.11],[76.42,64.11],[56.72,67.58],[37.02,64.11],[19.7,54.11],[6.84,38.79],[0,20],[0,0]];

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
			    canvasMG.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
			    canvasMG.ctx.lineWidth = 1 * canvasMG.pxRatio;
			    canvasMG.ctx.stroke();
			}

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
	            }
			});
		});
	}
}