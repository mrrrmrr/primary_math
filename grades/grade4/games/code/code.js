let answer;
let rightNum = 0, wrongNum = 0;


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function updateScore() {
    document.getElementById('right').innerText = rightNum;
    document.getElementById('wrong').innerText = wrongNum;
}


function setTask() {
    let len, num1;
    answer = 0.1;
    while( !Number.isInteger(answer) || answer == 1  || answer == 0){
        len = getRandomInteger(1, 100);
        num1 = getRandomInteger(0, len);
        answer = num1 * 100 / len;
    }

    let num0 = len - num1;
    let arr = [];
    for (let  i = 0; i < num0; i++){
        arr.push(0);
    }
    for (let  i = 0; i < num1; i++){
        arr.push(1);
    }
    shuffle(arr);

    document.getElementById('code').innerText = arr.join('');
    document.getElementById('input').value = "";
}

function checkAnswer(){
    if (document.getElementById('input').value == answer){
        rightNum++;
        setTask();
    }
    else wrongNum++;

    updateScore();
}
