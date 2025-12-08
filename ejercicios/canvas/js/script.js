import { Player } from "./Player.js";
import { Asteroid } from "./Asteroid.js";

const canvas = document.getElementById("appCanvas");
const ctx = canvas.getContext("2d");
const test= document.querySelector('[data-class="test"]');
let gameStart= false, gameOver= false;
let player1, asteroids;

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (gameOver) {
        gameOverScreen();
    } else if (!gameStart) {
        menuScreen();
    } else {  
        draw();
        move();
    }
}
requestAnimationFrame(gameLoop);

function menuScreen() {
    /* Muestra el menú cuando gameStart= false
    */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	ctx.font = '50px Montserrat';
	ctx.fillText('ASTEROIDS', canvas.width/2, canvas.height/2 -30);
    ctx.font = '20px Montserrat';
    ctx.fillText('Pulsa ESPACIO para comenzar', canvas.width/2, canvas.height/2 +20);
}

function gameOverScreen() {
    /* Muestra el mensaje de Victoria o Derrota cuando gameOver = true
    */
    gameStart= false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (asteroids.length == 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = '50px Montserrat';
        ctx.fillText('HAS GANADO', canvas.width/2, canvas.height/2 -30);
        ctx.font = '20px Montserrat';
        ctx.fillText('Pulsa ESPACIO para continuar', canvas.width/2, canvas.height/2 +20);
    } else {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = '50px Montserrat';
        ctx.fillText('HAS PERDIDO', canvas.width/2, canvas.height/2 -30);
        ctx.font = '20px Montserrat';
        ctx.fillText('Pulsa ESPACIO para continuar', canvas.width/2, canvas.height/2 +20);
    }	
}

function start() {
    /* Inicializa player1 y los asteroides
    */
    player1= new Player(canvas, ctx);
    let asteroid1= new Asteroid(canvas, ctx, 2)
    let asteroid2= new Asteroid(canvas, ctx, 2)
    let asteroid3= new Asteroid(canvas, ctx, 2)
    asteroids= [asteroid1]
    gameStart= true;   
}

//CONTROLES
function keyPressed(evt) {
    /* Manejar pulsación de teclas
    */
    evt.preventDefault();
    switch(evt.code) {
        case 'ArrowRight': 
            player1.keyHeld_RIGHT= true;
            break;
        case 'ArrowLeft': 
            player1.keyHeld_LEFT= true;
            break;
        case 'ArrowUp': 
            player1.keyHeld_UP= true;
            break;
        case 'Space':
            if (gameOver) {gameOver= false; break;}
            if (!gameStart) {start(); break;}
            player1.shoot();
    }
}

function keyReleased(evt) {
    /* Manejar releseación de teclas
    */
    evt.preventDefault();
    switch(evt.code) {
        case 'ArrowRight': 
            player1.keyHeld_RIGHT= false;
            break;
        case 'ArrowLeft': 
            player1.keyHeld_LEFT= false;
            break;
        case 'ArrowUp': 
            player1.keyHeld_UP= false;
            break;
    }
}

function checkPlayerCollision() {
    /* Comprueba si el jugador se ha chocado con un meteorito
    */
    let hit= false;
    for (let asteroid of asteroids) {
        let playerX= player1.x, playerY= player1.y;
        hit= hit || asteroid.checkCollision(playerX, playerY, player1.radius);
    }
    if (hit) {
        gameOver= true;
    }
}

function checkBulletCollision() {
    /* Comprueba si la bala se ha chocado con un meteorito
    */
    if (player1.shot == null) return;
    for (let i=asteroids.length -1; i>=0 ; i--) {
        let bulletX= player1.shot.x, bulletY= player1.shot.y;
        let hit= asteroids[i].checkCollision(bulletX, bulletY, 5);
        if (hit) {
            player1.shot= null;
            asteroids= asteroids[i].destroy(asteroids);
            asteroids.splice(i, 1);
            return;
        }
    }
    return;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.draw();
    for (let asteroid of asteroids) {
        asteroid.draw();
    }
}

function move() {
    player1.move();
    for (let asteroid of asteroids) {
        asteroid.move();
    }
    checkPlayerCollision();
    checkBulletCollision();
    if (asteroids.length == 0) gameOver= true;
}








