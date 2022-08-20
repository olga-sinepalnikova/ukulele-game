var settingsUser = document.getElementById('settings');
var durationUserValue = document.querySelector("input#durationUser").value;
var settingsText = document.getElementById('settingsText').innerHTML;

var mapUp = document.querySelector('select#mapModeUp');
var mapLeft = document.querySelector('select#mapModeLeft');
var mapDown = document.querySelector('select#mapModeDown');
var mapRight = document.querySelector('select#mapModeRight');
var mapEnterMenu = document.querySelector('select#mapModeInMenu');
var mapEnterBattle = document.querySelector('select#mapModeInBattle');

var battleFire = document.querySelector('select#battleModeFire');
var battleIce = document.querySelector('select#battleModeIce');
var battlePlants = document.querySelector('select#battleModePlants');
var battleHit = document.querySelector('select#battleModeHit');
var battleStrongHit = document.querySelector('select#battleModeStrongHit');
var battleHealing = document.querySelector('select#battleModeHealing');
var battleBlock = document.querySelector('select#battleModeBlock');

var chooseUp = document.querySelector('select#chooseModeUp');
var chooseDown = document.querySelector('select#chooseModeDown');
var chooseChoose = document.querySelector('select#chooseModeChoose');


document.addEventListener('keydown', (e) => {
    if (gamemode == "menu" || gamemode == "map") {

        switch (e.key) {
            case 's':
            case 'ы':
                console.log('wkwk');
                if (settingsUser.style.display == 'block') {
                    customizing = false;

                    settingsUser.style.display = 'none';
                } else {
                    customizing = true;
                    settingsUser.style.display = 'block';
                }
                break;
            case 'd':
            case 'в':
                customizing = false;
                settingsUser.style.display = 'none';
                clearSettings();
                break;
        }
    }
});

var instrument;
function getInstrument(inst) {
    if (inst == 'custom') {
        if (settingsUser.style.display == 'block') {
            settingsUser.style.display = 'none';
        } else {
            settingsUser.style.display = 'block';
        }
    } else {

    }
    instrument = inst;
    console.log(inst);
}

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
        fireball: 'A',
        iceball: 'B',
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
    },
    cutscene: {
        skip: 'E',
        nextPhrase: 'C',
    }
}


var gameText = document.getElementById('game_text');

function areNotEqual(...vars) {
    return vars.filter((e, i) => vars.indexOf(e) === i).length === vars.length;
}

var last = sessionStorage.getItem(settings);
console.log(last);
console.log(sessionStorage.settings);
if (last) {

    actions = JSON.parse(last.settings.actions);
}

var customizing = false;
function enableUserSettings() {


    settingsUser.style.display = 'block';

    if (areNotEqual(mapUp.value, mapLeft.value, mapDown.value, mapRight.value, mapEnterMenu.value, mapEnterBattle.value)) {
        if (areNotEqual(battleFire.value, battleIce.value, battlePlants.value, battleHit.value, battleStrongHit.value, battleHealing.value, battleBlock.value)) {
            if (areNotEqual(chooseUp.value, chooseDown.value, chooseChoose.value)) {
                durationUserValue = document.querySelector("input#durationUser").value;
                if (durationUserValue < 5 || !durationUserValue) {
                    durationUserValue = MIN_DURATION;
                }

                actions.map.up = mapUp.value;
                actions.map.left = mapLeft.value;
                actions.map.down = mapDown.value;
                actions.map.right = mapRight.value;
                actions.map.enterMenu = mapEnterMenu.value;
                actions.map.enterBattle = mapEnterBattle.value;

                actions.battle.fireball = battleFire.value;
                actions.battle.iceball = battleIce.value;
                actions.battle.plants = battlePlants.value;
                actions.battle.hit = battleHit.value;
                actions.battle.strongHit = battleStrongHit.value;
                actions.battle.healing = battleHealing.value;
                actions.battle.block = battleBlock.value;

                actions.chooseEnemy.up = chooseUp.value;
                actions.chooseEnemy.down = chooseDown.value;
                actions.chooseEnemy.choose = chooseChoose.value;


                var userSettings = {
                    'MIN_DURATION': durationUserValue,
                    'actions': actions,
                    'player': player,
                }
                settingsText = `Окей, так можно
                Настройки пропадут через 5с`;
                sessionStorage.setItem('settings', JSON.stringify(userSettings));
                setTimeout(() => {
                    settingsUser.style.display = 'none';
                    customizing = false;
                }, 5000);


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