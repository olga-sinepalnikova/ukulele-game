var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function BootScene() {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function () {
        this.load.image('tiles', 'tilesets/map_tileset.png');

        this.load.tilemapTiledJSON('map', 'imgs/maps/map1.json');
        this.load.spritesheet('player', 'sprites_test/player_test_1.png', { frameWidth: 64, frameHeight: 64, spriteWidth: 32, spiteHeight: 32 });
        // здесь будет загрузка ресурсов
    },

    create: function () {
        this.scene.start('WorldScene');
    }
});