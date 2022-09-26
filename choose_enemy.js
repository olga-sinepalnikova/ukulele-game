var currentEnemy = 0;
function chooseEnemy() {
    displayControls();
    if (!player.currentHealth > 0 && !enemies.length > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        showStats();

        player.x = player.lastCoords[0];
        player.y = player.lastCoords[1];
    };

    if (player.currentHealth > 0 && enemies.length > 0) {
        // console.log(enemies);
        enemies.forEach(enemy => {
            enemy.update();
        });
        player.draw();

        if (enemies[currentEnemy]) {
            context.fillStyle = CURRENT_ENEMY_COLOR;
            context.fillRect(enemies[currentEnemy].x - 5, enemies[currentEnemy].y - 5,
                enemies[currentEnemy].width + 10, enemies[currentEnemy].height + 10);

            enemies[currentEnemy].update();
        }

    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        showStats();
    }

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
    };
    // console.log(currentEnemy);
}

function displayControls() {
    y = canvas.height * 0.72;

    context.font = "bold 24px Calibri";
    context.fillStyle = 'black';

    context.fillText(`выбор вверх  [${actions.chooseEnemy.up}]`, 15, y, canvas.width - 30);
    y += 30;
    context.fillText(`подтвердить  [${actions.chooseEnemy.choose}]`, 15, y, canvas.width - 30);
    y += 30;
    context.fillText(`выбор вниз  [${actions.chooseEnemy.down}]`, 15, y, canvas.width - 30);
}

function showStats() {
    // опыт, монеты, уровень
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (player.currentHealth > 0) {
        context.fillStyle = '#20CD2B';  // зеленый 
        context.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
    } else {
        context.fillStyle = '#F02307'; // красный
        context.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
    }

    context.font = "bold 24px Calibri";
    context.fillStyle = 'black';
    console.log(earnedMoneyInBattle, earnedXpInBattle);
    context.fillText(earnedXpInBattle + ' ед. опыта', 30, canvas.height * 0.6, canvas.width - 30);
    context.fillText(earnedMoneyInBattle + ' монет', 30, canvas.height * 0.5, canvas.width - 30);
    context.fillText(`принять [${actions.chooseEnemy.choose}]`, 30, canvas.height * 0.8, canvas.width - 30);

}