class Enemy {
    constructor(level) {
        this.width = 0;
        this.heigth = 0;
        this.x = 0;
        this.y = 0;
        this.level = level;
        this.damage = 10;
        this.health = level * (Math.random() * (level * 10 - 11) + 10)
        this.chanceOfInstantDeath = 0.1;
    }

    attack() {
        player.health -= Math.floor((this.level * this.damage) / 2);
    }

    block() {

    }

    update() {

    }

    takeDamage(damage) {

    }
}