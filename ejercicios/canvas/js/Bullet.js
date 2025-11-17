///
///	Clase que implementa el disparo de las naves
///
export class Bullet extends Movable{
    constructor() {
        this.x;
        this.y;
        this.ang;
        this.shotLife;

        this.reset();
    }

    reset() {
		this.ang = 0;
		this.shotLife = 0;
	}

    move() {
        if(this.shotLife > 0) {
			this.shotLife--;
			super.move();
		}
    }
}