class Rat {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.ratGirth = 60;
        this.ratX = (canvas.width) / 2;
        this.ratY = (canvas.height - this.ratGirth);

        this.rightPressed = false;
        this.leftPressed = false;

        this.ratImage = new Image();
        this.ratImage.src = './images/rat.png';

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }

    drawRat() {
        this.ctx.drawImage(this.ratImage, 0, 0, 1000, 1000, this.ratX, this.ratY, 100, 100);
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
        let relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
            this.ratX = relativeX - this.ratGirth/2;
        }
    }

    ratMovement() {
        if (this.rightPressed && this.ratX < this.canvas.width - this.ratGirth) {
            this.ratX += 7;
        } else if (this.leftPressed && this.ratX > 0) {
            this.ratX -= 7;
        }
    }
}

export default Rat;