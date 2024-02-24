let answer, wrongNum = 0, rightNum = 0;


function setTask() {
    answer = getRandomInteger(0, 12 * 60 - 1);
    document.getElementById('hourArrow').style.transform = `rotateZ(${answer/2}deg)`;
    document.getElementById('minuteArrow').style.transform = 
        `rotateZ(${6 * (answer%60)}deg)`;
    document.getElementById('hoursInput').value = "";
    document.getElementById('minutesInput').value = "";

}


function updateScore() {
    document.getElementById('right').innerText = rightNum;
    document.getElementById('wrong').innerText = wrongNum;
}


function checkAnswer() {
    let h = Number(document.getElementById('hoursInput').value);
    if (h >= 12) h -= 12;

    let m = Number(document.getElementById('minutesInput').value);

    if (h >= 0 && h < 12 && 
        m >= 0 && m < 60 && 
        h * 60 + m == answer) {
        rightNum++;
        setTask();
    } else wrongNum++;

    updateScore();
}