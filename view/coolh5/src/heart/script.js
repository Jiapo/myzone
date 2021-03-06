var canvas,
    ctx,
    boundx = Math.min(window.innerWidth,window.innerHeight),
    boundy = Math.min(window.innerWidth,window.innerHeight);

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

window.onload = function(){
    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');
    canvas.width = boundx;
    canvas.height = boundy;

    nCircles = 6;
    logs = [];

    for (var i = 0 ; i < 6; i ++){
         var nlog = new log();
        logs.push(nlog);
    }

    e = new ensemble(0.2);
    e.init(6);
    e.render();
    update();
};

function update(){
    e.update();
    e.render();
    requestAnimFrame(update);
}

var circle = function (parent,r) {
    this.parent = parent;
    this.r = r;
    this.x = this.parent.x;
    this.y = this.parent.y - this.parent.r + this.r;
    this.relativeAngle = 3/2*Math.PI;
};

circle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
};

circle.prototype.rollRight = function (angle) {
    this.relativeAngle += angle;
    this.x = this.parent.x + (this.parent.r - this.r) *Math.cos(this.relativeAngle);
    this.y = this.parent.y + (this.parent.r - this.r) *Math.sin(this.relativeAngle);
};

var ensemble = function (angle) {
    this.angle = angle*Math.PI/180;
    this.circles = []
};

ensemble.prototype.init = function(n) {
    var firstCircle = new circle({x:boundx/2,y:boundy/2,r:boundx/2},boundx/2);
    this.circles.push(firstCircle);
    for ( var i = 1; i < n; i++ ){
        var c = new circle(this.circles[i-1],this.circles[i-1].r/3);
        this.circles.push(c);
    }
};

ensemble.prototype.update = function () {
    var a = this.angle;
    var max = this.circles.length;
    this.circles.forEach(function (c,x) {
        c.rollRight(-((x%2*2)-1)*a*Math.pow(3,x));
        logs[x].vals.push({x:c.x,y:c.y});
    })
};

ensemble.prototype.render =function () {
    ctx.clearRect(0,0,boundx,boundy);
    this.circles.forEach(function(c){
        c.draw();
    });
    logs[2].draw("#e1cec6");
    logs[3].draw("#d3b0ab");
    logs[4].draw("#dcbeb4");
    logs[5].draw("#315998");
};

var log = function () {
    this.vals = [];
};

log.prototype.draw = function(color) {
    var max = this.vals.length-1;
    if (max < 0) return;
    ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.moveTo(this.vals[max].x,this.vals[max].y);
    for (var i = 1; i < 10000; i ++){
        if ((max-i) < 0) break;
        ctx.lineTo(this.vals[max-i].x,this.vals[max-i].y);
    }
    ctx.stroke();
    ctx.strokeStyle="#000000";
};