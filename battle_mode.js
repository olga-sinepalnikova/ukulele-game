var attackedEnemy = undefined;
var step = true;  // true - player, false - enemies
var earnedXpInBattle = 0;
var earnedMoneyInBattle = 0;
function battleMode() {
    let act = actions.battle;
    enemies.forEach(enemy => {
        if (enemy) {
            enemy.update(ENEMY_COLOR);
        }
    });
    if (enemies[currentEnemy]) enemies[currentEnemy].update(CURRENT_ENEMY_COLOR);
    player.draw();
    displayAbilities();

    if (player.currentHealth > 0 && enemies.length > 0) {
        if (ableToActCheck() && step && attackedEnemy) {
            // console.log(enemies);
            switch (noteElem.innerText) {
                case act.fire:
                    step = player.magic(attackedEnemy, 'fire');
                    break;
                case act.fire:
                    step = player.magic(attackedEnemy, 'ice');
                    break;
                case act.plants:
                    step = player.magic(attackedEnemy, 'plants');
                    break;
                case act.hit:
                    step = player.attack(attackedEnemy, 'hit');
                    break;
                case act.strongHit:
                    step = player.attack(attackedEnemy, 'strongHit');
                    break;
                case act.healing:
                    step = player.healing();
                    break;
                case act.block:
                    player.block(attackedEnemy.attack());
                    step = true; // так как в блоке в любом случае принимается урон
                    break;
            };

        } else if (!step && !ableToActCheck() && attackedEnemy) {
            console.log('enemy attack');
            enemies.forEach((enemy, index) => {
                if (enemy.health > 0) {
                    player.takeDamage(enemy.attack());
                    if (enemies[0].stepBeforeSpawn) {
                        player.takeDamage(boss.attack());
                    }
                } else {
                    console.log(enemy);
                    let earned = enemy.die();
                    earnedXpInBattle += earned[0];
                    earnedMoneyInBattle += earned[1];
                    enemies.splice(index, 1)
                };
            });
            gamemode = 'chooseEnemy';
            step = true;

        } else if (!attackedEnemy) {
            gamemode = 'chooseEnemy';
            step = true;
        };

    } else if (player.currentHealth <= 0) {
        gamemode = 'end';

    } else {
        enemies = undefined;
        gamemode = 'map';
        step = true;
    };
};

function selectColor(skillType, x, y) {
    Object.entries(skillType).forEach(([skill, args]) => {
        context.font = "bold 20px Calibri";

        var learned = args[0];
        var skillName = args[1];

        if (learned) {
            context.fillStyle = AVAILABLE_ABILITY_COLOR;
        } else {
            context.fillStyle = UNAVAILABLE_ABILITY_COLOR;
        };

        context.fillText(skillName + ` [${actions.battle[skill]}]`, x, y, canvas.width - 30);
        y += 25;
    });

}

function displayAbilities() {
    var y = canvas.height * 0.7;
    selectColor(player.magicSkills, canvas.width * 0.5, y);

    y = canvas.height * 0.7;
    selectColor(player.fightSkills, 15, y);
}


// document.addEventListener('keydown', (e) => {
//     switch (e.key) {
//         case 'ArrowDown':
//             step = false;
//             break;
//         case 'ArrowUp':
//             gamemode = lastGamemode;
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             line = 0;
//             break;
//         case 'ArrowLeft':
//             attackedEnemy = enemies[currentEnemy];
//             player.takeDamage(boss.attack());
//             break;
//         case 'ArrowRight':
//             currentEnemy++;
//             break;

//     }

// })