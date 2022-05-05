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

var gameText = document.getElementById('game_text');

function ableToActCheck() {
    return !keyboardDown && duration >= MIN_DURATION;
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
    } else if (smallBuffer.length == 1 && duration >= MIN_DURATION) {
        if (!keyboardDown) {
            // console.log(`u r in else if, your note is ${currentNote}, and buffer is`, smallBuffer);
            keyboardDown = false;
        }
        // console.log(noteAct, 'else if', smallBuffer - 1);
    } else if (duration >= MIN_DURATION) {
        keyboardDown = false;
        // console.log('back to false', playingNote);
        smallBuffer.splice(0, smallBuffer.length - 1);
    };
    // console.log(keyboardDown);
}

var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

var gamemode = 'map'; // 0/map - бродилка по карте, 1/battle - бой с врагами, 2/cutscene - катсцена, 3/menu - менюшки
var gamemodeText = document.getElementById('gamemode');

function startGame() {
    enemy_hp.innerHTML = `Враг - ??? || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;

    gamemodeText.innerText = gamemode;
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

    if (ableToActCheck()) {
        if (noteElem.innerText == 'A#' && gamemode != 'battle') gamemode = 'menu';
    }

    window.requestAnimationFrame(startGame);
}

function mapMode() {
    gameText.innerText = `Вы на карте! Чтобы войти в меню - сыграйте А#, чтобы войти в бой - Е
    для передвижения используйте D - вверх
                          F - влево,
                          F# - вниз,
                          G - вправо`;
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    player.draw();
    if (ableToActCheck() && noteElem.innerText == 'E') {
        var enemies = [new Enemy(2, 20), new Enemy(4, 60), new Enemy(10, 100)];
        gamemode = 'battle';
    }
}

function chooseEnemy() {
    var currentEnemy = 0;
    switch (noteElem.innerText) {
        case 'A':
            if (currentEnemy++ <= enemies.length) {
                currentEnemy++;
            } else {
                currentEnemy = 0;
            };
            break;
        case 'E':
            if (currentEnemy-- >= 0) {
                currentEnemy--;
            } else {
                currentEnemy = enemies.length;
            };
            break;
        case 'A#':
            return enemies[currentEnemy];
    };
}
var step = true;  // true - player, false - enemies
function battleMode() {
    enemies.forEach(enemy => {
                enemy.update();
            });
    gameText.innerText = `Вы в бою! Магические умения: А - огонь ${player.magicSkills.fireball},
    В - лёд ${player.magicSkills.iceball},
    С - растения ${player.magicSkills.plants},
    F - лечение ${player.magicSkills.healing}

    Боевые умения: D - удар,
    E - сильный удар ${player.fightSkills.strongHit},
    G - блок
    Чтобы выйти из боя - убейте врага`;
    if (player.currentHealth > 0 && enemies.length > 0) {
        let attackedEnemy = chooseEnemy();
        if (ableToActCheck() && step) {
            console.log(step);

            // A - огонь, B - лёд, C - растения, D - удар, E - сильный удар, F - лечение, G - блок
            switch (noteElem.innerText) {
                case 'A':
                    player.magic(attackedEnemy, 'fire');
                    step = false;
                    break;
                case 'B':
                    player.magic(attackedEnemy, 'ice');
                    step = false;
                    break;
                case 'C':
                    player.magic(attackedEnemy, 'plants');
                    step = false;
                    break;
                case 'D':
                    player.attack(attackedEnemy, 'hit');
                    step = false;
                    break;
                case 'E':
                    player.attack(attackedEnemy, 'strongHit');
                    step = false;
                    break;
                case 'F':
                    player.healing();
                    step = false;
                    break;
                case 'G':
                    player.block(attackedEnemy.attack);
                    step = true; // так как в блоке в любом случае принимается урон
                    break;
            }
        } else if (!step && !ableToActCheck()) {
            console.log('enemy attack');
            enemies.forEach(enemy => {
                if (enemy.health > 0) {
                    player.takeDamage(enemy.attack());
                } else {
                    enemies.splice(enemy)
                }
            });

            step = true;
        }
    } else {
        gamemode = 'map';
        step = true;
    }
}

function cutsceneMode() {
    // запускать гифку 
}

function menuMode() {
    // тут должы быть настройки (и статы игрока ?)
    gameText.innerText = `Вы в меню! Тут пока ничего нет, чтобы выйти сыграйте В`;
    if (ableToActCheck() && noteElem.innerText == 'B') {
        gamemode = 'map';
    }
}

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
