class Arrow{
	constructor(direction, color, x, y){
		this.direction = direction;
		this.color = color;
		this.x = x;
		this.y = y;
	}
	place(){
		console.log(this.x, this.y);
	}
}