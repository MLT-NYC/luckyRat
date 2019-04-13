class Pigeon {
    constructor(canvas, ctx, pigeonStartingPosition) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.pigeonStartingPosition = pigeonStartingPosition;

        this.pigeonLeftX = pigeonStartingPosition.pigeonLeftX;
        this.pigeonMidX = pigeonStartingPosition.pigeonMidX;
        this.pigeonRightX = pigeonStartingPosition.pigeonRightX;
        this.pigeonBottomY = pigeonStartingPosition.pigeonBottomY;
        this.pigeonTopY = pigeonStartingPosition.pigeonTopY;

        this.dxPigeon = pigeonStartingPosition.dxPigeon;
        this.dyPigeon = pigeonStartingPosition.dyPigeon;

        this.pigeonFly = this.pigeonFly.bind(this);

        // this.droppings = makeDroppings();
    }

    drawPigeon() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pigeonLeftX, this.pigeonBottomY);
        this.ctx.lineTo(this.pigeonRightX, this.pigeonBottomY);
        this.ctx.lineTo(this.pigeonMidX, this.pigeonTopY);
        this.ctx.fillStyle = '#b2b2b2';
        this.ctx.fill();
        this.ctx.closePath();
    }

    pigeonFly() {
        this.pigeonLeftX += this.dxPigeon;
        this.pigeonMidX += this.dxPigeon;
        this.pigeonRightX += this.dxPigeon;

        this.pigeonBottomY += this.dyPigeon;
        this.pigeonTopY += this.dyPigeon;

        if(this.pigeonTopY > this.pigeonStartingPosition.pigeonTopY+10) {
            this.dyPigeon = -this.dyPigeon;
        } else if (this.pigeonTopY < this.pigeonStartingPosition.pigeonTopY-10) {
            this.dyPigeon = -this.dyPigeon;
        }
    }
}

export default Pigeon;