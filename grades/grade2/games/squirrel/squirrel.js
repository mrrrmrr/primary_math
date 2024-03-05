let answer, wrongNum = 0, rightNum = 0;
let frog = false;


function setTask(){
    let vars = [getRandomInteger(2, 9), getRandomInteger(2, 9)];
    answer = vars[0] * vars[1];

    for (let i = 0; i < 2; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
    document.getElementById('input').value = "";
}

function checkAnswer() {
    if (document.getElementById('input').value == answer){
        rightNum++;
        document.getElementById('right').textContent = rightNum;
        setTask();
    } else {
        wrongNum++;
        document.getElementById('wrong').textContent = wrongNum;
    }
}


setInterval(function (){
    if (!frog && getRandomInteger(0, 2) == 1){
        console.log("Должна появиться лягушка")
        frogElement = document.createElement('img');
        frogElement.setAttribute('src', `images/frog.gif${"?" + Date.now()}`);
        frogElement.setAttribute('id', "frog");
        document.getElementById("window").prepend(frogElement);

        frog = true;
        setTimeout(function (){
            document.getElementById("frog").remove();
            frog = false;
        }, 7000);
    }
}, 3000)