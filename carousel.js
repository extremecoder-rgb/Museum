//variables initialization
var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 150
var imgHeight = 200
setTimeout(init, 1000);

// select dom carousel elements
var odrag = document.querySelector('#drag-container');
var ospin = document.querySelector('#spin-container');
var aImg = ospin.getElementsByTagName('img');
var aEle = [...aImg];

//set image width and height
ospin.style.width = imgWidth + 'px';
ospin.style.height = imgHeight + 'px';

var ground = document.querySelector('#ground');
ground.style.width = radius * 3 + 'px';
ground.style.height = radius * 3 + 'px';

//setup initial delay time for image appearance
function init(delayTime) {
    for (var i=0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)" ;
        aEle[i].style.transition = 'transform 1s';
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
} 

function applyTransform(obj){
    if(tY > 180) tY = 180;
    if(tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + (-tY) +"deg) rotateY(" + (tX) + "deg)";
}
//play object spinning effect
function playspin(yes){
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}
//variables initialization
var sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

//enable auto rotating effect
if(autoRotate){
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = '${animationName} ${Math.abs(autoRotate)}s infinite linear';
}
document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

this.onpointerdown = function (e){
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
            desX = nX - sX;
            desY = nY - sY;
        tX+=desX * 0.1;
        tY+=desY * 0.1;
    applyTransform(odrag);
    sX = nX;
    sY = nY;
} ;
  this.onpointerup = function (e) {
    odrag.timer = setInterval(function(){
        desX *= 0.95;
        desY *= 0.95;
        tX+=desX * 0.1;
        tY+=desY * 0.1;
        applyTransform(odrag);
        playspin(false);
        if(Math.abs(desX) < 0.5 && Maths.abs(desY) < 0.5){
            clearInterval(odrag.timer);
            playspin(true);
        }
    }, 17);
    this.pointermove = this.onpointerup = null;
  };
  return false
};

document.onmousewheel = function(e){
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};

