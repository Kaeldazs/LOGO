Math.rotate = function(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * -angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {
        'x': nx,
        'y': ny
    };
};

function trimWhiteSpace(str) {
	while (str[0] == ' ') {
		str = str.replace(/^ /,'');
	}
	while (str.match(/  /img)) {
		str = str.replace(/  /img, ' ');
	}
	return str;
}