///
///	Clase que implementa el disparo de las naves
///
import { Movable } from "./Movable.js";
const SHOT_SPD= 10, SHOT_RAD= 5, SHOT_LIFE= 45;

export class Bullet extends Movable{
    constructor(canvas, ctx, x, y, ang) {
        super(canvas);
        this.ctx= ctx;
        this.x= x;
        this.y= y;
        this.speedX= Math.sin(ang)*SHOT_SPD;
        this.speedY= -Math.cos(ang)*SHOT_SPD;
        this.shotLife= SHOT_LIFE;
    }

    move() {
        if(this.shotLife > 0) {
			this.shotLife--;
			this.x= this.x + this.speedX;
            this.y= this.y + this.speedY;
		}
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, SHOT_RAD, 0, Math.PI*2, true);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
	}
}