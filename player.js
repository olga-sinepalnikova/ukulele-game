var PlayerCharacter = new Phaser.Class({
    Extends: Unit,

    initialize:
        function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
            Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
            // зеркально развернем изображение, чтобы не править его в ручную
            this.flipX = true;

            this.setScale(2);
        }
});