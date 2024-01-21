class Boss extends Enemy {
    constructor() {
        super();
        this.width = 60;
        this.height = 60;
        this.x = 20;
        this.y = canvas.height * 0.5 - 30;
        this.damage = 1500 / 2 - 50;
        this.health = 10000;
        this.chanceOfInstantDeath = 0.000000000000000000000001;
        this.stepsBeforeSpawn = 0;
    }

    spawnMinions() {
        return createEnemiesArray('boss');
    }

    attack() {
        if (this.stepsBeforeSpawn == 3) {
            enemies = enemies.concat(this.spawnMinions());
            this.stepsBeforeSpawn = 0;
        } else {
            this.stepsBeforeSpawn++;
        }
        console.log(this.stepsBeforeSpawn);
        return (this.damage + (Math.ceil(Math.random() * (this.damage / 2 - this.damage / 4) + this.damage / 2)));
    }
}

var boss = new Boss();
// console.log(boss.update());