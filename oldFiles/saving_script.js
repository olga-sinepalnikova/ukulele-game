var settingsUser = document.getElementById('settings');
var durationUserValue = document.getElementsByTagName("input")[0];
var settingsText = document.getElementById('settingsText').innerText;

// попытка автоматизировать получение селектов
// var mapUp, mapLeft, mapDown, mapEnterBattle, mapEnterMenu, mapRight;
// var list_of_settings = [mapUp, mapLeft, mapDown, mapRight, mapEnterMenu];
// for (let i = 0; i < list_of_settings.length; i++) {
//     list_of_settings[i] = document.getElementsByTagName('select')[i];
//     console.log(list_of_settings);
// }

var mapUp = document.getElementsByTagName('select')[0];
var mapLeft = document.getElementsByTagName('select')[1];
var mapDown = document.getElementsByTagName('select')[2];
var mapRight = document.getElementsByTagName('select')[3];
var mapEnterMenu = document.getElementsByTagName('select')[4];
var mapEnterBattle = document.getElementsByTagName('select')[5];

var battleFire = document.getElementsByTagName('select')[6];
var battleIce = document.getElementsByTagName('select')[7];
var battlePlants = document.getElementsByTagName('select')[8];
var battleHit = document.getElementsByTagName('select')[9];
var battleStrongHit = document.getElementsByTagName('select')[10];
var battleHealing = document.getElementsByTagName('select')[11];
var battleBlock = document.getElementsByTagName('select')[12];

var chooseUp = document.getElementsByTagName('select')[13];
var chooseDown = document.getElementsByTagName('select')[14];
var chooseChoose = document.getElementsByTagName('select')[15];


document.addEventListener('keydown', (e) => {
    if (gamemode == "menu" || gamemode == "map") {
        switch (e.key) {
            case 's':
            case 'ы':
                console.log('wkwk');
                if (settingsUser.style.display == 'block') {
                    settingsUser.style.display = 'none';
                } else {
                    settingsUser.style.display = 'block';
                }
                break;
            case 'd':
            case 'в':
                settingsUser.style.display = 'none';
                clearSettings();
                break;
        }
    }
});



var actions = {
    map: {
        up: 'D',
        left: 'F',
        down: 'F#',
        right: 'G',
        enterBattle: 'E',
        enterMenu: 'A#'
    },
    battle: {
        fire: 'A',
        ice: 'B',
        plants: 'C',
        hit: 'D',
        strongHit: 'E',
        healing: 'F',
        block: 'G'
    },
    chooseEnemy: {
        up: 'E',
        down: 'A',
        choose: 'A#'
    },
    menu: {
        up: 'E',
        down: 'A',
        exit: 'B',
        choose: 'A#',
    }
}


var gameText = document.getElementById('game_text');

console.log('map.down', actions.map.down);
console.log(actions.battle.hit);

function areNotEqual(...vars) {
    return vars.filter((e, i) => vars.indexOf(e) === i).length === vars.length;
}

var last = sessionStorage.getItem(settings);
console.log(JSON.parse(sessionStorage.settings));

function enableUserSettings() {

    settingsUser.style.display = 'block';
    console.log(mapUp.value, mapLeft.value, mapDown.value, mapRight.value, mapEnterMenu.value, mapEnterBattle.value);
    if (areNotEqual(mapUp.value, mapLeft.value, mapDown.value, mapRight.value, mapEnterMenu.value, mapEnterBattle.value)) {
        if (areNotEqual(battleFire.value, battleIce.value, battlePlants.value, battleHit.value, battleStrongHit.value, battleHealing.value, battleBlock.value)) {
            console.log
            if (areNotEqual(chooseUp.value, chooseDown.value, chooseChoose.value)) {
                actions.map.up = mapUp.value;
                actions.map.left = mapLeft.value;
                actions.map.down = mapDown.value;
                actions.map.right = mapRight.value;
                actions.map.enterMenu = mapEnterMenu.value;
                actions.map.enterBattle = mapEnterBattle.value;

                actions.battle.fire = battleFire.value;
                actions.battle.ice = battleIce.value;
                actions.battle.plants = battlePlants.value;
                actions.battle.hit = battleHit.value;
                actions.battle.strongHit = battleStrongHit.value;
                actions.battle.healing = battleHealing.value;
                actions.battle.block = battleBlock.value;

                actions.chooseEnemy.up = chooseUp.value;
                actions.chooseEnemy.down = chooseDown.value;
                actions.chooseEnemy.choose = chooseChoose.value;
                settingsText = `Окей, так можно`;
                sessionStorage.setItem('settings', JSON.stringify(actions));
                setTimeout(() => {
                    settingsUser.style.display = 'none';
                }, 10000);


            } else {
                settingsText = `Вы не можете ставить одинаковые ноты`;

            }

        } else {
            settingsText = `Вы не можете ставить одинаковые ноты`;

        }

    } else {
        settingsText = `Вы не можете ставить одинаковые ноты`;

    }

}

function clearSettings() {
    // console.log(mapDown.querySelector('option[selected]').selected);
    let list_of_settings = [mapDown, mapLeft, mapRight, mapUp, mapEnterBattle, mapEnterMenu, battleBlock, battleFire, battleHealing, battleHit, battleIce,
        battlePlants, battlePlants, battleStrongHit, chooseChoose, chooseDown, chooseUp];
    for (let i = 0; i < list_of_settings.length; i++) {
        list_of_settings[i].querySelector('option[selected]').selected = true;
    }
}