document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rootCanvas');
    const ctx = canvas.getContext('2d');

    let rightPressed = false;
    let leftPressed = false;

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    const ratGirth = 30;
    let ratX = (canvas.width - ratGirth)/2;
    let ratY = (canvas.height - ratGirth);

    function keyDownHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = true;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = false;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            ratX = relativeX - ratGirth/2;
        }
    }

    function drawMarkers() {
        ctx.beginPath();
        ctx.moveTo(450, 0);
        ctx.lineTo(450, 600);
        ctx.moveTo(0, 300);
        ctx.lineTo(900, 300);
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
        ctx.closePath();
    }

    function drawRat() {
        ctx.beginPath();
        ctx.arc(ratX, ratY, ratGirth, 0, Math.PI * 2);
        ctx.fillStyle = '#b2b2b2';
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRat();

        drawMarkers();

        if (rightPressed && ratX < canvas.width - ratGirth) {
            ratX += 7;
        } else if (leftPressed && ratX - ratGirth > 0) {
            ratX -= 7;
        }
        requestAnimationFrame(draw);
    }

    draw();
});
