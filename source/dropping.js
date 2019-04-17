class Dropping {
    constructor(canvas, ctx, droppingX, droppingY, randomDroppingDY){
        this.canvas = canvas;
        this.ctx = ctx;

        this.droppingSize = 3;
        this.droppingX = droppingX;
        this.droppingY = droppingY;

        this.dxDropping = 2;
        this.dyDropping = randomDroppingDY;

        this.status = 1;
        this.droppingFall = this.droppingFall.bind(this);

    }

    drawDropping() {
        this.ctx.beginPath();
        this.ctx.arc(this.droppingX, this.droppingY, this.droppingSize, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fill();
        this.ctx.closePath();
    }

    droppingFall() {
        this.droppingX += this.dxDropping;
        this.droppingY += this.dyDropping;
    }

    droppingPosReset(droppingX, droppingY) {
        this.droppingX = droppingX + 45;
        this.droppingY = droppingY + 65;
    }
}

export default Dropping;