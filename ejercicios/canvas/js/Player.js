///
///	Clase que implementa el jugador
///
import { Movable } from "./Movable.js";
import { Bullet } from "./Bullet.js";

const test= document.querySelector('[data-class="test"]');
const SPEED_DECAY_MULT = 0.95;
const WIDTH= 30, HEIGHT= 60;
const THRUST = 0.3, TURN_SPD = 0.04*Math.PI;

export class Player extends Movable {
	constructor(canvas, ctx) {
		super(canvas)
		this.ctx= ctx;
		this.ang = 0;
		this.radius= 30;
		this.x = this.canvas.width/2;
		this.y = this.canvas.height/2;
		this.speedX= this.speedY= 0;
		this.keyHeld_UP= this.keyHeld_LEFT= this.keyHeld_RIGHT= false;
		this.shot= null;
	}

	draw() {
		if (this.shot != null) this.shot.draw();
		//Dibujar rectángulo rotado
		// TODO - Cambiarlo por el dibujo de la nave (usando path): A
		this.ctx.save()
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.ang);
		this.ctx.beginPath();
		this.ctx.moveTo(-20, 20);
		this.ctx.lineTo(0, -20);
		this.ctx.lineTo(20, 20);
		this.ctx.moveTo(15, 10);
		this.ctx.lineTo(-15, 10);
		this.ctx.strokeStyle= 'white';
		this.ctx.stroke();
		this.ctx.restore();

		if (this.keyHeld_UP) {
			this.ctx.save()
			this.ctx.translate(this.x, this.y);
			this.ctx.rotate(this.ang);
			this.ctx.beginPath();
			this.ctx.moveTo(10, 10);
			this.ctx.lineTo(0, 20);
			this.ctx.lineTo(-10, 10);
			this.ctx.strokeStyle= 'white';
			this.ctx.stroke();
			this.ctx.restore();
		}
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
		/* Manejar teclas
		*/
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
		this.speedX= this.speedX*SPEED_DECAY_MULT;
		this.speedY= this.speedY*SPEED_DECAY_MULT;
	}
}