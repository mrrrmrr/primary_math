let answer, wrongNum = 0, rightNum = 0;


function setTask(){
    let sum = getRandomInteger(2, 20);
    let var1 = getRandomInteger(1, sum - 1);
    let var2 = sum  - var1;

    let sign;
    let vars;

    let unknownVarNum = getRandomInteger(0, 2);
    let signNum = getRandomInteger(0, 1);

    if (signNum === 1) {
        sign = '+';
        vars = [var1, var2, sum];
    } else {
        sign = '-';
        vars = [sum, var1, var2];
    }

    answer = vars[unknownVarNum]
    vars[unknownVarNum] = '?';

    document.getElementById('sign').textContent = sign;
    for (let i = 0; i < 3; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
}


setInterval(function () {
    let n = getRandomInteger(1, 20)

    let birdElement = document.createElement('div');
    let y = getRandomInteger(0, 80);
    birdElement.style.top = `${y}%`;
    birdElement.className = 'birdContainer';
    birdElement.setAttribute('data', n);
    birdElement.innerHTML = `
        <img src="images/bird.gif" class="bird">
        <img src="images/leaf.svg" class="leaf">
        <div class="num"> ${n} </div>`;

    birdElement.onclick  = function () {
        data = this.getAttribute('data')
        if (data == answer){
            rightNum++;
            document.getElementById('right').innerHTML = rightNum;
            setTask();
        }
        else{
            wrongNum++;
            document.getElementById('wrong').innerHTML = wrongNum;
        }
    }

    document.body.append(birdElement);

    setTimeout(function (){
        birdElement.remove()
    }, 10000);
}, 1000);
