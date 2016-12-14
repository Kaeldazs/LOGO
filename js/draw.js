var draw = {
	turtle: function(x, y, a) {

		// calculs des positions
		var w         = Math.round((canvas.w + canvas.h) / 100),
			h         = Math.round((canvas.w + canvas.h) / 90),
			turtlePos = turtle.getPos();

		// sauvegarde du contexte initial
		canvas.ctx.save();
		// positionnement du contexte en fonction de la position et de l'angle de la tortue
		canvas.ctx.translate(canvas.cx - Math.round(w/2), canvas.cy - Math.round(h/2));
		canvas.ctx.rotate(turtlePos[2] * Math.PI/180);
		var newPos = Math.rotate(0, 0, turtlePos[0], turtlePos[1], -turtlePos[2]);

		// dessin de la tortue
		canvas.ctx.fillStyle = "black";
		canvas.ctx.beginPath();
		canvas.ctx.moveTo(newPos.x, -Math.round(h/2) + newPos.y);
		canvas.ctx.lineTo(Math.round(w/2) + newPos.x, Math.round(h/2) + newPos.y);
		canvas.ctx.lineTo(-Math.round(w/2) + newPos.x, Math.round(h/2) + newPos.y);
		canvas.ctx.closePath();
		canvas.ctx.fill();

		// restoration du contexte initial
		canvas.ctx.restore();
	}
}