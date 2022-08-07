var goal = Math.ceil(Math.random() * 2 + 1);
switch (goal) {
    case 1:
        levels.boss.left = 'goal';
        break;
    case 2:
        levels.boss.right = 'goal';
        break;
    case 3:
        levels.boss.up = 'goal';
        break;
}

console.log(levels['boss']);