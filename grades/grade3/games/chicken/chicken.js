let answer1, answer2, score = 0;


function setTask(){
    let var0 = getRandomInteger(1, 99);
    let var1 = getRandomInteger(1, var0);

    answer1 = Math.floor(var0 / var1);
    answer2 = var0 % var1;

    document.getElementById('var0').textContent = var0;
    document.getElementById('var1').textContent = var1;

    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
}


function checkAnswer(){
    if (document.getElementById('input1').value == answer1 && 
        document.getElementById('input2').value == answer2
        ) {
        score += 1;
        setTask();
    }
    else if (score > 0) score -= 1;

    document.getElementById('score').textContent = score;
}