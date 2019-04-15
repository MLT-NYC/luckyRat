class Rat {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.ratGirth = 30;
        this.ratX = (canvas.width) / 2;
        this.ratY = (canvas.height - this.ratGirth);

        this.rightPressed = false;
        this.leftPressed = false;

        this.ratColor = '#b2b2b2';

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }

    drawRat() {
        this.ctx.beginPath();
        this.ctx.arc(this.ratX, this.ratY, this.ratGirth, 0, Math.PI * 2);
        this.ctx.fillStyle = this.ratColor;
        this.ctx.fill();
        this.ctx.closePath();
    }

    keyDownHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            this.rightPressed = true;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            this.rightPressed = false;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            this.leftPressed = false;
        }
    }

    mouseMoveHandler(e) {
        // debugger
        let relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
            this.ratX = relativeX - this.ratGirth/2;
        }
    }

    ratMovement() {
        if (this.rightPressed && this.ratX < this.canvas.width - this.ratGirth) {
            this.ratX += 7;
        } else if (this.leftPressed && this.ratX - this.ratGirth > 0) {
            this.ratX -= 7;
        }
    }
}

export default Rat;