let answer, wrong = 0, right = 0;
const wrongElement = document.getElementById("wrong");
const rightElement = document.getElementById("right");


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


function showCompliment(){
    element = document.createElement('img');
    element.setAttribute('src', "images/awesome.gif");
    element.className = "x-center compliment";
    document.body.append(element);

    setTimeout(function(){
        element.remove();
    }, 3000);
}


function checkAnswer() {
    if (document.getElementById('input').value == answer) {
        right++;
        rightElement.innerText = right;

        showCompliment();
        setTask();
    } else {
        wrong++;
        wrongElement.innerText = wrong;
    }

    showBear();
}

showBear();
