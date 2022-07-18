var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function WorldScene() {
            Phaser.Scene.call(this, { key: 'WorldScene' });
        },
    preload: function () {

    },
    create: function () {
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('map', 'tiles');

        var grass = map.createLayer('Grass', tiles, 0, 0);
        var edge = map.createLayer('Edge', tiles, 0, 0);

        map.setCollisionByExclusion([-1]);
        // console.log(edge);
        this.player = this.physics.add.sprite(50, 100, 'player');
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player, edge);

        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for (var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // x, y, width, height
            this.spawns.create(x, y, 20, 20);
        }
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
        this.sys.events.on('wake', this.wake, this);
    },
    update: function (time, delta) {
        this.player.body.setVelocity(0);
        if (!keyboardDown && duration >= MIN_DURATION) {
            // горизонтальное перемещение
            if (noteElem.innerText == actions.map.left) {
                this.player.body.setVelocityX(-900);
            }
            else if (noteElem.innerText == actions.map.right) {
                this.player.body.setVelocityX(900);
            }

            // вертикальное перемещение
            if (noteElem.innerText == actions.map.up) {
                this.player.body.setVelocityY(-900);
            }
            else if (noteElem.innerText == actions.map.down) {
                this.player.body.setVelocityY(900);
            }
        }


    },
    onMeetEnemy: function (player, zone) {
        // начало боя
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        this.cameras.main.shake(300);

        this.scene.switch('BattleScene');
    },
    wake: function () {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    },

});