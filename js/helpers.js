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

function removeClassName(className, selector) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
        if (els[i].classList.contains(className)) els[i].classList.remove(className);
    }
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
