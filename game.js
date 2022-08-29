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
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!customizing) player.move();  // если игрок не в настройках -> двигаться
    player.draw();

    // убрать перед выпуском
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
                enemy.update(ENEMY_COLOR);
            });
        } else {
            enemies = createEnemiesArray();
        };

        gamemode = 'cutscene';
    };

    if (player.room == levels.boss) {
        var boss = new Boss();
    }
}

function cutsceneMode() {
    player.draw();
    if (enemies) {
        enemies.forEach(enemy => {
            enemy.update(ENEMY_COLOR);
        });
    }

    outputLore(player.room);
}

function menuMode() {
    // тут должы быть настройки (и статы игрока ?)
    gameText.innerText = `Чтобы выйти сыграйте В`;
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