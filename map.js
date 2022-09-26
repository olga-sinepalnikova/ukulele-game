var goal = Math.ceil(Math.random() * 2 + 1);
switch (goal) {
    case 1:
        levels.boss.left = 'goal';
        levels.goal.right = 'boss';
        break;
    case 2:
        levels.boss.right = 'goal';
        levels.goal.left = 'boss';
        break;
    case 3:
        levels.boss.up = 'goal';
        levels.goal.down = 'boss';
        break;
}