class Boss extends Enemy {
    constructor() {
        super();
        this.width = 60;
        this.height = 60;
        this.x = 20;
        this.y = canvas.height * 0.5 - 30;
        this.damage = player.maxHealth / 2 - 50;
        this.health = 3000;
        this.chanceOfInstantDeath = 0.000000000000000000000001;
    }

    spawnMinions() {
        createEnemiesArray('boss');
    }

    attack() {
        return (this.damage + (Math.ceil(Math.random() * (this.damage / 2 - this.damage / 4) + this.damage / 2)));
    }
}

// var boss = new Boss();
// console.log(boss.update());