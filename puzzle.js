var pieces = new Array();
var puzzle = (function () {
    var xmax = 5.0;
    var ymax = 5.0;
    var canvasarray = new Array();
    var imagesave = new Image();
    return {
        newImage: function (src) {
            imagesave = new Image();
            imagesave.src = src;
            imagesave.onload = function () {
                var wsize = imagesave.width / xmax;
                var hsize = imagesave.height / ymax;

                for (var j = 0; j < imagesave.height; j += hsize) {
                    for (var i = 0; i < imagesave.width; i += wsize) {
                        canvasarray.push(document.createElement("canvas"));
                        var c = canvasarray[canvasarray.length - 1];
                        var piecetoleft;
                        var pieceabove;
                        if (i !== 0) {
                            piecetoleft = canvasarray[canvasarray.length - 2];
                        }
                        if (j !== 0) {
                            pieceabove = canvasarray[canvasarray.length - 1 - xmax];
                        }
                        c.width = wsize * 2.0;
                        c.height = hsize * 2.0;
                        c.setAttribute("puzzle", "true");
                        c.setAttribute("class", "drag");
                        c.setAttribute("draggable", "true");
                        var xpos = i - (wsize / 2.0);
                        var ypos = j - (hsize / 2.0);
                        var width = (i + (wsize * 2.0) > imagesave.width) ? wsize * 1.5 : wsize * 2.0;
                        var height = (j + (hsize * 2.0) > imagesave.height) ? hsize * 1.5 : hsize * 2.0;

                        c.setAttribute("outright", (Math.round(Math.random()) === 1) ? "true" : "false");
                        c.setAttribute("outbottom", (Math.round(Math.random()) === 1) ? "true" : "false");
                        //c.setAttribute("topedge",(((Math.random()/2.0)+.5)*hsize));
                        if (i + (wsize * 2.0)-1 <= imagesave.width) {
                            c.setAttribute("rightedge", (((Math.random() / 5.0) + .5) * Math.sqrt((wsize * wsize) + (hsize * hsize)) / 2.0));
                            if (c.getAttribute("outright") == "true") {
                                c.getContext("2d").moveTo((((xpos < 0) ? 0 : (wsize / 2.0)) + wsize) + (parseInt(c.getAttribute("rightedge")) / 7.0), ((j + (hsize * 2.0) > imagesave.height) ? hsize / 4.0 : 0) + ((ypos < 0) ? (hsize / 2.0) : height / 2.0));
                                c.getContext("2d").arc(
                                (((xpos < 0) ? 0 : (wsize / 2.0)) + wsize) + (parseInt(c.getAttribute("rightedge")) / 7.0), ((j + (hsize * 2.0) > imagesave.height) ? hsize / 4.0 : 0) + ((ypos < 0) ? (hsize / 2.0) : height / 2.0), parseInt(c.getAttribute("rightedge")) / 4.0, 0, Math.PI * 2, false);
                            }
                        }
                        if (i !== 0) {
                            if (piecetoleft.getAttribute("outright") == "false") {
                                c.getContext('2d').moveTo((((xpos < 0) ? 0 : (wsize / 2.0))) - (parseInt(piecetoleft.getAttribute("rightedge")) / 7.0), ((j + (hsize * 2.0) > imagesave.height) ? hsize / 4.0 : 0) + ((ypos < 0) ? (hsize / 2.0) : height / 2.0));
                                c.getContext("2d").arc(
                                (((xpos < 0) ? 0 : (wsize / 2.0))) - (parseInt(piecetoleft.getAttribute("rightedge")) / 7.0), ((j + (hsize * 2.0) > imagesave.height) ? hsize / 4.0 : 0) + ((ypos < 0) ? (hsize / 2.0) : height / 2.0), parseInt(piecetoleft.getAttribute("rightedge")) / 4.0, 0, Math.PI * 2, false);
                            }
                        }
                        if (j + (hsize * 2.0) <= imagesave.height) {
                            c.setAttribute("bottomedge", (((Math.random() / 4.0) + .5) * Math.sqrt((wsize * wsize) + (hsize * hsize)) / 2.0));
                            if (c.getAttribute("outbottom") == "true") {
                                c.getContext("2d").moveTo(((i + (wsize * 2.0) > imagesave.width) ? wsize / 4.0 : 0) + ((xpos < 0) ? (wsize / 2.0) : width / 2.0), (height - ((j !== 0) ? (hsize / 2.0) : (hsize))) + (parseInt(c.getAttribute("bottomedge")) / 7.0));
                                c.getContext("2d").arc(((i + (wsize * 2.0) > imagesave.width) ? wsize / 4.0 : 0) + ((xpos < 0) ? (wsize / 2.0) : width / 2.0), (height - ((j !== 0) ? (hsize / 2.0) : (hsize))) + (parseInt(c.getAttribute("bottomedge")) / 7.0), parseInt(c.getAttribute("bottomedge")) / 4.0, 0, Math.PI * 2, false);
                            }
                        }
                        if (j !== 0) {
                            if (pieceabove.getAttribute("outbottom") == "false") {
                                c.getContext("2d").moveTo(((i + (wsize * 2.0) > imagesave.width) ? wsize / 4.0 : 0) + ((xpos < 0) ? (wsize / 2.0) : width / 2.0), (((j !== 0) ? (hsize / 2.0) : (hsize))) - (parseInt(pieceabove.getAttribute("bottomedge")) / 7.0));
                                c.getContext("2d").arc(((i + (wsize * 2.0) > imagesave.width) ? wsize / 4.0 : 0) + ((xpos < 0) ? (wsize / 2.0) : width / 2.0), (((j !== 0) ? (hsize / 2.0) : (hsize))) - (parseInt(pieceabove.getAttribute("bottomedge")) / 7.0), parseInt(pieceabove.getAttribute("bottomedge")) / 4.0, 0, Math.PI * 2, false);
                            }
                        }

                        c.getContext('2d').rect((xpos <= 0 ? 0 : wsize / 2.0), (ypos <= 0 ? 0 : hsize / 2.0), wsize, hsize);
                        c.getContext('2d').clip();
                        c.getContext('2d').drawImage(imagesave, (xpos <= 0 ? 0 : xpos), (ypos <= 0 ? 0 : ypos), width, height, 0, 0, width, height);
                        c.getContext('2d').globalCompositeOperation = 'destination-out';
                        if (j + (hsize * 2.0) <= imagesave.height) {

                            if (c.getAttribute("outbottom") == "false") {
                                c.getContext("2d").beginPath();
                                c.getContext("2d").arc(((i + (wsize * 2.0) > imagesave.width) ? wsize / 4.0 : 0) + ((xpos < 0) ? (wsize / 2.0) : width / 2.0), (height - ((j !== 0) ? (hsize / 2.0) : (hsize))) - (parseInt(c.getAttribute("bottomedge")) / 7.0), parseInt(c.getAttribute("bottomedge")) / 4.0, 0, Math.PI * 2, false);
                                c.getContext('2d').fill();
                                //c.getContext('2d').clearRect();
                                c.getContext('2d').closePath();
                            }
                        }
                        if (j !== 0) {
                            if (pieceabove.getAttribute("outbottom") == "true") {
                                c.getContext("2d").beginPath();
                                c.getContext("2d").arc(((i + (wsize * 2.0) > imagesave.width) ? wsize / 4.0 : 0) + ((xpos < 0) ? (wsize / 2.0) : width / 2.0), (((j !== 0) ? (hsize / 2.0) : (hsize))) + (parseInt(pieceabove.getAttribute("bottomedge")) / 7.0), parseInt(pieceabove.getAttribute("bottomedge")) / 4.0, 0, Math.PI * 2, false);
                                c.getContext('2d').fill();
                                //c.getContext('2d').clearRect();
                                c.getContext('2d').closePath();
                            }
                        }
                        if (i !== 0) {
                            if (piecetoleft.getAttribute("outright") == "true") {
                                c.getContext("2d").beginPath();
                                c.getContext("2d").arc(
                                (((xpos < 0) ? 0 : (wsize / 2.0))) + (parseInt(piecetoleft.getAttribute("rightedge")) / 7.0), ((j + (hsize * 2.0) > imagesave.height) ? hsize / 4.0 : 0) + ((ypos < 0) ? (hsize / 2.0) : height / 2.0), parseInt(piecetoleft.getAttribute("rightedge")) / 4.0, 0, Math.PI * 2, true);
                                c.getContext('2d').fill();
                                //c.getContext('2d').clearRect();
                                c.getContext('2d').closePath();
                            }
                        }
                        //
                        if (i + (wsize * 2.0)-1 <= imagesave.width) {
                            if (c.getAttribute("outright") == "false") {
                                c.getContext("2d").beginPath();
                                c.getContext("2d").arc(
                                (((xpos < 0) ? 0 : (wsize / 2.0)) + wsize) - (parseInt(c.getAttribute("rightedge")) / 7.0), ((j + (hsize * 2.0) > imagesave.height) ? hsize / 4.0 : 0) + ((ypos < 0) ? (hsize / 2.0) : height / 2.0), parseInt(c.getAttribute("rightedge")) / 4.0, 0, Math.PI * 2, true);
                                c.getContext('2d').fill();
                                //c.getContext('2d').clearRect();
                                c.getContext('2d').closePath();
                            }
                        }

                        c.style.top = j * 2.0 + "px";
                        c.style.left = i * 2.0 + "px";
                        c.style.width = wsize * 2.0;
                        c.style.height = hsize * 2.0;
                        c.style.display = "block";
                        c.style.position = "absolute";
                        document.body.appendChild(c);
                        c.setAttribute("imageleftoffset",(xpos <= 0 ? 0 : wsize / 2.0));
                        c.setAttribute("imagetopoffset",(ypos <= 0 ? 0 : hsize / 2.0));
                        c.setAttribute("leftofimage", parseFloat(c.style.left) + (xpos <= 0 ? 0 : wsize / 2.0));
                        c.setAttribute("topofimage", parseFloat(c.style.top) + (ypos <= 0 ? 0 : hsize / 2.0));
                        c.setAttribute("widthofimage", wsize);
                        c.setAttribute("heightofimage", hsize);
                        pieces.push(c);
                        c.style.zIndex = c.length - 1;
                        //console.log(parseFloat(c.style.left)+(xpos <= 0 ? 0 : wsize / 2.0)+", "+parseFloat(c.style.top)+(ypos <= 0 ? 0 : hsize / 2.0)+", "+wsize+", "+hsize);

                    }
                }
                //document.body.appendChild(this);
            };
        },
    };
})();

puzzle.newImage("http://crazyprofile.com/myspace_graphics/imgs/gothic_girls026.jpg");
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
    // IE is retarded and doesn't pass the event object
    if (e == null) e = window.event;
    for (var i = 0; i < pieces.length; i++) {
        var target = pieces[i];
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
            target.style.zIndex = 10000;
            if ((e.pageX >= leftofimage) && (e.pageX <= leftofimage + widthofimage) && (e.pageY >= topofimage) && (e.pageY <= topofimage + heightofimage)) {
                
                for (var j = 0;j<pieces.length;j++)
                {
                    pieces[j].style.zIndex = j;   
                }
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
        _dragElement.style.zIndex = pieces.length;
 _dragElement.setAttribute("leftofimage",parseFloat(_dragElement.getAttribute("imageleftoffset"))+parseFloat(_dragElement.style.left));
         _dragElement.setAttribute("topofimage",parseFloat(_dragElement.getAttribute("imagetopoffset"))+parseFloat(_dragElement.style.top));
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