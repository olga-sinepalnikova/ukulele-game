class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.color = 'blue';
        this.maxHealth = 100;
        this.currentHealth = 100;
        this.level = 1;
        this.damage = 1;
        this.xp = 0;
        this.maxXp = 100;
        this.magicSkills = {
            fireball: false, // false
            iceball: false, // false
            plants: false, // false
            healing: false, // false
        };
        this.fightSkills = {
            hit: true,
            block: true,
            strongHit: false, //изначально false
        };
        this.inventory = {
            // предмет: [кол-во, эффект (?)]   
        };
    }

    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (!keyboardDown && duration >= MIN_DURATION) {
            if (0 <= (this.y - this.height) && noteElem.innerText == 'D') {
                this.y -= this.height;
            } else if (0 > (this.y - this.height)) {
                this.y = 0;
            }

            if ((this.y + this.height) <= (canvas.height - this.height) && noteElem.innerText == 'F#') {
                this.y += this.height
            } else if ((this.y + this.height) > (canvas.height - this.height)) {
                this.y = canvas.height - this.height;
            }

            if (0 <= (this.x - this.width) && noteElem.innerText == 'F') {
                this.x -= this.width;
            } else if (0 > (this.x - this.width)) {
                this.x = 0;
            }

            if ((this.x + this.width) <= (canvas.width - this.width) && noteElem.innerText == 'G') {
                this.x += this.width
            } else if ((this.x + this.width) > (canvas.width - this.width)) {
                this.x = canvas.width - this.width;
            }
        }
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > canvas.width) {
            this.x = canvas.width - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }

    attack(enemy, type) {
        // type - hit, strongHit
        // enemy is object of class Enemy
        // regular || strong
        switch (type) {
            case 'hit':
                if (this.fightSkills.hit) {
                    enemy.health -= this.damage;
                    return false;
                }

            case 'strongHit':
                if (this.fightSkills.strongHit) {
                    enemy.health -= this.damage * 1.5;
                    return false;
                }
        }
        return true
    }

    block(dmg) {
        let chance = Math.random();
        if (chance > 0.7) { // настроить шанс от уровня
            dmg = Math.floor(dmg - (Math.random() * 0.5 + 0.5));
            console.log(dmg);
            this.takeDamage(dmg);
        } else {
            this.takeDamage(dmg);
        }
        // шанс 1 к (уровень злодея * здоровье игрока) к защите 50-100%
    }

    healing() {
        if (this.magicSkills.healing) {
            if (this.currentHealth + this.maxHealth / 2 < this.maxHealth) {
                this.currentHealth += this.maxHealth / 2;
            } else {
                this.currentHealth = this.maxHealth;
            }
            return false;
        }
        return true;
    }

    magic(enemy, type) {
        // fire || ice || plants
        // дать врагам классы и учитывать при использовании магии?
        console.log(type);
        switch (type) {
            case 'fire':
                if (this.magicSkills.fireball) {
                    // animation + sprite
                    enemy.health -= Math.ceil(10 * (Math.random() * (3 - 0.5) + 0.5));
                    return false;
                }
            case 'ice':
                if (this.magicSkills.iceball) {
                    // animation + sprite
                    enemy.health -= Math.ceil(20 * (Math.random() * (4 - 1) + 1));
                    return false;
                }
            case 'plants':
                if (this.magicSkills.plants) {
                    // animation + sprite
                    enemy.health -= Math.ceil(30 * (Math.random() * (2 - 0.5) + 0.5));
                    return false;
                }
        }
        return true;
    }

    takeDamage(dmg) {
        this.currentHealth -= dmg;
    }

    levelUp() {
        if (this.level <= 10) {
            this.maxHealth += Math.ceil(this.level * 25);
            this.damage += Math.ceil(this.level * 5)
        } else if (10 > this.level <= 50) {
            this.maxHealth += Math.ceil(this.level * 12.5);
            this.damage += Math.ceil(this.level * 3);
        } else {
            this.maxHealth += Math.ceil(this.level * 6.25);
            this.damage += Math.ceil(this.level * 0.5);
        }
        this.currentHealth = this.maxHealth;
        this.level++;

        switch (this.level) {
            case 5:
                this.fightSkills.strongHit = true;
                break;
            case 15:
                this.magicSkills.healing = true;
                break;
            case 20:
                this.magicSkills.fireball = true;
                break;
            case 30:
                this.magicSkills.iceball = true;
                break;
            case 55:
                this.magicSkills.plants = true;
                break;
        }
    }

    xpUp() {
        if (this.xp >= this.maxXp) {
            this.xp -= this.maxXp;
            if (this.level < 10) {
                this.maxXp = this.level * 10 + Math.floor(Math.random() * 25 + 5);
            } else {
                this.maxXp = this.level * 5 + Math.floor(Math.random() * 25 + 5);
            }
            this.levelUp();
        }
    }

};

var player = new Player();
// startGame();

/*  healing test
console.log(player.currnetHealth);
player.takeDamage(80);
console.log(player.currnetHealth);
player.healing();
console.log(player.currnetHealth);
player.healing();
console.log(player.currnetHealth);

stats test
for (let i = 1; i <= 100; i++) {
    player.levelUp();
    console.log(player.level, player.health, player.damage);
} */
