import Dropping from './dropping';
import Pigeon from './pigeon';
import Rat from './rat';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rootCanvas');
    const ctx = canvas.getContext('2d');
    // const pizzaImage = new Image();
    // pizzaImage.src = 'images/pixel-pizza.jpg';

    const luckyRat = new Rat(canvas, ctx);
    
    const pigeonStartingPositions = [
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 120,
            pigeonTopY: 100,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -20
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 140,
            pigeonTopY: 120,
            dxPigeon: 2,
            dyPigeon: 1.5,
            initialDropX: -18
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 160,
            pigeonTopY: 140,
            dxPigeon: 2,
            dyPigeon: 1.5,
            initialDropX: -16
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 180,
            pigeonTopY: 160,
            dxPigeon: 2,
            dyPigeon: 1,
            initialDropX: -14
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 200,
            pigeonTopY: 180,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -12
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 390,
            pigeonTopY: 370,
            dxPigeon: 2,
            dyPigeon: 1.25,
            initialDropX: -10
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 240,
            pigeonTopY: 220,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -8
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 490,
            pigeonTopY: 470,
            dxPigeon: 2,
            dyPigeon: 1.5,
            initialDropX: -6
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 290,
            pigeonTopY: 270,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -4
        },
        {
            pigeonLeftX: -51,
            pigeonMidX: -26,
            pigeonRightX: -1,
            pigeonBottomY: 500,
            pigeonTopY: 480,
            dxPigeon: 2,
            dyPigeon: 1,
            initialDropX: -2
        },
    ];

    const pigeonColors = [
        'rgb(24, 20, 49)',
        'rgb(38, 41, 71)',
        'rgb(34, 83, 88)',
        'rgb(50, 113, 85)',
        'rgb(89, 191, 139)',
        'rgb(181, 215, 123)',
        'rgb(242, 193, 103)',
        'rgb(222, 114, 72)',
        'rgb(217, 50, 76)',
        'rgb(148, 54, 92)',
        'rgb(102, 21, 93)'
    ];

    let level = 1;
    let lastLevel = 13;
    let timer = 30;
    let pizzaLives = 4;
    let pizzaScore = 0;
    let pizzaRadians = 2;

    function resetRatColor() {
        luckyRat.ratColor = 'rgb(178, 178, 178)';
    }
    setInterval(resetRatColor, 200);
    
    document.addEventListener('keydown', luckyRat.keyDownHandler, false);
    document.addEventListener('keyup', luckyRat.keyUpHandler, false);
    document.addEventListener("mousemove", luckyRat.mouseMoveHandler, false);

    function drawMarkers() {
        ctx.beginPath();
        ctx.moveTo(0, 300);
        ctx.lineTo(900, 300);
        ctx.moveTo(450, 0);
        ctx.lineTo(450, 600);
        ctx.stroke();
        ctx.closePath();
    }

    function drawLevel() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Level ' + level, 390, 20);
    }

    function nextLevel() {
        level += 1;
    }
    setInterval(nextLevel, 30000);

    function drawTimer() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Time ' + timer, 460, 20);
    }

    function timerTick() {
        timer -= 1;
    }
    setInterval(timerTick, 1000);
    
    function drawPizzaLivesTitle () {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Pizza Slices', 805, 20);
    }
    
    function drawPizzaLives () {
        ctx.beginPath();
        ctx.arc(850, 45, 15, 0, Math.PI * pizzaRadians);
        ctx.lineTo(850, 45);
        ctx.fillStyle = 'rgb(248, 234, 62)';
        ctx.fill();
        ctx.closePath();
    }

    function drawPizzaScoreTitle() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Slices Eaten', 8, 20);
    }

    function drawPizzaScore() {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(pizzaScore, 46, 40);
    }

    function getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let pigeonRecruits = 10;
    let pigeonArmy = [];
    let pigeonTotalAmmo = [];
    let topDroppingDY = 6;
    for (let i = 0; i < lastLevel; i++) {
        let pigeonPlatoon = [];
        let pigeonLevelAmmo = [];

        if (pigeonRecruits < 65) {
            for (let j = 0; j < pigeonRecruits; j++) {
                let randomPos = getRandomNum(0,pigeonStartingPositions.length);
                let givenPigeonStartingPosition = pigeonStartingPositions[randomPos];
                let randomDroppingDY = getRandomNum(3, topDroppingDY);
        
                let randomColorNum = getRandomNum(0, pigeonColors.length);
                let pigeonColor = pigeonColors[randomColorNum];
                pigeonPlatoon.push(
                    new Pigeon(
                        canvas, 
                        ctx, 
                        givenPigeonStartingPosition,
                        pigeonColor
                        )
                    );

                pigeonLevelAmmo.push(
                    new Dropping(
                        canvas, 
                        ctx, 
                        givenPigeonStartingPosition.pigeonMidX, 
                        givenPigeonStartingPosition.pigeonBottomY,
                        randomDroppingDY
                        )
                    );
            }
        }

        pigeonRecruits += 3;
        pigeonArmy.push(pigeonPlatoon);
        pigeonTotalAmmo.push(pigeonLevelAmmo);
    }

    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawLevel();
        drawTimer();
        drawPizzaLivesTitle();
        drawPizzaLives();
        drawPizzaScoreTitle();
        drawPizzaScore();
        // drawMarkers();
        
        luckyRat.drawRat();
        luckyRat.ratMovement();
 
        let platoon = pigeonArmy[level-1];
        let pigeonLevelAmmo = pigeonTotalAmmo[level-1]
        for (let j = 0; j < platoon.length; j++) {
            let pigeon = platoon[j];
            let dropping = pigeonLevelAmmo[j];
            
            pigeon.drawPigeon();
            setTimeout(pigeon.pigeonFly.bind(pigeon), 650 * j * 30/platoon.length);
            let pigeonPosX = pigeon.pigeonMidX;
            let pigeonPosY = pigeon.pigeonBottomY;
            if (pigeonPosX === pigeon.makeDropX) {
                dropping.droppingPosReset(pigeonPosX, pigeonPosY);
                pigeon.eatFeed();
            }         
            
            if (pigeonPosX > 25 && dropping.status) {
                dropping.drawDropping();
                dropping.droppingFall();
            }
            
            if (dropping.status === 1) {
                if (dropping.droppingY + dropping.dyDropping > canvas.height - luckyRat.ratGirth) {
                    if (dropping.droppingX > luckyRat.ratX  && dropping.droppingX < luckyRat.ratX + luckyRat.ratGirth && dropping.droppingY < luckyRat.ratY) {
                        dropping.status = 0;
                        luckyRat.ratColor = 'rgb(215, 46, 32)';
                        pizzaLives--;
                        pizzaRadians -= 0.5;
                    }
                }
            }
        }

        if (timer <= 0) {
            timer = 30;
            pizzaScore += pizzaLives;
            pizzaLives = 3;
            pigeonRecruits += 10;
            topDroppingDY += 1;
        }
        
        if (pizzaLives === 0) {
            alert(`Game Over! luckyRat ate ${pizzaScore} pizza slices.`);
            document.location.reload();
        } 
        
        if (level === 13 && timer === 0) {
            alert(`You win! luckyRat ate ${pizzaScore} pizza slices. That's alot of slices!`);
            document.location.reload();
        }

        requestAnimationFrame(draw);
    }

    draw();
});
