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

var gamemode = 'map'; // 0/map - бродилка по карте, 1/battle - бой с врагами, 2/cutscene - катсцена, 3/menu - менюшки, 4/chooseEnemy - выбор врага
var gamemodeText = document.getElementById('gamemode');
var enemies = undefined;

function startGame() {
    if (Array.isArray(enemies)) {
        if (enemies.length > 0) {

            enemy_hp.innerHTML = `Враг - ${enemies[currentEnemy].health} || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;
        }

    } else {
        enemy_hp.innerHTML = `Враг - ??? || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;

    }

    gamemodeText.innerText = gamemode;
    switch (gamemode) {
        case 'map':
            mapMode();
            break;
        case 'chooseEnemy':
            if (!enemies) {
                enemies = createEnemiesArray();
            } /* else if (Array.isArray(enemies)) {
                if (enemies.length == 0) {
                    enemies = createEnemiesArray();
                }
            }*/
            chooseEnemy();
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
        if (noteElem.innerText == actions.map.enterMenu && gamemode != 'battle') gamemode = 'menu';
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
    if (ableToActCheck() && noteElem.innerText == actions.map.enterBattle) {
        gamemode = 'chooseEnemy';
    }
}

var currentEnemy = 0;
function chooseEnemy() {
    if (!player.currentHealth > 0 || !enemies.length > 0) {
        gameText.innerHTML = `Вы победили! для выхода сыграйте A#`;
    }
    gameText.innerText = `Вы в бою! Магические умения: А - перемещение выбора на 1 вниз,
    E - перемещение выбора на 1 вверх,
    А# - подтверждение выбора.
    сейчас выбран враг номер - ${currentEnemy + 1} (считая сверху)
    Чтобы выйти из боя - убейте врага`;
    enemies.forEach(enemy => {
        enemy.update();
    });
    if (ableToActCheck()) {
        let act = actions.chooseEnemy;
        switch (noteElem.innerText) {
            case act.down:
                if (currentEnemy + 1 < enemies.length) {
                    currentEnemy += 1;
                } else {
                    currentEnemy = 0;
                };
                break;
            case act.up:
                if (currentEnemy - 1 >= 0) {
                    currentEnemy -= 1;
                } else {
                    currentEnemy = enemies.length - 1;
                };
                break;
            case act.choose:
                console.log(enemies[currentEnemy]);
                gamemode = 'battle';
                attackedEnemy = enemies[currentEnemy];
                break;
        };
    }
    // console.log(currentEnemy);
}

var attackedEnemy = undefined;
var step = true;  // true - player, false - enemies
function battleMode() {
    let act = actions.battle;
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
        if (ableToActCheck() && step) {
            // console.log(enemies);

            // A - огонь, B - лёд, C - растения, D - удар, E - сильный удар, F - лечение, G - блок
            switch (noteElem.innerText) {
                case act.fire:
                    step = player.magic(attackedEnemy, 'fire');
                    // step = false;
                    break;
                case act.fire:
                    step = player.magic(attackedEnemy, 'ice');
                    // step = false;
                    break;
                case act.plants:
                    step = player.magic(attackedEnemy, 'plants');
                    // step = false;
                    break;
                case act.hit:
                    step = player.attack(attackedEnemy, 'hit');
                    // step = false;
                    break;
                case act.strongHit:
                    step = player.attack(attackedEnemy, 'strongHit');
                    // step = false;
                    break;
                case act.healing:
                    step = player.healing();
                    // step = false;
                    break;
                case act.block:
                    player.block(attackedEnemy.attack());
                    step = true; // так как в блоке в любом случае принимается урон
                    break;
            }


        } else if (!step && !ableToActCheck() && attackedEnemy) {
            console.log('enemy attack');
            enemies.forEach(enemy => {
                if (enemy.health > 0) {
                    player.takeDamage(enemy.attack());
                } else {
                    enemies.splice(enemy, 1)
                }
            });
            gamemode = 'chooseEnemy';
            step = true;
        }
    } else {
        enemies = undefined;
        gamemode = 'map';
        step = true;
    }
}

function cutsceneMode() {
    // запускать гифку 
}

function menuMode() {
    // тут должы быть настройки (и статы игрока ?)
    // gameText.innerText = `Чтобы выйти сыграйте В`;
    if (ableToActCheck()) {
        switch (noteElem.innerText) {
            case actions.menu.exit:
                gamemode = 'map';
                break;
            case 'A':
                createUserSettings();
        }
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
