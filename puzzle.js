var columns = 10;
var rows = 30;
var img1 = new Image();
img1.src = "gothic_girls026.jpg";
img1.onload = function () {
    var p = new Array();

    function Piece(x, y, width, height, sx, sy) {
        var w = width,
            h = height;
        //width = Math.sqrt((width*width)+(height*height));
        //height = width;
        sx -= width / 2.0;
        sy -= height / 2.0;
        sx *= -1;
        sy *= -1;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("puzzle");

        this.canvas.rotation = 0;
        this.canvas.style.top = y + "px";
        this.canvas.style.left = x + "px";
        this.can = this.canvas;
        this.can.width = w * 2;
        this.can.height = h * 2;
        document.body.appendChild(this.can);
        this.can.sx = sx;
        this.can.sy = sy;
        var ctx = this.can.getContext('2d');
        
        //ctx.save();
        //ctx.scale(h/(w+h),w/(w+h));
        ctx.lineWidth = 1;
        ctx.beginPath();
        //  ctx.translate(this.width/2.0,this.height/2.0);
        //ctx.translate(-this.width/2.0,-this.height/2.0);
        var imagex = width / 2.0;
        var imagey = height / 2.0;
        ctx.moveTo((this.can.width / 2.0) - imagex, (this.can.height / 2.0) - imagey);
        this.canvas.topside = tenpointbezier(ctx, (this.can.width / 2.0) - imagex, (this.can.height / 2.0) - imagey, imagex + (this.can.width / 2.0), (this.can.height / 2.0) - imagey);
        //ctx.lineTo((this.can.width/2.0),(this.can.height/2.0));
        this.canvas.topside.push((this.can.width / 2.0), (this.can.height / 2.0));

        this.canvas.rightside = tenpointbezier(ctx, imagex + (this.can.width / 2.0), (this.can.height / 2.0) - imagey, imagex + (this.can.width / 2.0), imagey + (this.can.height / 2.0));
        //ctx.lineTo((this.can.width/2.0),(this.can.height/2.0));
        this.canvas.rightside.push((this.can.width / 2.0), (this.can.height / 2.0));

        this.canvas.bottomside = tenpointbezier(ctx, (this.can.width / 2.0) + imagex, imagey + (this.can.height / 2.0), (this.can.width / 2.0) - imagex, imagey + (this.can.height / 2.0));
        //ctx.lineTo((this.can.width/2.0),(this.can.height/2.0));
        this.canvas.bottomside.push((this.can.width / 2.0), (this.can.height / 2.0));

        this.canvas.leftside = tenpointbezier(ctx, (this.can.width / 2.0) - imagex, (this.can.height / 2.0) + imagey, (this.can.width / 2.0) - imagex, (this.can.height / 2.0) - imagey);
        //ctx.lineTo((this.can.width/2.0),(this.can.height/2.0));
        this.canvas.leftside.push((this.can.width / 2.0), (this.can.height / 2.0));
this.can.setAttribute("puzzle", "true");
                        this.can.setAttribute("class", "drag");
                        this.can.setAttribute("draggable", "true");
        this.can.setAttribute("imagetopoffset", height/2.0);
        this.can.setAttribute("imageleftoffset", width/2.0);
this.can.setAttribute("topofimage", this.can.topside[1] + (this.can.offsetTop)); //-(p[i].height/2.0);
                this.can.setAttribute("heightofimage", height);
                this.can.setAttribute("leftofimage",  this.can.topside[0] + (this.can.offsetLeft)); //-(p[i].width/2.0);
                this.can.setAttribute("widthofimage", width);
        ctx.clip();
        ctx.drawImage(img1, this.canvas.sx, this.canvas.sy);
        //ctx.scale((w+h)/h,(w+h)/w);
        ctx.lineWidth = 3;
ctx.stroke();
        //ctx.stroke();
        //ctx.rect(25,25,225,225);
        ctx.closePath();
        //ctx.clip();
        this.can.ondblclick = function (e) {
            var cursorX = e.pageX;
            var cursorY = e.pageY;
            for (var i = 0; i < p.length; i++) {
                //console.log(p[i].canvas.topside[1] + "   " + p[i].can.offsetTop);
                var ymin = p[i].canvas.topside[1] + (p[i].can.offsetTop); //-(p[i].height/2.0);
                var ymax = p[i].canvas.bottomside[1] + (p[i].can.offsetTop);
                var xmin = p[i].canvas.topside[0] + (p[i].can.offsetLeft); //-(p[i].width/2.0);
                var xmax = p[i].canvas.bottomside[0] + (p[i].can.offsetLeft);
                //console.log(p[i].canvas.topside+"   "+p[i].canvas.rightside+"    "+p[i].canvas.bottomside+"    "+p[i].canvas.leftside);
                //console.log(ymin+" > "+cursorY+" > "+ymax+"  ,  "+xmin+" > "+cursorX+" > "+xmax);
                if (ymin <= cursorY && ymax >= cursorY && xmin < cursorX && xmax >= cursorX) {
                    var item = p[i];
                    //
                    p[i].canvas.width = p[i].canvas.width;
                    var ctx = p[i].canvas.getContext('2d');


                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    // ctx.clearRect(0,0,ctx.width,ctx.height);
                    //ctx.translate(-this.width/2.0,-this.height/2.0);

                    ctx.translate(p[i].canvas.width / 2.0, p[i].canvas.height / 2.0);
                    p[i].canvas.rotation += 90 * Math.PI / 180;
                    //this.rotation = this.rotation%360
                    ctx.rotate(p[i].canvas.rotation);
                    //ctx.translate(this.width/2.0,this.height/2.0);
                    //ctx.scale(h/(w+h),w/(w+h));
                    ctx.translate(-p[i].canvas.width / 2.0, -p[i].canvas.height / 2.0);
                    ctx.beginPath();
                    ctx.moveTo(p[i].canvas.topside[0], p[i].canvas.topside[1]);
                    tenpointbezierbypoints(ctx, p[i].canvas.topside);
                    //ctx.lineTo(this.rightside[0],this.rightside[1])
                    tenpointbezierbypoints(ctx, p[i].canvas.rightside);
                    //ctx.lineTo(this.bottomside[0],this.bottomside[1]);
                    tenpointbezierbypoints(ctx, p[i].canvas.bottomside);
                    //ctx.lineTo(this.leftside[0],this.leftside[1]);
                    tenpointbezierbypoints(ctx, p[i].canvas.leftside);
                    //ctx.lineTo(this.topside[0],this.topside[1]);
                    ctx.closePath();
                    //ctx.clip();
                    //ctx.fillStyle="#FF0000";
                    ctx.clip();
                    //ctx.scale((w+h)/h,(w+h)/w);
                    ctx.drawImage(img1, p[i].canvas.sx, p[i].canvas.sy);
                    
                    p.splice(i, 1);
                    p.push(item);
                    return true;
                }
            }
        };
        return this;
    };



    function tenpointbezierbypoints(ctx, pts) {
        //ctx.moveTo(pts[0],pts[1]);
        ctx.bezierCurveTo(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7]);
        ctx.bezierCurveTo(pts[8], pts[9], pts[10], pts[11], pts[12], pts[13]);
        ctx.bezierCurveTo(pts[14], pts[15], pts[16], pts[17], pts[18], pts[19]);

    }

    function tenpointbezier(ctx, x1, y1, x2, y2) {

        var delta = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2))) / 3.0;
        var deltax = (x1 - x2) / ((x1 - x2) + (y1 - y2));
        var deltay = (y1 - y2) / ((x1 - x2) + (y1 - y2));
        var seg1 = (Math.round(Math.random()) * 2) - 1;
        var sharpx = [((x1 + x2) / 2.0) + (Math.random() * deltax * delta / 3.0), ((x1 + x2) / 2.0) - ((Math.random() * deltax * delta / 3.0))];
        var sharpy = [((y1 + y2) / 2.0) + (Math.random() * deltay * delta / 3.0), ((y1 + y2) / 2.0) - ((Math.random() * deltay * delta / 3.0))];
        x3 = ((x1 + x2) / 2.0) + (seg1 * deltax * delta / 2.0) + (seg1 * deltay * delta / 2.0);
        y3 = ((y1 + y2) / 2.0) + (seg1 * deltay * delta / 2.0) + (seg1 * deltax * delta / 2.0);
        x4 = ((x1 + x2) / 2.0) - (seg1 * deltax * delta / 2.0) + (seg1 * deltay * delta / 2.0);
        y4 = ((y1 + y2) / 2.0) - (seg1 * deltay * delta / 2.0) + (seg1 * deltax * delta / 2.0);
        var points;
        //
        if (Math.abs(x4 - x1) <= Math.abs(x3 - x1) && Math.abs(y4 - y1) <= Math.abs(y3 - y1)) {
            points = [x1, y1, sharpx[0], sharpy[0], (sharpx[1] + x4) / 2.0, (sharpy[1] + y4) / 2.0, x4, y4, x4 + (seg1 * deltay * delta / 1.5), y4 + (seg1 * deltax * delta / 1.5), x3 + (seg1 * deltay * delta / 1.5), y3 + (seg1 * deltax * delta / 1.5), x3, y3, (sharpx[0] + x3) / 2.0, (sharpy[0] + y3) / 2.0, sharpx[1], sharpy[1], x2, y2];
            //ctx.moveTo(x1, y1);
            ctx.bezierCurveTo(sharpx[0], sharpy[0], (sharpx[1] + x4) / 2.0, (sharpy[1] + y4) / 2.0, x4, y4);
            ctx.bezierCurveTo(x4 + (seg1 * deltay * delta / 1.5), y4 + (seg1 * deltax * delta / 1.5), x3 + (seg1 * deltay * delta / 1.5), y3 + (seg1 * deltax * delta / 1.5), x3, y3);
            ctx.bezierCurveTo((sharpx[0] + x3) / 2.0, (sharpy[0] + y3) / 2.0, sharpx[1], sharpy[1], x2, y2);
        } else {
            points = [x1, y1, sharpx[1], sharpy[1], (sharpx[0] + x3) / 2.0, (sharpy[0] + y3) / 2.0, x3, y3, x3 + (seg1 * deltay * delta / 1.5), y3 + (seg1 * deltax * delta / 1.5), x4 + (seg1 * deltay * delta / 1.5), y4 + (seg1 * deltax * delta / 1.5), x4, y4, (sharpx[1] + x4) / 2.0, (sharpy[1] + y4) / 2.0, sharpx[0], sharpy[0], x2, y2];
            //ctx.moveTo(x1, y1);
            ctx.bezierCurveTo(sharpx[1], sharpy[1], (sharpx[0] + x3) / 2.0, (sharpy[0] + y3) / 2.0, x3, y3);
            ctx.bezierCurveTo(x3 + (seg1 * deltay * delta / 1.5), y3 + (seg1 * deltax * delta / 1.5), x4 + (seg1 * deltay * delta / 1.5), y4 + (seg1 * deltax * delta / 1.5), x4, y4);
            ctx.bezierCurveTo((sharpx[1] + x4) / 2.0, (sharpy[1] + y4) / 2.0, sharpx[0], sharpy[0], x2, y2);
        }
        return points;


    }

    var dx = img1.width / columns;
    rows = img1.height / dx;
    var dy = img1.height / rows;
    for (var cols = 0; cols < columns; cols++) {
        for (var row = 0; row < rows; row++) {


            p.push(new Piece(1000 * Math.random(), 1000 * Math.random(), dx, dy, dx * cols, dy * row));
        }
    }
    var _startX = 0; // mouse starting positions
    var _startY = 0;
    var _offsetX = 0; // current element offset
    var _offsetY = 0;
    var _dragElement; // needs to be passed from OnMouseDown to OnMouseMove
    var _oldZIndex = 0; // we temporarily increase the z-index during drag
    //var _debug = $('debug');    // makes life easier
    InitDragDrop();

    function touchMove(event) {
        event.preventDefault();
        //_offsetX + e.clientX - _startX) + 'px';
        // _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';(_offsetX + e.clientX
        _dragElement.style.left = _offsetX + event.targetTouches[0].clientX - _startX;
        _dragElement.style.top = _offsetY + event.targetTouches[0].clientY - _startY;
    }

    function InitDragDrop() {
        var el = document.body;
        document.ontouchstart = OnMouseDown;
        document.ontouchend = OnMouseUp;
        document.onmousedown = OnMouseDown;
        document.onmouseup = OnMouseUp;
    }

    function OnMouseDown(e) {
                     //       for (var j = 0; j < p.length; j++) {
                     //   p[j].can.style.zIndex = j;
                    //}
        // IE is retarded and doesn't pass the event object
        if (e == null) e = window.event;
        for (var i = 0; i < p.length; i++) {
            var target = p[i].can;
            target.style.zIndex = p.length-i;
            // IE uses srcElement, others use target
            //var target = e.target != null ? e.target : e.srcElement;

            //  _debug.innerHTML = target.className == 'drag' 
            //     ? 'draggable element clicked' 
            //     : 'NON-draggable element clicked';

            // for IE, left click == 1
            // for Firefox, left click == 0
            if ((e.button == 1 && window.event != null || e.button == 0) && target.className == 'drag') {
                // grab the mouse position
                _startX = e.clientX;
                _startY = e.clientY;
                console.log(e.clientX + " , " + e.clientY + "    " + e.pageX + ", " + e.pageY);
                // grab the clicked element's position
                _offsetX = ExtractNumber(target.style.left);
                _offsetY = ExtractNumber(target.style.top);

                // bring the clicked element to the front while it is being dragged
                var leftofimage = parseFloat(target.getAttribute("leftofimage"));
                var topofimage = parseFloat(target.getAttribute("topofimage"));
                var widthofimage = parseFloat(target.getAttribute("widthofimage"));
                var heightofimage = parseFloat(target.getAttribute("heightofimage"));
                _oldZIndex = target.style.zIndex;
                p.splice(i,1);
                target.style.zIndex = 10000;
                if ((e.pageX >= leftofimage) && (e.pageX <= leftofimage + widthofimage) && (e.pageY >= topofimage) && (e.pageY <= topofimage + heightofimage)) {


                    // we need to access the element in OnMouseMove
                    _dragElement = target;

                    // tell our code to start moving the element with the mouse
                    document.onmousemove = OnMouseMove;
                    document.ontouchmove = OnMouseMove;
                    // cancel out any text selections
                    document.body.focus();

                    // prevent text selection in IE
                    document.onselectstart = function () {
                        return false;
                    };
                    // prevent IE from trying to drag an image
                    target.ondragstart = function () {
                        return false;
                    };
                    // prevent text selection (except IE)
                    return false;
                }
            }
        }
    }

    function OnMouseMove(e) {
        e.preventDefault();
        if (e == null) var e = window.event;

        // this is the actual "    drag code "
        _dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
        _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';

        // _debug.innerHTML = '(' + _dragElement.style.left + ', ' + 
        //     _dragElement.style.top + ')';   
    }

    function OnMouseUp(e) {
        if (_dragElement != null) {
                    for (var j = 0; j < p.length; j++) {
                        p[j].can.style.zIndex = j;
                    }
                    p.push(_dragElement);
            _dragElement.style.zIndex = p.length-1;
            
            _dragElement.setAttribute("leftofimage", parseFloat(_dragElement.getAttribute("imageleftoffset")) + parseFloat(_dragElement.style.left));
            _dragElement.setAttribute("topofimage", parseFloat(_dragElement.getAttribute("imagetopoffset")) + parseFloat(_dragElement.style.top));
            // we're done with these events until the next OnMouseDown
            document.onmousemove = null;
            document.onselectstart = null;
            _dragElement.ondragstart = null;
            document.ontouchmove = null;
            // this is how we know we're not dragging      
            _dragElement = null;

            //_debug.innerHTML = 'mouse up';
        }
    }




    function ExtractNumber(value) {
        var n = parseInt(value);

        return n == null || isNaN(n) ? 0 : n;
    }

    // this is simply a shortcut for the eyes and fingers
    function $(id) {
        return document.getElementById(id);
    }
    //    p.push( new Piece(300,100,100,100,0,0));//,new Piece(100,200,100,100,100,0),new Piece(100,30,100,100,100,0));
};
