//EVERYTHING IS A LIE
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
        read: false, //false
    },
    lvl1_room2: {
        left: 'startRoom',
        right: 'lvl1_room3',
        difficult: 'easy',
        text: `О! Твой первый бой
Ты пока совсем слабый...
Попробуй просто ударить кулаком
Выбери врага с помощью ${actions.chooseEnemy.choose}
И сыграй ${actions.battle.hit}`,
        read: false, //false
    },
    lvl1_room3: {
        left: 'lvl1_room2',
        // right: 'shop',
        up: 'save',
        difficult: 'easy',
        text: `Ты уже заметил свои умения
Ноты для активации указаны рядом в []
Доступные отмечены синим,
а те что закрыты - серым`,
        read: false,
    },
    //     shop: {
    //         left: 'lvl3_room3',
    //         text: `Здравствуй, странник
    // Знаю, странное место для магазина
    // Но многим героям нужно оружие
    // Мой брат держит лавку недалеко
    // Можешь заглянуть к нему по пути
    // Я видел у него несколько мечей,
    // которые подойдут тебе`,
    //         read: false,
    //     },
    save: {
        up: 'lvl3_room3',
        down: 'lvl1_room3',
        text: `Здесь у нас лагерь
Ты можешь отдохнуть тут
А также сохраниться
Но помни, что тебя ждет принцесса`,
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
        // up: 'shop2',
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
        text: `Ещё один...
А я только хотел отдохнуть
Ладно, давай разберёмся побыстрее`,
        read: false,
    },
    //     shop2: {
    //         down: 'lvl3_room4',
    //         text: `Привет, тебя прислал брат?
    // Так вот, я не продаю мечи
    // Не знаю зачем он врет
    // Но у меня полно брони`,
    //         read: false,
    //     },
    goal: {
        text: `Ох, слава небесам!
Кто-то смог одолеть того монстра
Но... Ты же бард...
Это будет позором даже для меня
Вот, держи ленту
Скажешь, что не смог пройти
И что еле унёс ноги`,
        read: false,
    },
    trap: {
        text: `Муахахахахахахааххаахаха
Ты попал в мою ловушку!
Теперь я отправлю тебя в начало
И заберу всё что ты заработал`
    }
}