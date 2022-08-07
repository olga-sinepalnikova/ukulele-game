//на новых строках не добавлять табы
var levels = {
    lvl0_room1: {
        up: 'lvl1_room2',
        difficult: 'easy',
        text: '',
        read: false,
    },
    startRoom: {
        right: 'lvl1_room2',
        text: `Привет, путник! Тоже пришел спасти принцессу?
Секунду... Ты же... Бард...
Ну, это явно не моя проблема
Держи ноты и карту. Давай попробуем пройтись
Вверх - ${actions.map.up}, Вниз - ${actions.map.down}, Влево - ${actions.map.left}, Вправо - ${actions.map.right}
В любой момент ты можешь изменить управление`,
        read: false,

    },
    lvl1_room2: {
        left: 'startRoom',
        right: 'lvl1_room3',
        difficult: 'easy',
        text: '',
        read: false,

    },
    lvl1_room3: {
        left: 'lvl1_room2',
        right: 'shop',
        up: 'save',
        difficult: 'easy',
        text: '',
        read: false,

    },
    shop: {
        left: 'save',
        text: '',
        read: false,

    },
    save: {
        up: 'lvl3_room3',
        down: 'lvl1_room3',
        text: '',
        read: false,

    },
    lvl3_room1: {
        right: 'save2',
        difficult: 'medium',
        text: '',
        read: false,

    },
    save2: {
        left: 'lvl3_room1',
        right: 'lvl3_room3',
        up: 'boss',
        text: '',
        read: false,

    },
    lvl3_room3: {
        left: 'save2',
        right: 'lvl3_room4',
        down: 'save',
        difficult: 'medium',
        text: '',
        read: false,

    },
    lvl3_room4: {
        left: 'lvl3_room3',
        up: 'shop2',
        difficult: 'medium',
        text: '',
        read: false,

    },
    boss: {
        left: 'trap',
        right: 'trap',
        down: 'save',
        up: 'trap',
        difficult: 'boss',
        text: '',
        read: false,

    },
    shop2: {
        down: 'lvl3_room4',
        text: '',
        read: false,

    }
}