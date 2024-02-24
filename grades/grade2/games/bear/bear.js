let answer, score = 0;


function setTask(){
    let sum = getRandomInteger(2, 100);
    let var1 = getRandomInteger(1, sum - 1);
    let var2 = sum  - var1;

    let unknownVarNum = getRandomInteger(0, 2);
    let signNum = getRandomInteger(0, 1);

    let sign = signNum ? '+' : '-';
    let vars = signNum ? [var1, var2, sum] : [sum, var1, var2];

    answer = vars[unknownVarNum];
    vars[unknownVarNum] = '?';

    document.getElementById('sign').textContent = sign
    for (let i = 0; i < 3; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
    document.getElementById(`var${unknownVarNum}`).innerHTML = `<input type="number" id="input">`;
}


function showBear(){
    for (let i = 0; i < 3; i++){
        document.getElementById(`img${i}`).hidden = true;
    }

    let n = score < 3 ? 0 : score < 7 ? 1 : 2;
    document.getElementById(`img${n}`).hidden = false;
}


function checkAnswer() {
    if (document.getElementById('input').value == answer) {
        score++;
        setTask();
    } else {
        score--;
    }

    showBear();
}

showBear();
