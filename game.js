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

var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

var gamemode = 'map'; // 0/map - бродилка по карте, 1/battle - бой с врагами, 2/cutscene - катсцена, 3/menu - менюшки, 4/chooseEnemy - выбор врага
var lastGamemode = gamemode;
var gamemodeText = document.getElementById('gamemode');
var enemies = undefined;

function startGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (Array.isArray(enemies)) {
        if (enemies.length > 0) {
            if (enemies[currentEnemy]) {
                enemy_hp.innerHTML = `Враг - ${enemies[currentEnemy].health} || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;
            }
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
            }
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
        case 'end':
            gameText.innerText = 'The end, обновите страницу для новой игры';
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
    if (!customizing) player.move();  // если игрок не в настройках -> двигаться
    player.draw();

    if (ableToActCheck() && noteElem.innerText == actions.map.enterBattle) {
        gamemode = 'chooseEnemy';
    };

    if (player.room == levels['save'] || player.room == levels['save2']) {
        var userSettings = {
            'duration': durationUserValue,
            'actions': actions,
            'player': player,
        }
        sessionStorage.setItem('settings', JSON.stringify(userSettings));
    };

    startCutscene();

    if (!player.room.read && player.room == levels.lvl1_room2) {
        lastGamemode = 'chooseEnemy';
        console.log('tsarted');
        player.x = canvas.width / 2;
        player.y = canvas.height / 2 - player.width / 2;
        if (enemies) {
            enemies.forEach(enemy => {
                enemy.update();
            });
        } else {
            enemies = createEnemiesArray();
        };

        gamemode = 'cutscene';
    };
}

function cutsceneMode() {
    player.draw();
    if (enemies) {
        enemies.forEach(enemy => {
            enemy.update();
        });
    }

    outputLore(player.room);
}

function menuMode() {
    // тут должы быть настройки (и статы игрока ?)
    // gameText.innerText = `Чтобы выйти сыграйте В`;
    if (ableToActCheck()) {
        switch (noteElem.innerText) {
            case actions.menu.exit:
                gamemode = 'map';
                break;
            // case 'A':
            //     enableUserSettings();
        }
    }
}


