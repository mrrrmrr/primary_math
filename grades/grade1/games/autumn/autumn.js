let answer, wrongNum = 0, rightNum = 0;

function pxToNumber(px){
    return Number(px.slice(0, px.length - 2));
}


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


function separateLeaf(containerElement){
    let containerStyle = window.getComputedStyle(containerElement)
    let x = containerStyle.left;
    let y = containerStyle.top;

    rightLeafElement = containerElement.cloneNode(true);
    containerElement.lastElementChild.remove();
    containerElement.lastElementChild.remove();
    containerElement.classList.remove('clickable');
    containerElement.onclick = null;

    rightLeafElement.classList.remove('flight');
    rightLeafElement.firstElementChild.remove();
    rightLeafElement.firstElementChild.setAttribute('src', "images/leaf_yellow.svg")
    rightLeafElement.style.top = y;
    rightLeafElement.style.left = x;
    document.body.append(rightLeafElement);
    return rightLeafElement;
}


function setLeafFall(leafElement){
    let y = pxToNumber(window.getComputedStyle(leafElement).top);
    let y_max = pxToNumber(window.getComputedStyle(document.body).height);

    let step = 1;
    let time = 1;

    let fall = setInterval( function () {
        y += step;
        leafElement.style.top = `${y}px`;
        if (y >= y_max) clearInterval(fall);
    }, time);
}


setInterval(function () {
    let n = getRandomInteger(1, 20)

    let birdElement = document.createElement('div');
    let y = getRandomInteger(0, 80);
    birdElement.style.top = `${y}%`;
    birdElement.className = 'birdContainer flight clickable';
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

            let leafElement = separateLeaf(this);
            setLeafFall(leafElement);
        }
        else{
            wrongNum++;
            document.getElementById('wrong').innerHTML = wrongNum;
        }
    }

    document.body.append(birdElement);

    setTimeout(function (){
        birdElement.remove()
    }, 20000);
}, 1500);
