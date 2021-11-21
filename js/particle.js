const TAU = Math.PI * 2, MAX_SPEED = 2;

class Particle {
    constructor(opts) {
        this.x = opts.x || canvas.width / 2;
        this.y = opts.y || canvas.height / 2;
        this.radius = opts.r || Math.floor(Math.random()) + 1;
        this.angle = opts.a || Math.random() * TAU;
        this.speed = opts.s || Math.random() * MAX_SPEED;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.alpha = 1;
        this.color = 190 + (50 * Math.random());
    }

    draw(c) {
        c.beginPath();
        c.fillStyle = 'hsl(' + this.color + ', 90%, 50%)';
        c.arc(this.x, this.y, this.radius, 0, TAU, true);
        c.fill();
    }

    move() {
        this.vy += -.5 + Math.random();
        this.vx += -.5 + Math.random();
        this.x += this.vx;
        this.y += this.vy;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.floor(Math.random() * 10) + 1;
        this.angle = Math.random() * TAU;
        this.speed = Math.random() * MAX_SPEED;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.alpha = 1;
    }

    isAlive() {
        return this.radius > 0 && this.alpha > 0;
    }
}
