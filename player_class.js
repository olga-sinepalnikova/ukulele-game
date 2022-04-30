class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.health = 100;
        this.level = 1;
        this.damage = 1;
        this.exp = 0;
        this.magicSkills = {
            fireball: false,
            iceball: false,
            plants: false,
            healing: false,
        };
        this.fightSkills = {
            hit: true,
            block: true,
            strongHit: false,
        };
        this.inventory = {
            // предмет: [кол-во, эффект (?)]   
        };
    }

    draw() {
        context.fillStyle = 'red';
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

            if ((this.x + this.width) <= (canvas.width - this.width) && noteElem.innerText == 'C') {
                this.x += this.width
            } else if ((this.x + this.width) > (canvas.width - this.width)) {
                this.x = canvas.width - this.width;
            }
        }
    }

    battle() {

    }

    levelUp() {
        if (this.level <= 10) {
            this.health += Math.ceil(this.level * 25);
            this.damage += Math.ceil(this.level * 5)
        } else if (10 > this.level <= 50) {
            this.health += Math.ceil(this.level * 12.5);
            this.damage += Math.ceil(this.level * 3);
        } else {
            this.health += Math.ceil(this.level * 6.25);
            this.damage += Math.ceil(this.level * 0.5);
        }
        this.level++;
    }
};

var player = new Player();

// for (let i = 1; i <= 100; i++) {
//     player.levelUp();
//     console.log(player.level, player.health, player.damage);
// }
