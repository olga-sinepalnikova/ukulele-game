var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

context.clearRect(0, 0, canvas.width, canvas.height);

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var keyboard = '' ; 

/* класть ноты в буфер, если больше 3-4 одинаковых подряд , то ставить истину\
	(12 нот, добваь клавиш) */

document.addEventListener('keydown', function(e) {
	switch(e.key){
		case 'ArrowUp': 
			keyboard = 'up';
			break;
		case 'ArrowDown':
			keyboard = 'down';
			break;
		case 'ArrowRight':
			keyboard = 'right';
			break;
		case 'ArrowLeft':
			keyboard = 'left';
			break;
		default: 
			console.log('not arrow');
	};
	console.log(keyboard);
});

document.addEventListener('keyup', function(e) {
	keyboard = '';
});

class Arrow{
	constructor(note, color, x){
		this.note = note;
		this.color = color;
		this.x = x;
		this.y = 330;
		this.height = 30;
		this.width = 20;
	}

	place(){
		console.log(this.x, this.y);
	}

	draw(){
		context.fillStyle = this.color;
		context.beginPath();
		context.rect(this.x, this.y, this.width, this.height);
		context.fill();
		context.closePath();
	}

	move(){
		if (this.y > 10){
			this.y -= 1;
		}
	}

};

var arrowArray = [];
const fakeSong = ['left', 'up', 'right', 'down'];
for (let i = 1; i <= 4; i++){
	arrowArray.push(new Arrow(fakeSong[i - 1], 'red', i * 40));
	console.log(arrowArray);
};

// создание всех нот в setTimeout с одинаковым откладываем (посмотри ритм сколько миллисекунд)
// список с нотами (?)

setTimeout(() => {
	for (let i = 1; i <= 4; i++){
	arrowArray.push(new Arrow(fakeSong[i - 1], 'red', i * 40));
	console.log(arrowArray);
};
}, 1000);

var accuracy = 0;
function detectAccuracy(y_of_elem){
	if (40 > y_of_elem && y_of_elem > 10){
		accuracy = 1;
	} else if (90 > y_of_elem && y_of_elem >= 40) {
		accuracy = 0.5;
	} else if (120 > y_of_elem && y_of_elem >= 90) {
		accuracy = 0.1;
	} else {
		accuracy = 0;
	};
	console.log(accuracy);
};
/* учитывать - направление, индекс -> брать наименьший индекс*/
function arrowsHandler(){
	for (let i = 0; i < arrowArray.length; i++){
		if (arrowArray[i]) {
			arrowArray[i].draw();
			arrowArray[i].move();
		};

	};

	for (let i = 0; i < arrowArray.length; i++){
		if (arrowArray[i]) {
			if (arrowArray[i].y == 10){
				delete arrowArray[0];
				arrowArray = arrowArray.filter(element => element != null);
			};
	
			if (keyboard == arrowArray[i].note) {
				detectAccuracy(arrowArray[i].y);
				delete arrowArray[0];
				arrowArray = arrowArray.filter(element => element != null);
				console.log(arrowArray);
			};
		};
	};
};

function animate(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	arrowsHandler();
	requestAnimationFrame(animate);
};
animate();