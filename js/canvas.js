var Canvas = function() {

    this.el      = undefined,
    this.ctx     = undefined,
    this.h       = undefined,
    this.w       = undefined,
    this.pxRatio = window.devicePixelRatio || 1;
    var _this    = this;

    this.create  = function() {
        _this.el = document.createElement('canvas');

        _this.h = window.innerHeight * _this.pxRatio;
        _this.w = window.innerWidth * _this.pxRatio;

        _this.el.style.width = window.innerWidth + 'px';
        _this.el.style.height = window.innerHeight + 'px';
        _this.el.width = _this.w;
        _this.el.height = _this.h;

        document.body.appendChild(_this.el);
        _this.ctx = _this.el.getContext("2d");
    };

    this.clear = function () {
        _this.ctx.clearRect(0, 0, _this.w, _this.h);
    };
};