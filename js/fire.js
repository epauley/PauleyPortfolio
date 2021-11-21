class Fire extends Particle {
    constructor(opts) {
        super(opts);
        this.reset(this.x, this.y);
    }

    grow() {
        this.radius -= 0.05;
    }

    reset(x, y) {
        super.reset(x, y);
    }
}
