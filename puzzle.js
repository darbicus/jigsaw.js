function clone(obj) {
    if (null === obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.d = Math.sqrt(x * x + y * y);
    return this;
}
Point.prototype = {
    slopeTo: function (p) {
        return (this.y - p.y) / (this.x - p.x);
    },
    distanceTo: function (p) {
        return (Math.sqrt(((this.y - p.y) * (this.y - p.y)) + ((this.x - p.x) * (this.x - p.x))));
    },
    distanceByAxis: function (p) {
        return (new Point(this.x - p.x, this.y - p.y));
    },
    normalize: function () {
        return new Point(this.x / this.d, this.y / this.d);
    }
};
var puzzlePiece = (function () {
    function puzzlePiece(obj) {

        this.imgtop = clone(obj.top);

        this.imgright = clone(obj.right);
        this.imgbottom = clone(obj.bottom);
        this.imgleft = clone(obj.left);
        this.rotation = obj.rotation;
        this.image = obj.image;
        this.width = obj.width + 0;
        this.height = obj.height + 0;
        this.canvas = document.createElement("canvas");

        this.canvas.rotation = 0;
        this.connected = [];
        this.canvas.setAttribute("style", "position:absolute;");
        this.canvas.setAttribute("width", obj.width * 3);
        this.canvas.setAttribute("height", obj.height * 3);
        this.canvas.style.setProperty("top", this.imgtop.first.y + 1 + "px");
        this.canvas.style.setProperty("left", this.imgtop.first.x + 1 + "px");
        //this.canvas.ondblclick = dblclick;

        this.context = this.canvas.getContext('2d');


        document.body.appendChild(this.canvas);
        this.top = {
            "first": new Point((this.canvas.height / 2) - (obj.width / 2.0), (this.canvas.height / 2) - (obj.height / 2.0)),
                "last": new Point((this.canvas.height / 2) + (obj.width / 2.0), (this.canvas.height / 2) - (obj.height / 2.0))
        };

        this.right = {
            "first": new Point((this.canvas.height / 2) + (obj.width / 2.0), (this.canvas.height / 2) - (obj.height / 2.0)),
                "last": new Point((this.canvas.height / 2) + (obj.width / 2.0), (this.canvas.height / 2) + (obj.height / 2.0))
        };

        this.bottom = {
            "first": new Point((this.canvas.height / 2) + (obj.width / 2.0), (this.canvas.height / 2) + (obj.height / 2.0)),
                "last": new Point((this.canvas.height / 2) - (obj.width / 2.0), (this.canvas.height / 2) + (obj.height / 2.0))
        };

        this.left = {
            "first": new Point((this.canvas.height / 2) - (obj.width / 2.0), (this.canvas.height / 2) + (obj.height / 2.0)),
                "last": new Point((this.canvas.height / 2) - (obj.width / 2.0), (this.canvas.height / 2) - (obj.height / 2.0))
        };


        if ((obj.top.first.y <= 0)== false) {


            this.top.points = this.makeSide(this.top);
        } else {
            this.top.points = [];
            this.top.points.push(this.top.first);
            this.top.points.push(this.top.last);
        }
        if ((parseFloat(obj.right.first.x) > parseFloat(obj.imgwidth))) {            this.right.points = [];
            this.right.points.push(this.right.first);
            this.right.points.push(this.right.last);
            
        } else {
this.right.points = this.makeSide(this.right);
        }
        if ((parseFloat(obj.bottom.last.y) > parseFloat(obj.imgheight))) {

            this.bottom.points = [];
            this.bottom.points.push(this.bottom.first);
            this.bottom.points.push(this.bottom.last);
            
        } else {
            this.bottom.points = this.makeSide(this.bottom);
            
        }
        if ((obj.left.first.x <= 0)== false) {

            this.left.points = this.makeSide(this.left);
        } else {
            this.left.points = [];
            this.left.points.push(this.left.first);
            this.left.points.push(this.left.last);
        }
        this.display = function () {

            //this.context.save();
            //this.canvas.style.setProperty("border-style","solid");

            //this.context.translate((this.canvas.width/2.0)-(this.width/4.0)-this.top.first.x,(this.canvas.width/2.0)-(this.width/4.0)-this.top.first.y);

            this.context.beginPath();
            this.dBezierCurve(this.top.points);
            this.dBezierCurve(this.right.points);
            this.dBezierCurve(this.bottom.points);
            this.dBezierCurve(this.left.points);
            this.context.closePath();
            this.context.save();
            this.context.clip();
            this.context.drawImage(this.image, -this.imgtop.first.x, -this.imgtop.first.y);


            //context.fill();
            for (var i = 5; i > 1; i--) {
                this.context.strokeStyle = "RGBA(0,0,0,.15)";
                this.context.lineWidth = i;
                this.context.stroke();
            }
            //this.context.restore();

        };
    }

    return puzzlePiece;
})();

puzzlePiece.prototype = {
    rotate: function (around) {

        this.connected.forEach(function (element, index, a) {
            var temptop = parseFloat(around.canvas.style.top) - (parseFloat(around.canvas.style.left) - parseFloat(element.canvas.style.left));
            var templeft = parseFloat(around.canvas.style.left) + (parseFloat(around.canvas.style.top) - parseFloat(element.canvas.style.top));
            element.canvas.style.setProperty("top", temptop + "px");
            element.canvas.style.setProperty("left", templeft + "px");
            element.canvas.getContext('2d').restore();
            element.canvas.getContext('2d').clearRect(0, 0, element.canvas.width, element.canvas.height);
            element.context.translate(element.canvas.width / 2.0, element.canvas.height / 2.0);
            element.canvas.getContext('2d').rotate(Math.PI / 2.0);
            element.rotation += 1;
            element.rotation %= 4;
            element.context.translate(-(element.canvas.width / 2.0), -(element.canvas.height / 2.0));
            element.display();
            var origtop = element.piecetop;
            var origright = element.pieceright;
            var origbottom = element.piecebottom;
            var origleft = element.pieceleft;
            element.piecetop = null;
            element.pieceright = null;
            element.piecebottom = null;
            element.pieceleft = null;
            element.piecetop = origleft;
            element.pieceright = origtop;
            element.piecebottom = origright;
            element.pieceleft = origbottom;
        });

    },
    moveTo: function (x, y) {
        this.connected.forEach(function (element, index, a) {
            element.canvas.style.setProperty("left", parseFloat(element.canvas.style.left) + x + "px");
            element.canvas.style.setProperty("top", parseFloat(element.canvas.style.top) + y + "px");
        });
    },

    dBezierCurve: function () {
        var controlpoint = 3.5;
        var args = Array.prototype.slice.call(arguments);

        if (args[0].length > 1) {
            args = args[0];
        }
        if (args.length <= 2) {
            this.context.lineTo(args[0].x, args[0].y);
            this.context.lineTo(args[1].x, args[1].y);
            return;
        }
        var a = [];
        a.push(args[0]);
        for (var j = 0; j < args.length; j++) {
            a.push(args[j]);

        }
        a.push(args[args.length - 1]);
        args = a;

        for (var i = 2; i < args.length - 1; i++) {
            //these get the args before and after arg[i] it is so long because i am checking to make sure it actually exists if not it gets the remainder of it divided by the total args 
            var before = new Point(args[(i + (args.length - 1)) % args.length].x, args[(i + (args.length - 1)) % args.length].y);
            var after = new Point(args[(i + (args.length + 1)) % args.length].x, args[(i + (args.length + 1)) % args.length].y);
            var current = new Point(args[(i + (args.length)) % args.length].x, args[(i + (args.length)) % args.length].y);
            var before2 = new Point(args[(i + (args.length - 2)) % args.length].x, args[(i + (args.length - 2)) % args.length].y);


            //these are taking the difference of the points before and after divides it by controlpoint and adds or subtracts that from the middle point to get the bezier control points
            var mid1 = new Point(before.x - ((before2.x - current.x) / controlpoint), before.y - ((before2.y - current.y) / controlpoint));
            var mid2 = new Point(current.x + ((before.x - after.x) / controlpoint), current.y + ((before.y - after.y) / controlpoint));
            this.context.bezierCurveTo(mid1.x, mid1.y, mid2.x, mid2.y, current.x, current.y);

        }

    },
    makeSide: function (eobj) {
        var lp = [];
        var d = new Point(eobj.first.x - eobj.last.x, eobj.first.y - eobj.last.y),
            midpoint = new Point((eobj.first.x + eobj.last.x) / 2.0, (eobj.first.y + eobj.last.y) / 2.0),
            r = (Math.round(Math.random()) * 2.0) - 1,
            //r = 1,
            rd = new Point(d.x / 6.0 * (Math.random() * 0.5 + 0.7), d.y / 6.0 * (Math.random() * 0.5 + 0.7)),
            pt1 = new Point(midpoint.x + rd.x + (rd.y / 2.0 * Math.random()), midpoint.y + rd.y + (rd.x / 2.0 * Math.random())),
            pt2 = new Point(midpoint.x - rd.x + (rd.y / 2.0 * Math.random()), midpoint.y - rd.y + (rd.x / 2.0 * Math.random()));
        lp.push(new Point(eobj.first.x, eobj.first.y));
        lp.push(pt1);
        //lp.push(new Point((obj.first.x+midpoint.x + rd.x + (rd.y * r))/2.0,(obj.first.y+ midpoint.y + rd.y + (rd.x * r))/2.0));
        lp.push(new Point(pt1.x + (rd.y * r), pt1.y + (rd.x * r)));
        lp.push(new Point(pt2.x + (rd.y * r), pt2.y + (rd.x * r)));
        lp.push(pt2);
        //lp.push(new Point((lp[lp.length - 1].x+obj.last.x)/2.0,(lp[lp.length - 1].y+obj.last.y)/2.0));
        lp.push(new Point(eobj.last.x, eobj.last.y));
        return lp.splice(0);
    }
};
var p = [];
var square = 75;
var cols = Math.floor(document.getElementById("image").width / square);
var rows = Math.floor(document.getElementById("image").height / square);
var count = 0;
for (var l = 0; l < rows; l++) {
    for (var k = 0; k < cols; k++) {

        p.push(new puzzlePiece({
            "rotation": 0,
                "imgwidth": document.getElementById("image").width,
                "imgheight": document.getElementById("image").height,
                "width": square,
                "height": square,
                "image": document.getElementById("image"),
                "imagepoint": new Point(k * square, l * square),
                "top": {
                "first": new Point(k * square, l * square),
                    "last": new Point(k * square + square, l * square)
            },
                "right": {
                "first": new Point(k * square + square, l * square),
                    "last": new Point(k * square + square, l * square + square)
            },
                "bottom": {
                "first": new Point(k * square + square, l * square + square),
                    "last": new Point(k * square, l * square + square)
            },
                "left": {
                "first": new Point(k * square, l * square + square),
                    "last": new Point(k * square, l * square)
            }
        }));
        p[p.length-1].canvas.style.setProperty("top", document.getElementById("image").height*Math.random*2.0 + "px");
        p[p.length-1].canvas.style.setProperty("left", document.getElementById("image").width*Math.random()*2.0 + "px");
        for (var rotation = Math.floor(Math.random()*4.0);rotation<=4;rotation++){
            p[p.length-1].rotate(p[p.length-1]);
        }
        if (k !== 0) {
            var temp = p[p.length - 2].right.points;
            p[p.length - 2].pieceright = p[p.length - 1];
            p[p.length - 1].pieceleft = p[p.length - 2];
            p[p.length - 1].left.points = [];
            for (var i = 0; i < temp.length; i++) {
                p[p.length - 1].left.points.push(new Point(temp[i].x - p[p.length - 1].width, temp[i].y));
            }
            p[p.length - 1].left.points.reverse();
        }
        if (l !== 0) {
            var temp2 = p[count - cols].bottom.points;
            p[count - cols].piecebottom = p[p.length - 1];
            p[p.length - 1].piecetop = p[count - cols];
            p[count].top.points = [];
            for (var i = 0; i < temp2.length; i++) {
                p[count].top.points.push(new Point(temp2[i].x, temp2[i].y - p[count].height));
            }
            p[count].top.points.reverse();
        }
        count++;
    }

}

///var canvas = document.getElementById('can');
//var context = canvas.getContext('2d');
//var temp = p[0].right.points;
//p[1].left.points = [];
//for (var i = 0; i < temp.length; i++) {
//    p[1].left.points.push(temp[i]);
//}
//p[1].left.points.reverse();
for (var i = 0; i < p.length; i++) {
    p[i].canvas.style.zIndex = i;
    p[i].display();
    p[i].connected.push(p[i]);
}

function mousedown(event) {
    for (var j = 0; j < p.length; j++) {
        p[j].canvas.style.zIndex = p.length - j;
        //p[j].display();
    }
    for (var i = 0; i < p.length; i++) {
        var that = p[i].canvas;

        if (that.getContext('2d').isPointInPath(event.pageX - parseInt(that.style.getPropertyValue("left"), 10), event.pageY - parseInt(that.style.getPropertyValue("top"), 10))) {
            document.selectedpiece = p[i];
            that = p.splice(i, 1)[0];
            p.unshift(that);


            that = that.canvas;
            that.style.zIndex = p.length + 1;
            that.mouse = new Point(event.pageX, event.pageY);
            document.selected = that;
            document.onmousemove = mousemove;
            document.onmouseup = mouseup;

            return;
        }
    }
}
document.onmousedown = mousedown;

function dblclick(event) {
    //alert("works");
    for (var i = 0; i < p.length; i++) {
        var that = p[i];
        if (that.canvas.getContext('2d').isPointInPath(event.pageX - parseInt(that.canvas.style.getPropertyValue("left"), 10), event.pageY - parseInt(that.canvas.style.getPropertyValue("top"), 10))) {

            that.rotate(that);
            return;

        }
    }
}

function mousemove(evt) {
    document.selectedpiece.moveTo(evt.pageX - document.selected.mouse.x, evt.pageY - document.selected.mouse.y);


    document.selected.mouse = new Point(evt.pageX, evt.pageY);

}

function mouseup(evt) {
    //alert('hello');
    document.selectedpiece.moveTo(evt.pageX - document.selected.mouse.x, evt.pageY - document.selected.mouse.y);
    document.selectedpiece.connected.forEach(function (element, index, array) {
        checkForMatches(element)
    });
    document.selectedpiece = null;
    document.onmouseup = '';
    document.onmousemove = '';
    document.selected.mouse = '';
    document.selected = null;
}
document.ondblclick = dblclick;

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.myUnique = function () {
    var r = new Array();
    o: for (var i = 0; i < this.length; i++) {
        for (var x = 0; x < r.length; x++) {
            if (r[x] === this[i]) {
                continue o;
            }
        }
        r[r.length] = this[i];
    }
    return r;
};

function checkForMatches(e) {
    var top = parseFloat(e.canvas.style.top);
    var left = parseFloat(e.canvas.style.left);
    var accuracy = 5.0;
    var topmatchmin = top - e.height / accuracy;
    var topmatchmax = top + e.height / accuracy;
    var leftmatchmin = left - e.width / accuracy;
    var leftmatchmax = left + e.width / accuracy;

    if (typeof e.piecetop !== 'undefined') {
        var toptop = parseFloat(e.piecetop.canvas.style.top);
        var topleft = parseFloat(e.piecetop.canvas.style.left);
        if (toptop + e.height > topmatchmin && toptop + e.height < topmatchmax && topleft > leftmatchmin && topleft < leftmatchmax && e.rotation == e.piecetop.rotation) {
            e.piecetop.moveTo(left - topleft, top - (toptop + e.height));
            var c = (e.connected.concat(e.piecetop.connected)).myUnique();
            c.forEach(function (element, index, array) {
                element.connected = array;
            });
            //e.connected=c;
            //e.piecetop.connected=e.connected;
        }
    }
    if (typeof e.pieceright !== 'undefined') {
        var righttop = parseFloat(e.pieceright.canvas.style.top);
        var rightleft = parseFloat(e.pieceright.canvas.style.left);
        if (righttop > topmatchmin && righttop < topmatchmax && rightleft - e.width > leftmatchmin && rightleft - e.width < leftmatchmax && e.rotation == e.pieceright.rotation) {
            e.pieceright.moveTo(left - (rightleft - e.width), top - righttop);
            var d = (e.connected.concat(e.pieceright.connected)).myUnique();
            d.forEach(function (element, index, array) {
                element.connected = array;
            });

            //e.connected = d;
            //e.pieceright.connected=e.connected;
        }
    }
    if (typeof e.pieceleft !== 'undefined') {
        var lefttop = parseFloat(e.pieceleft.canvas.style.top);
        var leftleft = parseFloat(e.pieceleft.canvas.style.left);
        if (lefttop > topmatchmin && lefttop < topmatchmax && leftleft + e.width > leftmatchmin && leftleft + e.width < leftmatchmax && e.rotation == e.pieceleft.rotation) {
            e.pieceleft.moveTo(left - (leftleft + e.width), top - lefttop);
            var f = (e.connected.concat(e.pieceleft.connected)).myUnique();
            f.forEach(function (element, index, array) {
                element.connected = array;
            });
            //e.connected=f;
            //e.pieceleft.connected=e.connected;

        }
    }
    if (typeof e.piecebottom !== 'undefined') {
        var bottomtop = parseFloat(e.piecebottom.canvas.style.top);
        var bottomleft = parseFloat(e.piecebottom.canvas.style.left);
        if (bottomtop - e.height > topmatchmin && bottomtop - e.height < topmatchmax && bottomleft > leftmatchmin && bottomleft < leftmatchmax && e.rotation == e.piecebottom.rotation) {
            e.piecebottom.moveTo(left - bottomleft, top - (bottomtop - e.height));
            var g = (e.connected.concat(e.piecebottom.connected)).myUnique();
            g.forEach(function (element, index, array) {
                element.connected = array;
            });
            //e.connected=g;
            //e.piecebottom.connected=e.connected;

        }
    }

}
