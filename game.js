/* Аккорды - действие (могут быть не все задействованы)
    0/map/карта:
        'D': 'up',
        'F': 'left',
        'C': 'right',
        'F#': 'down',
        'B': 'enter',
    1/battle/бой, 3/menu/меню:
        'D': 'up',
        'F': 'left',
        'G': 'right',
        'B': 'down',
        'A': 'select', (item or act or else)
    2/cutscene/катсцена:
        'C': skip 1 dialog,
        'F': skip whole scene,
        'G': next dialog
*/
// var noteAct = {
//     'D': 'up',
//     'F': 'left',
//     'G': 'right',
//     'B': 'down',
//     'F#': 'select',
//     'C': 'back',
//     'A': 'undo',
// };

var smallBuffer = [];
var keyboardDown = false;
const MIN_DURATION = 15;

function durationCheck() {
    return duration >= MIN_DURATION;
}

function isNotePlaying(currentNote) {
    smallBuffer.push(currentNote);
    if (smallBuffer.length >= 2 && smallBuffer[0] == smallBuffer[1]) {
        // console.log(playingNote, 'changing', smallBuffer);
        smallBuffer.splice(0, smallBuffer.length - 1);
        if (!keyboardDown) {
            // console.log(`your note is ${currentNote}, and buffer is`, smallBuffer);
            keyboardDown = true;
        }
    } else if (smallBuffer.length == 1 && durationCheck()) {
        if (!keyboardDown) {
            // console.log(`u r in else if, your note is ${currentNote}, and buffer is`, smallBuffer);
            keyboardDown = false;
        }
        // console.log(noteAct, 'else if', smallBuffer - 1);
    } else if (durationCheck()) {
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


var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

var gamemode = 'map'; // 0/map - бродилка по карте, 1/battle - бой с врагами, 2/cutscene - катсцена, 3/menu - менюшки

function startGame() {
    switch (gamemode) {
        case 'map':
            mapMode();
            break;
        case 'battle':
            battleMode();
            break;
        case 'cutscene':
            cutsceneMode();
            break;
        case 'menu':
            menuMode();
            break;
    }
}

function mapMode() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    player.draw();
    if (!keyboardDown && durationCheck()) {
        if (noteElem.innerText == 'E') {
            gamemode = 'battle';
        }
    }
}

function battleMode() {
    if (player.currentHealth > 0 && enemy_one.health > 0) {
        if (!keyboardDown && durationCheck()) {
            enemy_hp.innerHTML = enemy_one.health;
            console.log(enemy_one.health);
            console.log(player.currentHealth);
            // A - огонь, B - лёд, C - растения, D - удар, E - сильный удар, F - лечение, G - блок
            switch (noteElem.innerText) {
                case 'A':
                    player.magic(enemy_one, 'fire');
                    break;

                case 'B':
                    player.magic(enemy_one, 'ice');
                    break;

                case 'C':
                    player.magic(enemy_one, 'plants');
                    break;
                case 'D':
                    player.attack(enemy_one, 'hit');
                    break;
                case 'E':
                    player.attack(enemy_one, 'strongHit');
                    break;
                case 'F':
                    player.healing();
                    break;
                case 'G':
                    player.block();
                    break;
            }
        }
    } else {
        gamemode = 'map';
    }
}

function cutsceneMode() {
    // запускать гифку 
}

function menuMode() {

}