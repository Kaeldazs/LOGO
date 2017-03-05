miniGames = {
	trace: function() {
		_this = this;
		this.margin = 25;
		this.checkMargin = 15;

		this.arr = [
			[0, 0],
			[0, -150],
			[100, -150],
			[150, 0],
			[100, 100],
			[0, 64],
			[0, 120],
			[150, 176],
			[150, 220],
			[-100, 220],
			[-100, -150]
		];

		this.lineTo = function(c, x, y, lx, ly) {
			var dots = [];
			c.ctx.lineTo(x, y);
			var dist = Math.distPoints(x, y, lx, ly);
			var angle = Math.getAngle(x, y, lx, ly);
			var nbPoints = Math.round(dist/_this.checkMargin);
			var segmentSize = dist/nbPoints;
			var pos;
			for (var i = 1; i <= nbPoints; i++) {
				pos = Math.translate(lx, ly, i * segmentSize, angle);
				dots[dots.length] = [Math.round(pos.x), Math.round(pos.y)];
			}
			return dots;
		};

		this.extremity = function(c, x, y) {
			c.ctx.beginPath();
			c.ctx.strokeStyle = 'rgba(120, 120, 255, 1)';
			c.ctx.fillStyle = 'rgba(0, 0, 180, 1)';
			c.ctx.lineWidth = 6;
	 		c.ctx.arc(x, y, _this.margin, 0, 2 * Math.PI, false);
	 		c.ctx.stroke();
			c.ctx.fill();
		};

		this.draw = function(c, arr) {
			var lastDots = [arr[0][0], arr[0][1]];
			var checkpoints = [[arr[0][0], arr[0][1]]];
			c.ctx.save();
			c.ctx.lineJoin = "round";
			c.ctx.translate(c.cx - Math.round(turtle.width/2), c.cy - Math.round(turtle.height/2));


			_this.extremity(c, arr[0][0], arr[0][1]);
			_this.extremity(c, arr[arr.length - 1][0], arr[arr.length - 1][1]);


			c.ctx.beginPath();
			c.ctx.moveTo(arr[0][0], arr[0][1]);
			for (var i = 1; i < arr.length; i++) {
				checkpoints = checkpoints.concat(
					_this.lineTo(c, arr[i][0], arr[i][1], lastDots[0], lastDots[1])
				);
				lastDots = [arr[i][0], arr[i][1]];
			}

			c.ctx.lineWidth = _this.margin * 2 + 6;
			c.ctx.strokeStyle = 'rgba(120, 120, 255, 1)';
			c.ctx.stroke();

			c.ctx.lineWidth = _this.margin * 2;
			c.ctx.strokeStyle = 'rgba(0, 0, 180, 1)';
			c.ctx.stroke();

			for (var i = 0; i < checkpoints.length; i++) {
				c.ctx.beginPath();
			    c.ctx.arc(checkpoints[i][0], checkpoints[i][1], 5, 0, 2 * Math.PI, false);
			    c.ctx.fillStyle = 'rgba(120, 120, 255, 1)'; // rgba(0, 0, 120, 1)
			    c.ctx.fill();
			    c.ctx.beginPath();
			    c.ctx.arc(checkpoints[i][0], checkpoints[i][1], _this.margin, 0, 2 * Math.PI, false);
			    c.ctx.strokeStyle = 'rgba(120, 120, 255, 1)';
			    c.ctx.lineWidth = 1 * c.pxRatio;
			    c.ctx.stroke();
			}
			c.ctx.restore();
		};

		itpr.clear(true, function() {
			_this.draw(canvasDraw, _this.arr);
		});
	}
}