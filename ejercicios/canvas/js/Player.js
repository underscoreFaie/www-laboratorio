///
///	Clase que implementa el jugador
///
import { Movable } from "./Movable.js";
import { Bullet } from "./Bullet.js";

const test= document.querySelector('[data-class="test"]');
const SPEED_DECAY_MULT = 0.8;
const WIDTH= 30, HEIGHT= 60;
const THRUST = 0.05, TURN_SPD = 0.04*Math.PI;

export class Player extends Movable {
	constructor(canvas, ctx) {
		super(canvas)
		this.ctx= ctx;
		this.reset()
	}

	reset() {
		this.ang = 0;
		this.x = this.canvas.width/2;
		this.y = this.canvas.height/2;
		this.speedX= this.speedY= 0;
		this.keyHeld_UP= this.keyHeld_LEFT= this.keyHeld_RIGHT= false;
		this.shot= null;
	}

	draw() {
		if (this.shot != null) this.shot.draw();
		this.ctx.save()
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.ang);
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(- WIDTH/2,- HEIGHT/2, WIDTH, HEIGHT);
		this.ctx.restore();
	}

	move() {
		this.shipControl();
		if (this.shot != null) {
			this.shot.move();
			if (this.shot.shotLife == 0) this.shot= null;
		}
		super.move();
	}

	shoot() {
		if (this.shot==null) {
			this.shot= new Bullet(this.canvas, this.ctx, this.x, this.y, this.ang);
		}
	}

	shipControl() {
		if (this.keyHeld_UP) {
			this.speedX += Math.sin(this.ang)*THRUST; 
			this.speedY -= Math.cos(this.ang)*THRUST;
		}
		if (this.keyHeld_RIGHT) {
			this.ang += TURN_SPD;
		}
		if (this.keyHeld_LEFT) {
			this.ang -= TURN_SPD;
		}
	}
}