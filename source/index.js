import Pigeon from './pigeon';
import Rat from './rat';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rootCanvas');
    const ctx = canvas.getContext('2d');
    const luckyRat = new Rat(canvas, ctx);

    let level = 1;
    let lastLevel = 13;
    let timer = 30;
    let pizzaLives = 3;
    let pizzaScore = 0;
    

    const pigeonStartingPositions = [
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 120,
            pigeonTopY: 100
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 140,
            pigeonTopY: 120
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 160,
            pigeonTopY: 140
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 170,
            pigeonTopY: 150
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 200,
            pigeonTopY: 180
            
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 80,
            pigeonTopY: 60

        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 180,
            pigeonTopY: 160

        },

    ];

    document.addEventListener('keydown', luckyRat.keyDownHandler, false);
    document.addEventListener('keyup', luckyRat.keyUpHandler, false);
    document.addEventListener("mousemove", luckyRat.mouseMoveHandler, false);

    function drawLevel() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Level ' + level, 8, 20);
    }

    function nextLevel() {
        level += 1;
    }
    setInterval(nextLevel, 30000);

    function drawTimer() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Time ' + timer, 8, 40);
    }

    function timerTick() {
        timer -= 1;
    }

    setInterval(timerTick, 1000);

    function drawPizzaLives () {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Pizzas ' + pizzaLives, 8, 60);
    }

    function drawPizzaScore() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Pizzas eaten ' + pizzaScore, 8, 80);
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

    function getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let pigeonRecruits = 10;
    let pigeonArmy = [];
    for (let i = 0; i < lastLevel; i++) {
        
        let pigeonPlatoon = [];

        if (pigeonRecruits < 65) {
            for (let j = 0; j < pigeonRecruits; j++) {
                let randomPos = getRandomNum(0,pigeonStartingPositions.length-1);
                let givenPigeonStartingPosition = pigeonStartingPositions[randomPos];
        
                pigeonPlatoon.push(new Pigeon(canvas, ctx, givenPigeonStartingPosition));
            }
        }

        pigeonRecruits += 5;
        pigeonArmy.push(pigeonPlatoon);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMarkers();

        drawLevel();
        drawTimer();
        drawPizzaLives();
        drawPizzaScore();

        luckyRat.drawRat();
        luckyRat.ratMovement();

        if (timer <= 0) {
            timer = 30;
            pizzaScore += pizzaLives;
            pizzaLives = 3;
            pigeonRecruits += 10;
        }

        let platoon = pigeonArmy[level-1];
        for (let j = 0; j < platoon.length; j++) {
            let pigeon = platoon[j];
            pigeon.drawPigeon();
            setTimeout(pigeon.pigeonFly.bind(pigeon), 650 * j * 30/platoon.length);
        }   

        requestAnimationFrame(draw);
    }

    draw();
});
