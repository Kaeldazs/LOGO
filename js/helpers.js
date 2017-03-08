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

// angle entre deux points
Math.getAngle = function(x1, y1, x2, y2) {
    var angle = (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI) - 90;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
};

// position d'un point après translation
Math.translate = function(x, y, distance, angle) {
    angle = Math.PI * (angle - 90) / 180.0;
    return {
        x: x + distance * Math.cos(angle),
        y: y + distance * Math.sin(angle)
    };
};

// distance entre deux points
Math.distPoints = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
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

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
        if(haystack[i] === needle) return true;
    }
    return false;
}

inc = {
    id: 0,
    next: function() {
        return this.id++;
    }
}

File = function() {
    _ = this;

    this.data = undefined;

    // ouverture d'un fichier
    this.open = function(callback) {
        // génération de l'input
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = "text/plain";
        input.style.opacity = 0;
        input.style.filter='alpha(opacity=0)';
        input.style.position = 'absolute';
        input.onchange = function(e) {
            _.read(e, callback);
        };
        input.click();
    };

    //lecture d'un fichier
    this.read = function(e, callback) {
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) { 
                _.data = e.target.result;
                if (callback) {
                    callback(_.data);
                }
            }
            reader.readAsText(e.target.files[0]);
        }
    }
}