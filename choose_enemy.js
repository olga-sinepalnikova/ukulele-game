var currentEnemy = 0;
function chooseEnemy() {
    if (!player.currentHealth > 0 || !enemies.length > 0) {
        gameText.innerHTML = `Вы победили! для выхода сыграйте A#`;
        // показывать статы за бой
        // showStas();
        player.x = player.lastCoords[0];
        player.y = player.lastCoords[1];
    };

    gameText.innerText = `Вы в бою! Магические умения: А - перемещение выбора на 1 вниз,
    E - перемещение выбора на 1 вверх,
    А# - подтверждение выбора.
    сейчас выбран враг номер - ${currentEnemy + 1} (считая сверху)
    Чтобы выйти из боя - убейте врага`;
    enemies.forEach(enemy => {
        enemy.update();
    });
    player.draw();

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

// function displayAbilities() {
//     y = canvas.height * 0.7;
//     Object.entries(actions.chooseEnemy).forEach(([skill, args]) => {
//         context.font = "bold 20px Calibri";

//         var learned = args[0];
//         var skillName = args[1];
//         if (learned) {
//             context.fillStyle = AVAILABLE;
//         } else {
//             context.fillStyle = UNAVAILABLE;
//         }

//         context.fillText(skillName + ` [${actions.battle[skill]}]`, 15, y, canvas.width - 30);
//         y += 25;
//     })
// }