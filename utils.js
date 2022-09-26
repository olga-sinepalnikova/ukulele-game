//здесь лежат функции, которые используются в game.js (кроме функций основанных на gamemode)
// а также цвета, которые используются позже
//убраны для облегчения чтения
var smallBuffer = [];
var keyboardDown = false;
var MIN_DURATION = 15; // было константой

const CURRENT_ENEMY_COLOR = '#25CC00';
const ENEMY_COLOR = '#ED1B1B';

const AVAILABLE_ABILITY_COLOR = '#17D0C8';
const UNAVAILABLE_ABILITY_COLOR = '#939393';

function ableToActCheck() {
    return !keyboardDown && duration >= MIN_DURATION;
}

function isNotePlaying(currentNote) {
    smallBuffer.push(currentNote);
    if (smallBuffer.length >= 2 && smallBuffer[0] == smallBuffer[1]) {
        smallBuffer.splice(0, smallBuffer.length - 1);
        if (!keyboardDown) {
            keyboardDown = true;
        }

    } else if (smallBuffer.length == 1 && duration >= MIN_DURATION) {
        if (!keyboardDown) {
            keyboardDown = false;
        }

    } else if (duration >= MIN_DURATION) {
        keyboardDown = false;
        smallBuffer.splice(0, smallBuffer.length - 1);
    };
}

function startCutscene() {
    if (!player.room.read && player.room.text) {
        lastGamemode = gamemode;
        gamemode = 'cutscene';
    }
}

// убрать перед финалом
function cheatLevelUp() {
    switch (player.level) {
        case 1:
            player.level = 4;
            break;
        case 5:
            player.level = 14;
            break;
        case 15:
            player.level = 19;
            break;
        case 20:
            player.level = 29;
            break;
        case 30:
            player.level = 54;
            break;
    }
    player.levelUp();
}