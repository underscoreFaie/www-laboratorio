///
/// Clase que implementa los asteroides
///
export class Asteroid extends Movable {
    constructor(canvas, ctx) {
        super(canvas);
        this.reset();
    }

    reset() {
        this.x= this.canvas.width/2;
        this.y= this.canvas.height/4;
    }

    draw() {

    }

    move() {

    }
}