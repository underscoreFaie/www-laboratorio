///
/// Base para clases que se mueven
///
export class Movable {
    constructor(canvas) {
        this.canvas= canvas;
    }

    move() {
        this.x= this.x + this.speedX;
        this.y= this.y + this.speedY;
        this.handleScreenWrap()
    }

    handleScreenWrap() {
	//Pasar de un extremo de la pantalla a otro
		if(this.x < 0) {
			this.x += this.canvas.width;
		} else if(this.x > this.canvas.width) {
			this.x -= this.canvas.width;
		}
		
		if(this.y < 0) {
			this.y += this.canvas.height;
		} else if(this.y > this.canvas.height) {
			this.y -= this.canvas.height;
		}
	}
}
