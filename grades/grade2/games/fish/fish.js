let answer;


function setTask(){
    let sum = getRandomInteger(1, 99);
    let var1 = getRandomInteger(1, sum);
    let vars = [sum, var1];
    answer = vars[0] - vars[1];

    for (let i = 0; i < 2; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
    document.getElementById('input').value = '';
}


function addFish() {
    let n = getRandomInteger(1, 15);
    let x = getRandomInteger(0, 70);
    let y = getRandomInteger(0, 70);

    let elem = document.createElement('img');
    elem.setAttribute('src', `images/fish${n}.png`);
    elem.style.left = `${x}%`;
    elem.style.top = `${y}%`;

    document.getElementById('fish').append(elem);
}


function removeFish(){
    let fishElem = document.getElementById('fish');
    if(fishElem.childElementCount > 0){
        fishElem.lastElementChild.remove();
    }
}


function checkAnswer() {
    if (document.getElementById('input').value == answer) {
        addFish();
        setTask();
    }
    else removeFish();
}

