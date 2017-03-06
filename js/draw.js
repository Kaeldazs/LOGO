var draw = {

	grid: function(c) {
		var startPosY = c.cy % (grid.unit/5);
		var startPosX = c.cx % (grid.unit/5);
		var posX, posY;

		for (var y = 0; y <= c.h / grid.unit * 5; y++) {
			posY = startPosY + (grid.unit / 5 * y);
			c.ctx.beginPath();
			c.ctx.moveTo(0, posY);
			c.ctx.lineTo(c.w, posY);
			if ((posY - c.cy) % grid.unit == 0) {
				c.ctx.lineWidth = 2 * c.pxRatio;
				c.ctx.strokeStyle = 'rgba(0, 0, 0, 0.16)';
			}
			else {
				c.ctx.lineWidth = 1 * c.pxRatio;
				c.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
			}
			c.ctx.stroke();
		}

		for (var x = 0; x <= c.w / grid.unit * 5; x++) {
			posX = startPosX + (grid.unit / 5 * x);
			c.ctx.beginPath();
			c.ctx.moveTo(posX, 0);
			c.ctx.lineTo(posX, c.h);
			if ((posX - c.cx) % grid.unit == 0) {
				c.ctx.lineWidth = 2 * c.pxRatio;
				c.ctx.strokeStyle = 'rgba(0, 0, 0, 0.16)';
			}
			else {
				c.ctx.lineWidth = 1 * c.pxRatio;
				c.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
			}
			c.ctx.stroke();
		}
	},

	turtle: function(c) {
		// if turtle is visible
		if (turtle.visible) {
			// calculs des positions
			var turtlePos = turtle.getPos();

			// sauvegarde du contexte initial
			c.ctx.save();

			// positionnement du contexte en fonction de la position et de l'angle de la tortue
			c.ctx.translate(c.cx, c.cy);
			c.ctx.rotate(turtlePos[2] * Math.PI/180);
			var newPos = Math.rotate(0, 0, turtlePos[0], turtlePos[1], -turtlePos[2]);

			// dessin de la tortue
			c.ctx.fillStyle = 'rgb('+ turtle.getColorLine().join() +')';
			c.ctx.strokeStyle = "black";
			c.ctx.lineWidth = 3;
			c.ctx.lineJoin = "round";
			c.ctx.beginPath();
			c.ctx.moveTo(newPos.x, -Math.round(turtle.height/2) + newPos.y);
			c.ctx.lineTo(Math.round(turtle.width/2) + newPos.x, Math.round(turtle.height/2) + newPos.y);
			c.ctx.lineTo(-Math.round(turtle.width/2) + newPos.x, Math.round(turtle.height/2) + newPos.y);
			c.ctx.closePath();

			if (turtle.shadow) {
				c.ctx.shadowColor = 'rgba(0, 0, 0, '+ turtle.shadow +')';
			    c.ctx.shadowBlur = 20 * turtle.shadow;
			    c.ctx.shadowOffsetX = 10 * turtle.shadow;
			    c.ctx.shadowOffsetY = 10 * turtle.shadow;
			}

			if (turtle.opacity != 1) {
				c.ctx.globalAlpha = turtle.opacity;		
			}
			
			c.ctx.fill();
			c.ctx.shadowBlur = 0;
			c.ctx.shadowOffsetX = 0;
			c.ctx.shadowOffsetY = 0;
			c.ctx.stroke();

			// restoration du contexte initial
			c.ctx.restore();
		}
	},
	line: function(c, x1, y1, x2, y2) {

		// if pen is down
		if (turtle.draw) {
			// calculs des positions
			var turtlePos = turtle.getPos();

			// sauvegarde du contexte initial
			c.ctx.save();

			// positionnement du contexte en fonction de la position et de l'angle de la tortue
			c.ctx.translate(c.cx, c.cy);
			c.ctx.rotate(-turtlePos[2] * Math.PI/180);
			var newPos1 = Math.rotate(0, 0, x1, y1, turtlePos[2]);
			var newPos2 = Math.rotate(0, 0, x2, y2, turtlePos[2]);

			// dessin de la ligne
			c.ctx.strokeStyle = 'rgb('+ turtle.getColorLine().join() +')';
			c.ctx.lineWidth = 2 * c.pxRatio;
			c.ctx.beginPath();
			c.ctx.moveTo(newPos1.x, newPos1.y);
			c.ctx.lineTo(newPos2.x, newPos2.y);
			c.ctx.closePath();
			c.ctx.stroke();

			// restoration du contexte initial
			c.ctx.restore();
		}
	}
}