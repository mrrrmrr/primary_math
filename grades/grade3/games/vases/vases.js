let answer, score = 0;


function setTask() {
    let var1, var2;
    let mul = 1001;
    while (mul > 1000){
        var1 = getRandomInteger(1, 1000);
        var2 = getRandomInteger(1, 1000);
        mul = var1 * var2;
    }

    let signNum = getRandomInteger(0, 1);
    let sign = signNum ? "×" : ":";
    let vars = signNum ? [var1, var2, mul] : [mul, var1, var2];

    let unknownVarNum = getRandomInteger(0, 2);
    answer = vars[unknownVarNum];
    vars[unknownVarNum] = '?';

    document.getElementById('sign').innerText = sign;
    for (let i = 0; i < 3; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
    document.getElementById(`var${unknownVarNum}`).innerHTML = `
        <input id="input" type="text">`;
}


function checkAnswer() {
    if (document.getElementById('input').value == answer) {
        if (score < 13) {
            score++;
            document.getElementById(`vase${score}`).style.visibility = 'visible';
        }
        setTask();
    }
    else if (score > 0) {
            document.getElementById(`vase${score}`).style.visibility = 'hidden';
            score--;
    }
}
