class Enemy {
    constructor(level, y, x = 10) {
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.level = level;
        this.damage = 10;
        this.health = Math.floor(level * (Math.random() * (level * 10 - 11) + 10));
        this.chanceOfInstantDeath = 0.1;
    }

    attack() {
        return Math.floor((this.level * this.damage) / 2);
    }

    block(dmg) {
        let chance = Math.random();
        if (chance > 0.7) {
            this.health -= Math.ceil(dmg * (Math.random() * 0.75 + 0.75));
        } else if (chance > 0.5) {
            this.health -= Math.ceil(dmg * (Math.random() * (0.75 - 0.5 + 1) + 0.5));
        } else if (chance > 0.25) {
            this.health -= Math.ceil(dmg * (Math.random() * (0.75 - 0.25 + 1) + 0.25));
        }
        // chance of block 3 of player.damage / enemy.level 25-75%
    }

    update(color) {
        // animation-loop
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    die() {
        let earnedXp = this.level * Math.floor(Math.random() * 5 + 5);
        // игрок получает (от 5 до 10 ед опыта) * на уровень

        let earnedMoney = this.level * Math.floor(Math.random() * (10 - 3 + 1) + 3);
        // игрок получает (от 3 до 10 монет) * на уровень

        player.xpUp(earnedXp, earnedMoney);
        return [earnedXp, earnedMoney];
    }
}

function createEnemiesArray(difficulty) {
    //посмотреть как настроить к сложности
    let count = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    let enemiesArray = [];
    let y = 20


    switch (difficulty) {
        case 'boss':
            for (let i = 0; i < count; i++) {
                enemiesArray[i] = new Enemy(Math.floor(Math.random() * (40 - 1 + 30) + 30), y, 100)
                y += 40;
            }
            break;
        case 'medium':
            for (let i = 0; i < count; i++) {
                enemiesArray[i] = new Enemy(Math.floor(Math.random() * (29 - 1 + 10) + 10), y, 100)
                y += 40;
            }
            break;
        case 'easy':
            for (let i = 0; i < count; i++) {
                enemiesArray[i] = new Enemy(Math.floor(Math.random() * (9 - 1 + 1) + 1), y, 100)
                y += 40;
            }
            break;

    }
    return enemiesArray;
    // return [new Enemy(2, 20)];

    // return [new Enemy(2, 20), new Enemy(4, 60), new Enemy(3, 100)];
}
var enemy_hp = document.getElementById('enemy_hp');
enemy_hp.innerHTML = `Враг - ??? || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;
