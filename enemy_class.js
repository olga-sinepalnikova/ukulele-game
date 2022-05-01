class Enemy {
    constructor(level) {
        this.width = 0;
        this.heigth = 0;
        this.x = 0;
        this.y = 0;
        this.level = level;
        this.damage = 10;
        this.health = Math.floor(level * (Math.random() * (level * 10 - 11) + 10));
        this.chanceOfInstantDeath = 0.1;
    }

    attack() {
        player.health -= Math.floor((this.level * this.damage) / 2);
    }

    block() {
        // chance of block 3 of player.damage / enemy.level 25-75%
    }

    update() {
        // animation-loop
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    takeDamage(damage) {

    }
}

var enemy_one = new Enemy(100);