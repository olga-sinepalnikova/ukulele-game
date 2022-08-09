context.font = "bold 36px Calibri";
var strokes = true;
var x_pos = 15;

var line = 0;

function outputLore(currentRoom) {
    context.fillStyle = "black";
    var text_lore = currentRoom.text.split('\n');

    if (ableToActCheck() && noteElem.innerText == 'C') {
        if (line < player.room.text.split('\n').length - 1) {
            line++;
        } else {
            currentRoom.read = true;
            gamemode = lastGamemode;
            line = 0;
        }
    }
    text_lore.forEach(line => { line.trimStart(); })

    context.fillText(text_lore[line], 15, canvas.height * 0.8, canvas.width - 30);
    context.fillText('[C]', canvas.width - 50, canvas.height * 0.95, canvas.width - 30);
    // console.log(text_lore);


};
