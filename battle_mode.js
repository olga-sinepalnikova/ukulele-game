var attackedEnemy = undefined;
var step = true;  // true - player, false - enemies
function battleMode() {
    let act = actions.battle;
    enemies.forEach(enemy => {
        if (enemy) {
            enemy.update();
        }
    });
    player.draw();
    displayAbilities();

    gameText.innerText = `Вы в бою! Магические умения: А - огонь ${player.magicSkills.fireball},
    В - лёд ${player.magicSkills.iceball},
    С - растения ${player.magicSkills.plants},
    F - лечение ${player.magicSkills.healing}

    Боевые умения: D - удар,
    E - сильный удар ${player.fightSkills.strongHit},
    G - блок
    Чтобы выйти из боя - убейте врага`;

    if (player.currentHealth > 0 && enemies.length > 0) {
        if (ableToActCheck() && step && attackedEnemy) {
            // console.log(enemies);
            // A - огонь, B - лёд, C - растения, D - удар, E - сильный удар,
            //  F - лечение, G - блок
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
                } else {
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

const AVAILABLE = '#17D0C8';
const UNAVAILABLE = '#939393';
function displayAbilities() {
    var y = canvas.height * 0.7;

    Object.entries(player.magicSkills).forEach(([skill, args]) => {
        context.font = "bold 20px Calibri";

        var learned = args[0];
        var skillName = args[1];
        if (learned) {
            context.fillStyle = AVAILABLE;
        } else {
            context.fillStyle = UNAVAILABLE;
        }

        context.fillText(skillName + ` [${actions.battle[skill]}]`, canvas.width * 0.5, y, canvas.width - 30);
        y += 25;
    });

    y = canvas.height * 0.7;
    Object.entries(player.fightSkills).forEach(([skill, args]) => {
        context.font = "bold 20px Calibri";

        var learned = args[0];
        var skillName = args[1];
        if (learned) {
            context.fillStyle = AVAILABLE;
        } else {
            context.fillStyle = UNAVAILABLE;
        }

        context.fillText(skillName + ` [${actions.battle[skill]}]`, 15, y, canvas.width - 30);
        y += 25;
    })
}