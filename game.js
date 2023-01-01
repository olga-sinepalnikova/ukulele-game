var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

// Для пиксельной графики
context.msImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

var gamemode = 'map'; // 0/map - бродилка по карте, 1/battle - бой с врагами, 2/cutscene - катсцена, 3/menu - менюшки, 4/chooseEnemy - выбор врага
var lastGamemode = gamemode;
var gamemodeText = document.getElementById('gamemode');
var enemies = undefined;
var boss = undefined;

function startGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBG();
    if (Array.isArray(enemies)) {
        if (enemies.length > 0) {
            if (enemies[currentEnemy]) {
                // enemy_hp.innerHTML = `Враг - ${enemies[currentEnemy].health} || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;
            }
        }

    } else {
        // enemy_hp.innerHTML = `Враг - ??? || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;
    }

    // gamemodeText.innerText = gamemode;
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
            // gameText.innerText = 'The end, обновите страницу для новой игры';
            break;
    }

    if (ableToActCheck()) {
        if (noteElem.innerText == actions.map.enterMenu && gamemode != 'battle') gamemode = 'menu';
    }

    window.requestAnimationFrame(startGame);
}

function mapMode() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBG();
    if (!customizing) player.move();  // если игрок не в настройках -> двигаться
    player.draw();

    // убрать перед выпуском
    // if (ableToActCheck() && noteElem.innerText == actions.map.enterBattle) {
    //     gamemode = 'chooseEnemy';
    // };

    if (!player.room.read && (player.room == levels['save'] || player.room == levels['save2'])) {
        var userSettings = {
            'duration': durationUserValue,
            'actions': actions,
            'player': player,
        }
        sessionStorage.setItem('settings', JSON.stringify(userSettings));
        gamemode = 'map';
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
            enemies = createEnemiesArray('1 battle');
        };

        gamemode = 'cutscene';
    };

}

function cutsceneMode() {
    player.draw();
    if (enemies) {
        enemies.forEach(enemy => {
            enemy.update(ENEMY_COLOR);
        });
    }

    if (player.room == levels.boss) {
        var boss = new Boss();
        boss.update('black');
        player.x = canvas.width / 2;
        player.y = canvas.height / 2 - player.width / 2;
        enemies = [boss];
        lastGamemode = 'chooseEnemy';
    }

    outputLore(player.room);
}

function menuMode() {
    // тут должы быть настройки (и статы игрока ?)
    context.fillStyle = '#9BC4C6';
    context.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    context.font = "bold 36px Calibri";
    context.fillStyle = "black";
    context.fillText(`Уровень - ${player.level}`, 20, canvas.height * 0.3, canvas.width - 30);
    context.fillText(`Опыт - ${player.xp}/${player.maxXp}`, 20, canvas.height * 0.45, canvas.width - 30);
    context.fillText(`Здоровье - ${player.currentHealth}/${player.maxHealth}`, 20, canvas.height * 0.60, canvas.width - 30);
    context.fillText(`Количество монет - ${player.money}`, 20, canvas.height * 0.75, canvas.width - 30);

    context.font = "bold 24px Calibri";
    context.fillText(`Вернуться к игре [${actions.menu.exit}]`, canvas.width * 0.6, canvas.height * 0.9)

    // gameText.innerText = `Чтобы выйти сыграйте В`;
    if (ableToActCheck()) {
        switch (noteElem.innerText) {
            case actions.menu.exit:
                gamemode = 'map';
                break;
        }
    }
}