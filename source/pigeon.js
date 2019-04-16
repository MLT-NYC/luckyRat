class Pigeon {
    constructor(canvas, ctx, pigeonStartingPosition, pigeonColor) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.pigeonStartingPosition = pigeonStartingPosition;

        this.pigeonX = pigeonStartingPosition.pigeonX;
        this.pigeonY = pigeonStartingPosition.pigeonY;
        this.dxPigeon = pigeonStartingPosition.dxPigeon;
        this.dyPigeon = pigeonStartingPosition.dyPigeon;

        this.makeDropX = pigeonStartingPosition.initialDropX;

        this.pigeonColor = pigeonColor;

        this.pigeonImage = new Image();
        this.pigeonImage.src = './images/pigeon.png';

        this.pigeonFly = this.pigeonFly.bind(this);
    }

    drawPigeon() {
        this.ctx.drawImage(this.pigeonImage, 0, 0, 1000, 1000, this.pigeonX, this.pigeonY, 100, 100);
    }

    pigeonFly() {
        this.pigeonX += this.dxPigeon;

        this.pigeonY += this.dyPigeon;

        if (this.pigeonY > this.pigeonStartingPosition.pigeonY + 10) {
            this.dyPigeon = -this.dyPigeon;
        } else if (this.pigeonY < this.pigeonStartingPosition.pigeonY - 10) {
            this.dyPigeon = -this.dyPigeon;
        }
    }

    eatFeed(){
        this.makeDropX += 350;
    }
}

export default Pigeon;