class Dropping {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;

        this.droppingSize = 4;
        // this.droppingX = droppingStartingPositionX;
        // this.droppingY = droppingStartingPositionY;

        this.dxDropping = 1;
        this.dyDropping = 3;

        this.droppingFall = this.droppingFall.bind(this);
    }

    makeDropping(droppingX, droppingY) {
        this.ctx.beginPath();
        this.ctx.arc(droppingX, droppingY, this.droppingSize, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fill();
        this.ctx.closePath();
    }

    droppingFall() {
        this.droppingY += this.dyDropping;
        this.droppingX += this.dxDropping;
    }
}

export default Dropping;