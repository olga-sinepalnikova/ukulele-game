var playingNote = {
    'D': false,
    'F': false,
    'F#': false,
    'G': false,
    'C': false,
    'A': false,
};

var smallBuffer = [];
var keyboardDown = false;
var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');


class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (!keyboardDown) {
            switch (noteElem.innerText) {
                case 'D':
                    this.y -= this.height;
                    break;
                case 'F':
                    this.x -= this.width;
                    break;
                case 'A':
                    this.y += this.height;
                    break;
                case 'G':
                    this.x += this.width;
                    break;
            }
        }
    }
}

const player = new Player();
player.draw();


// сделать очищение по времени (каждую секунду ?)
function isNotePlaying(currentNote) {
    smallBuffer.push(currentNote);
    if (smallBuffer.length >= 2 && smallBuffer[0] == smallBuffer[1]) {
        // console.log(playingNote, 'changing', smallBuffer);
        smallBuffer.splice(0, smallBuffer.length - 1);
        if (!keyboardDown) {
            // console.log(`your note is ${currentNote}, and buffer is`, smallBuffer);
            keyboardDown = true;
        }
    } else if (smallBuffer.length == 1) {
        if (!keyboardDown) {
            // console.log(`u r in else if, your note is ${currentNote}, and buffer is`, smallBuffer);
            keyboardDown = false;
        }
        console.log(playingNote, 'else if', smallBuffer - 1);
    } else {
        keyboardDown = false;
        // console.log('back to false', playingNote);
        smallBuffer.splice(0, smallBuffer.length - 1);
    };
    // console.log(keyboardDown);
}

/* document.addEventListener('keydown', (e) => {
    if (!keyboardDown) {
        console.log('pressed button');
        keyboardDown = true;
    }
    console.log(e.key);
});
document.addEventListener('keyup', (e) => {
    if (keyboardDown) {
        console.log('lol, unpressed');
        keyboardDown = false;
    }
}); старый тест на реакцию 1 нажатие - 1 действие, даже если зажали*/