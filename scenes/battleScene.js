var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BattleScene() {
            Phaser.Scene.call(this, { key: 'BattleScene' });
        },

    create: function () {
        // меняем фон на зеленый
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

        // персонаж игрока - warrior (воин)
        var warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Воин', 100, 20);
        this.add.existing(warrior);

        // персонаж игрока - mage (маг)
        var mage = new PlayerCharacter(this, 250, 100, 'player', 1, 'Маг', 80, 8);
        this.add.existing(mage);

        var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Дракон', 50, 3);
        this.add.existing(dragonblue);

        var dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null, 'Дракон2', 50, 3);
        this.add.existing(dragonOrange);

        // массив с героями
        this.heroes = [warrior, mage];
        // массив с врагами
        this.enemies = [dragonblue, dragonOrange];
        // массив с обеими сторонами, которые будут атаковать
        this.units = this.heroes.concat(this.enemies);

        this.index = -1;

        // Одновременно запускаем сцену UI Scene 
        this.scene.launch('UIScene');
        var timeEvent = this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
        this.sys.events.on('wake', this.wake, this);
    },

    nextTurn: function () {
        if (this.checkEndBattle()) {
            this.endBattle();
            return;
        } do {
            this.index++;
            // if there are no more units, we start again from the first one
            if (this.index >= this.units.length) {
                this.index = 0;
            }
        } while (this.units[this.index].living);

        // if its player hero
        if (this.units[this.index] instanceof PlayerCharacter) {
            this.events.emit("PlayerSelect", this.index);
        } else { // else if its enemy unit
            // pick random hero
            var r = Math.floor(Math.random() * this.heroes.length);
            // call the enemy"s attack function 
            this.units[this.index].attack(this.heroes[r]);
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    },

    checkEndBattle: function () {
        var victory = true;
        // if all enemies are dead we have victory
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for (var i = 0; i < this.heroes.length; i++) {
            if (this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    },

    endBattle: function () {
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for (var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('WorldScene');
    },

    receivePlayerSelection: function (action, target) {
        if (action == 'attack') {
            this.units[this.index].attack(this.enemies[target]);
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    },

    exitBattle: function () {
        this.scene.sleep('UIScene');
        this.scene.switch('WorldScene');
    },

    wake: function () {
        this.scene.run('UIScene');
        this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
    },

});