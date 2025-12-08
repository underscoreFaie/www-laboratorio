///
/// Clase que implementa los asteroides
///
import { Movable } from "./Movable.js";

const OUTER_RADIUS_GENERATION= 350, INNER_RADIUS_GENERATION= 250;
const BIG_RADIUS= 50, MEDIUM_RADIUS= 20;
const SPEED= 5;

export class Asteroid extends Movable {
    constructor(canvas, ctx, size, random=true, x=0, y=0) {
        super(canvas);
        this.ctx= ctx;
		this.ang = 0;
        this.size= size;

        switch(this.size) {
            case 1:
                this.radius= MEDIUM_RADIUS;
                break;
            default:
                this.radius= BIG_RADIUS;
        }

        if (random) {
            let r= Math.random()*(OUTER_RADIUS_GENERATION - INNER_RADIUS_GENERATION) + INNER_RADIUS_GENERATION;
            let theta= 2*Math.PI*Math.random();
            this.x = r * Math.cos(theta) + canvas.width/2;
            this.y = r * Math.sin(theta) + canvas.height/2;
        } else {
            this.x= x;
            this.y= y;
        }

        let ang= 2*Math.PI*Math.random();
		this.speedX= SPEED*Math.cos(ang);
        this.speedY= SPEED*Math.sin(ang);

        console.log('SPEEDX= ' + this.speedX + ' SPEEDY= ' + this.speedY);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }

    move() {
        super.move();
    }

    checkCollision(playerX, playerY, playerRad) {
        let aux= (playerX - this.x)**2 + (playerY - this.y)**2;
        return Math.sqrt(aux) < this.radius + playerRad;
    }

    destroy(asteroids) {
        if (this.size == 1) return asteroids;
        let asteroid1= new Asteroid(this.canvas, this.ctx, this.size-1, false, this.x, this.y)
        let asteroid2= new Asteroid(this.canvas, this.ctx, this.size-1, false, this.x, this.y)
        asteroids.push(asteroid1, asteroid2)
        return asteroids;
    }
}