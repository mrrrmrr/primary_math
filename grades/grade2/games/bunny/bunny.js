let answer, score = 0;


function setTask(){
    let vars = [getRandomInteger(1, 99), getRandomInteger(1, 99)];
    answer = vars[0] + vars[1];

    for (let i = 0; i < 2; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
    document.getElementById('input').value = '';
}


function showScore(){
    for (let i = 0; i < 5; i++){
        document.getElementById(`img${i}`).hidden = true;
    }

    let n = score % 5;
    document.getElementById(`img${n}`).hidden = false;

    document.getElementById('score').innerText = (score - n) / 5;
}


function checkAnswer() {
    if (document.getElementById('input').value == answer) {
        score++;
        setTask();
    } else score -= score % 5;

    showScore();
}


showScore();
