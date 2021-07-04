var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particles = [];
var frameCount = 0;
var MAX_PARTICLES = 50;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
	y: undefined
}

window.addEventListener('mousedown', function() {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  explode();
});

window.addEventListener('resize', function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

window.addEventListener('DOMContentLoaded', function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba(255, 255, 255, .8)';
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

var circleArray = [];

function init() {

  circleArray = [];

  for (var i = 0; i < 1000; i++) {
    var radius = Math.random();
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var dx = -.5 + Math.random();
    var dy = -.5 + Math.random();
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

function initialize() {
  mouse = {x: mouse.x, y: mouse.y};
  for (let i = 0; i < MAX_PARTICLES; i++) {
  particles.push(new Fire({}));
  }
  explosionAnimate();
  explode();
}

function explode() {
  particles.forEach(
      (p)=> {
          p.reset(mouse.x, mouse.y);
      }
  );
}

function explosionAnimate() {

  particles
      .filter((particle)=>particle.isAlive())
      .forEach(
          (particle)=> {
              particle.draw(c);
              particle.grow();
              particle.move(frameCount);
          }
      );

  requestAnimationFrame(()=> {
      frameCount++;
      explosionAnimate();
  })
}

init();
animate();
initialize();
