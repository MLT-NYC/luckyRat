import Dropping from './dropping';
import Pigeon from './pigeon';
import Rat from './rat';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rootCanvas');
    const ctx = canvas.getContext('2d');
    const luckyRat = new Rat(canvas, ctx);

    let gameBoolean = true;
    let playButton = document.getElementsByClassName('playButton')[0];
    playButton.addEventListener('click', () => {
        draw();
        playButton.style.visibility='hidden';
        restartButton.style.visibility = 'visible';
    });

    let restartButton = document.getElementsByClassName('restartButton')[0];
    restartButton.style.visibility='hidden';
    restartButton.addEventListener('click', () => {
        document.location.reload();
    });

    let level = 1;
    let lastLevel = 13;
    let timer = 30;
    let pizzaLives = 4;
    let pizzaScore = 0;
    let pizzaRadians = 2;
    
    const pigeonStartingPositions = [
        {
            pigeonX: -101,
            pigeonY: 120,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -71
        },
        {
            pigeonX: -101,
            pigeonY: 140,
            dxPigeon: 2,
            dyPigeon: 1.5,
            initialDropX: -69
        },
        {
            pigeonX: -101,
            pigeonY: 160,
            dxPigeon: 2,
            dyPigeon: 1.5,
            initialDropX: -67
        },
        {
            pigeonX: -101,
            pigeonY: 180,
            dxPigeon: 2,
            dyPigeon: 1,
            initialDropX: -65
        },
        {
            pigeonX: -101,
            pigeonY: 200,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -63
        },
        {
            pigeonX: -101,
            pigeonY: 370,
            dxPigeon: 2,
            dyPigeon: 1.25,
            initialDropX: -61
        },
        {
            pigeonX: -101,
            pigeonY: 240,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -59
        },
        {
            pigeonX: -101,
            pigeonY: 390,
            dxPigeon: 2,
            dyPigeon: 1.5,
            initialDropX: -57
        },
        {
            pigeonX: -101,
            pigeonY: 290,
            dxPigeon: 2,
            dyPigeon: 0.5,
            initialDropX: -55
        },
        {
            pigeonX: -101,
            pigeonY: 400,
            dxPigeon: 2,
            dyPigeon: 1,
            initialDropX: -53
        },
    ];
    
    document.addEventListener('keydown', luckyRat.keyDownHandler, false);
    document.addEventListener('keyup', luckyRat.keyUpHandler, false);
    document.addEventListener("mousemove", luckyRat.mouseMoveHandler, false);

    // function drawMarkers() {
    //     ctx.beginPath();
    //     ctx.moveTo(0, 300);
    //     ctx.lineTo(900, 300);
    //     ctx.moveTo(450, 0);
    //     ctx.lineTo(450, 600);
    //     ctx.stroke();
    //     ctx.closePath();
    // }

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
        ctx.fillText(pizzaScore, 46, 45);
    }

    function getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let pigeonRecruits = 10;
    let pigeonArmy = [];
    let pigeonTotalAmmo = [];
    let maxDroppingDY = 6;
    for (let i = 0; i < lastLevel; i++) {
        let pigeonPlatoon = [];
        let pigeonLevelAmmo = [];

        if (pigeonRecruits < 65) {
            for (let j = 0; j < pigeonRecruits; j++) {
                let randomPos = getRandomNum(0,pigeonStartingPositions.length);
                let givenPigeonStartingPosition = pigeonStartingPositions[randomPos];
                let randomDroppingDY = getRandomNum(3, maxDroppingDY);
        
                pigeonPlatoon.push(
                    new Pigeon(
                        canvas, 
                        ctx, 
                        givenPigeonStartingPosition
                        )
                    );

                pigeonLevelAmmo.push(
                    new Dropping(
                        canvas, 
                        ctx, 
                        givenPigeonStartingPosition.pigeonX, 
                        givenPigeonStartingPosition.pigeonY,
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
        let pigeonLevelAmmo = pigeonTotalAmmo[level-1];
        for (let j = 0; j < platoon.length; j++) {
            let pigeon = platoon[j];
            let dropping = pigeonLevelAmmo[j];
            
            pigeon.drawPigeon();
            setTimeout(pigeon.pigeonFly.bind(pigeon), 650 * j * 30/platoon.length);

            let pigeonPosX = pigeon.pigeonX;
            let pigeonPosY = pigeon.pigeonY;
            if (pigeonPosX === pigeon.makeDropX) {
                dropping.droppingPosReset(pigeonPosX, pigeonPosY);
                pigeon.eatFeed();
            }         
            
            if (pigeonPosX > -25 && dropping.status) {
                dropping.drawDropping();
                dropping.droppingFall();
            }
            
            if (dropping.status === 1) {
                if (dropping.droppingY + dropping.dyDropping > canvas.height - luckyRat.ratGirth/1.5) {
                    if (dropping.droppingX > luckyRat.ratX + luckyRat.ratGirth/2
                        && dropping.droppingX < luckyRat.ratX + luckyRat.ratGirth 
                        && dropping.droppingY < luckyRat.ratY + 100) {
                        dropping.status = 0;
                        pizzaLives--;
                        pizzaRadians -= 0.5;
                    }
                }
            }
        }

        if (timer <= 0) {
            timer = 30;
            pizzaScore += pizzaLives;
            pizzaLives = 4;
            pizzaRadians = 2;
            pigeonRecruits += 10;
            maxDroppingDY += 1;
        }
        
        if (pizzaLives === 0) {
            if (gameBoolean) {
                gameBoolean = false;
                alert(`Game Over! luckyRat ate ${pizzaScore} pizza slices.`);
                document.location.reload();
            }
        } 
        
        if (gameBoolean) {
            if (level === 13 && timer === 0) {
                alert(`You win! luckyRat ate ${pizzaScore} pizza slices. That's alot of slices!`);
                document.location.reload();
            }
        }

        requestAnimationFrame(draw);
    }
});
