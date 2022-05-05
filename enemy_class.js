class Enemy {
    constructor(level, y) {
        this.width = 20;
        this.height = 20;
        this.x = 10;
        this.y = y;
        this.level = level;
        this.damage = 10;
        this.health = Math.floor(level * (Math.random() * (level * 10 - 11) + 10));
        this.chanceOfInstantDeath = 0.1;
    }

    attack() {
        return this.damage;//Math.floor((this.level * this.damage) / 2));
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

    update() {
        // animation-loop
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    die() {
        player.xp += this.level * Math.floor(Math.random() * 5 + 5);
    }
}

// var dummy = new Enemy(5);
var enemy_hp = document.getElementById('enemy_hp');
enemy_hp.innerHTML = `Враг - ${dummy.health} || Игрок - ${player.currentHealth}, lvl - ${player.level}, exp - ${player.xp}`;