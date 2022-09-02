var strokes = true;
var x_pos = 15;

var line = 0;

function outputLore(currentRoom) {
    context.font = "bold 36px Calibri";
    context.fillStyle = "black";
    var text_lore = currentRoom.text.split('\n');


    if (ableToActCheck()) {
        if (noteElem.innerText == actions.cutscene.nextPhrase) {
            if (line < player.room.text.split('\n').length - 1) {
                line++;
            } else {
                currentRoom.read = true;
                gamemode = lastGamemode;
                context.clearRect(0, 0, canvas.width, canvas.height);
                line = 0;
                if (player.room == levels.startRoom) {
                    let mapImage = document.getElementById("map_image");
                    mapImage.style.display = 'block';
                }
            }
        } else if (noteElem.innerText == actions.cutscene.skip) {
            currentRoom.read = true;
            gamemode = lastGamemode;
            context.clearRect(0, 0, canvas.width, canvas.height);
            line = 0;
            if (player.room == levels.startRoom) {
                let mapImage = document.getElementById("map_image");
                mapImage.style.display = 'block';
            }
        }
    }

    text_lore.forEach(line => { line.trimStart(); })

    context.fillText(text_lore[line], 15, canvas.height * 0.8, canvas.width - 30);

    context.font = "bold 24px Calibri";
    context.fillText(`[далее - ${actions.cutscene.nextPhrase}]`, canvas.width * 0.5, canvas.height * 0.95, canvas.width - 30);
    context.fillText(`[пропустить - ${actions.cutscene.skip}]`, canvas.width * 0.7, canvas.height * 0.95, canvas.width - 30);
    // console.log(text_lore);
};
