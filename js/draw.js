var draw = {
	turtle: function(c) {
		// if turtle is visible
		if (turtle.visible) {
			// calculs des positions
			var turtlePos = turtle.getPos();

			// sauvegarde du contexte initial
			c.ctx.save();

			// positionnement du contexte en fonction de la position et de l'angle de la tortue
			c.ctx.translate(c.cx - Math.round(turtle.width/2), c.cy - Math.round(turtle.height/2));
			c.ctx.rotate(turtlePos[2] * Math.PI/180);
			var newPos = Math.rotate(0, 0, turtlePos[0], turtlePos[1], -turtlePos[2]);

			// dessin de la tortue
			c.ctx.fillStyle = turtle.colorLine;
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
			c.ctx.translate(c.cx - Math.round(turtle.width/2), c.cy - Math.round(turtle.height/2));
			c.ctx.rotate(-turtlePos[2] * Math.PI/180);
			var newPos1 = Math.rotate(0, 0, x1, y1, turtlePos[2]);
			var newPos2 = Math.rotate(0, 0, x2, y2, turtlePos[2]);

			// dessin de la ligne
			c.ctx.strokeStyle = turtle.colorLine;
			c.ctx.lineWidth = 2;
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