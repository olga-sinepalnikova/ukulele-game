context.font = "bold 36px Calibri";
var strokes = true;
var x_pos = 15;

var line = 0;

function addLine(maxLine) {
    if (line < maxLine) {
        line++;
    }
}
document.addEventListener('keydown', () => {
    if (line < player.room.text.split('\n').length - 1) {
        line++;
    }
});

function loreOutput() {

    // switch (player.room) {
    //     case (levels.startRoom):
    context.fillStyle = "black";
    var text_lore = levels.startRoom.text.split('\n');
    console.log(text_lore);
    text_lore.forEach(line => { line.trimStart(); })

    context.fillText(text_lore[line], 15, canvas.height * 0.75, canvas.width - 30);

    //         break;

    // };
}

