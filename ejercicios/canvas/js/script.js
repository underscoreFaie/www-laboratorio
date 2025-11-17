import { Player } from "./Player.js";

const KEY_UP_ARROW = 38, KEY_DOWN_ARROW = 40, KEY_LEFT_ARROW = 37, KEY_RIGHT_ARROW = 39;
const canvas = document.getElementById("appCanvas");
const ctx = canvas.getContext("2d");
const test= document.querySelector('[data-class="test"]');

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

const player1= new Player(canvas, ctx);

function gameLoop() {
    requestAnimationFrame(gameLoop);

    draw();
    move();
}
requestAnimationFrame(gameLoop);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player1.draw();
}

function move() {
    player1.move();
}

function keyPressed(evt) {
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
            player1.shoot();
    }
}

function keyReleased(evt) {
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



