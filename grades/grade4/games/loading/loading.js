let answer;
let score = 0;


function setTask(){
    let endMinutes = getRandomInteger(1, 24*60);
    let nowMinutes = getRandomInteger(0, endMinutes-1);
    let leftMinutes = endMinutes - nowMinutes;

    let vars = [nowMinutes, leftMinutes, endMinutes];

    let unknownVarNum = getRandomInteger(1, 2);
    answer = vars[unknownVarNum];
    vars[unknownVarNum] = 0;

    for (let i = 0; i < 3; i++){
        let m = vars[i] % 60;
        let h = (vars[i] - m) / 60;

        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;

        document.getElementById(`h${i}`).innerText = h;
        document.getElementById(`m${i}`).innerText = m;
    }
    document.getElementById(`h${unknownVarNum}`).innerHTML = `
        <input id="hInput" type="text">`;
    document.getElementById(`m${unknownVarNum}`).innerHTML = `
        <input id="mInput" type="text">`;
}


function checkAnswer(){
    let h = Number(document.getElementById('hInput').value);
    let m = Number(document.getElementById('mInput').value);

    if (h >= 0 && 
        m >= 0 && m < 60 && 
        h * 60 + m == answer) {
        score++;
        setTask();
    } else if (score > 0) score--;

    document.getElementById('score').innerText = score;
}

