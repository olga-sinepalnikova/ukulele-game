var currentSetting = 0;
document.getElementById(currentSetting).style.display = 'flex';

function nextSetting() {
    if (currentSetting + 1 > 2) {
        document.getElementById(currentSetting).style.display = 'none';
        currentSetting = 0;
        document.getElementById(currentSetting).style.display = 'flex';
    } else {
        document.getElementById(currentSetting).style.display = 'none';
        currentSetting++;
        document.getElementById(currentSetting).style.display = 'flex';
    }
}

function prevSetting() {
    if (currentSetting - 1 < 0) {
        document.getElementById(currentSetting).style.display = 'none';
        currentSetting = 2;
        document.getElementById(currentSetting).style.display = 'flex';
    } else {
        document.getElementById(currentSetting).style.display = 'none';
        currentSetting--;
        document.getElementById(currentSetting).style.display = 'flex';
    }
}