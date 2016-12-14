var Canvas = function() {
    this.el      = undefined,
    this.ctx     = undefined,
    this.h       = undefined,
    this.w       = undefined,
    this.cx      = undefined,
    this.cy      = undefined,
    this.pxRatio = window.devicePixelRatio || 1;
    var _this    = this;

    // create a new canvas
    this.create  = function() {
        _this.el = document.createElement('canvas');

        // set sizes
        _this.h = window.innerHeight * _this.pxRatio;
        _this.w = window.innerWidth * _this.pxRatio;
        _this.el.style.width = window.innerWidth + 'px';
        _this.el.style.height = window.innerHeight + 'px';
        _this.el.width = _this.w;
        _this.el.height = _this.h;
        _this.cx =  Math.round(_this.w/2);
        _this.cy =  Math.round(_this.h/2);

        // append canvas on body
        document.body.appendChild(_this.el);

        // set context
        _this.ctx = _this.el.getContext("2d");
    };

    // clear the canvas
    this.clear = function () {
        _this.ctx.clearRect(0, 0, _this.w, _this.h);
    };
};