var bg = new Image();

bg.onload = function () {
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
};

var sides = ['left', 'up', 'right', 'down'];
function drawBG() {
    var source = '';
    sides.forEach(side => {
        if (player.room[side]) {
            source += '-' + side;
        }
    });

    bg.src = `imgs/bgs/map${source}.png`;
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
}