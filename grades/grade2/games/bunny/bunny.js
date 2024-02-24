let answer, score = 0;


function setTask(){
    let vars = [getRandomInteger(1, 99), getRandomInteger(1, 99)];
    answer = vars[0] + vars[1];

    for (let i = 0; i < 2; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
    document.getElementById('input').value = '';
}


function showBunny(){
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
    } else score--;

    showBunny()
}


showBunny();
