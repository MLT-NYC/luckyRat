import Dropping from './dropping';
import Pigeon from './pigeon';
import Rat from './rat';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rootCanvas');
    const ctx = canvas.getContext('2d');
    const luckyRat = new Rat(canvas, ctx);
    
    const pigeonStartingPositions = [
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 80,
            pigeonTopY: 60,
            dxPigeon: 2,
            dyPigeon: 0.5,
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 120,
            pigeonTopY: 100,
            dxPigeon: 1.5,
            dyPigeon: 0.5,
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 140,
            pigeonTopY: 120,
            dxPigeon: 2,
            dyPigeon: 1.5,
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 160,
            pigeonTopY: 140,
            dxPigeon: 1.6,
            dyPigeon: 1,
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 200,
            pigeonTopY: 180,
            dxPigeon: 1.5,
            dyPigeon: 0.5,
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 390,
            pigeonTopY: 370,
            dxPigeon: 1.75,
            dyPigeon: 1.25,

        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 240,
            pigeonTopY: 220,
            dxPigeon: 1.6,
            dyPigeon: 0.5,
            
        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 490,
            pigeonTopY: 470,
            dxPigeon: 1.75,
            dyPigeon: 1.5,

        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 290,
            pigeonTopY: 270,
            dxPigeon: 1,
            dyPigeon: 0.5,

        },
        {
            pigeonLeftX: -50,
            pigeonMidX: -25,
            pigeonRightX: 0,
            pigeonBottomY: 500,
            pigeonTopY: 480,
            dxPigeon: 1.75,
            dyPigeon: 1.1,

        },
    ];

    let level = 1;
    let lastLevel = 13;
    let timer = 30;
    let pizzaLives = 3;
    let pizzaScore = 0;

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

    let pigeonRecruits = 5;
    let pigeonArmy = [];
    let pigeonTotalAmmo = [];
    for (let i = 0; i < lastLevel; i++) {
        let pigeonPlatoon = [];
        let pigeonLevelAmmo = [];

        if (pigeonRecruits < 65) {
            for (let j = 0; j < pigeonRecruits; j++) {
                let randomPos = getRandomNum(0,pigeonStartingPositions.length);
                let givenPigeonStartingPosition = pigeonStartingPositions[randomPos];
        
                pigeonPlatoon.push(new Pigeon(canvas, ctx, givenPigeonStartingPosition));
                pigeonLevelAmmo.push(new Dropping(canvas, ctx));
            }
        }

        pigeonRecruits += 3;
        pigeonArmy.push(pigeonPlatoon);
        pigeonTotalAmmo.push(pigeonLevelAmmo);
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
        let pigeonLevelAmmo = pigeonTotalAmmo[level-1]
        for (let j = 0; j < platoon.length; j++) {
            let pigeon = platoon[j];
            let dropping = pigeonLevelAmmo[j];

            pigeon.drawPigeon();
            setTimeout(pigeon.pigeonFly.bind(pigeon), 650 * j * 30/platoon.length);

            if (pigeon.pigeonBottomY === 90 || 
                pigeon.pigeonBottomY === 130 || 
                pigeon.pigeonBottomY === 150 || 
                pigeon.pigeonBottomY === 170 ||
                pigeon.pigeonBottomY === 210 ||
                pigeon.pigeonBottomY === 250 ||
                pigeon.pigeonBottomY === 300 ||
                pigeon.pigeonBottomY === 400 ||
                pigeon.pigeonBottomY === 500 ||
                pigeon.pigeonBottomY === 510) {

                dropping.makeDropping(pigeon.pigeonMidX, pigeon.pigeonBottomY);
                    

                setTimeout(dropping.pigeonFall, 650 * j * 30 / platoon.length);
            }
            // dropping.droppingFall();

        }   

        requestAnimationFrame(draw);
    }

    draw();
});
