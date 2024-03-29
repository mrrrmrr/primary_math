let answer;
const birdsElement = document.getElementById("birds");
const lanternsElement = document.getElementById("lanterns");


function moveCar(length){
    let steps_num = 50;
    let time = 2000;

    let carElement = document.getElementById('car');

    let left = window.getComputedStyle(carElement).left;
    let x = Number(left.slice(0, left.length-2));
    if (x + length < 0) length = -1 * x;

    let window_width = window.getComputedStyle(document.getElementById('town')).width;
    let x_max = Number(window_width.slice(0, window_width.length-2));

    let step = length / steps_num;

    let startTime = Date.now();
    let movement = setInterval(function (){
        if (Date.now() - startTime >= time){
            clearInterval(movement);
            return;
        }

        x += step;
        if (x >= x_max) x = 0;
        carElement.style.left = `${x}px`;

    }, time/steps_num);
}


function setTask(){
    let gMeasure, lMeasure
    let gNum, lNum

    if (getRandomInteger(0, 1) == 0) {
        gMeasure = 'м';

        if (getRandomInteger(0, 1) == 0){
            lMeasure = 'дм';
            gNum = getRandomInteger(1, 99);
            lNum = gNum * 10;
        } else {
            lMeasure = 'см';
            gNum = getRandomInteger(1, 99);
            lNum = gNum * 100;
        }

    } else {
        gMeasure = 'дм';
        lMeasure = 'см';
        gNum = getRandomInteger(1, 99);
        lNum = gNum * 10;
    }

    let order = getRandomInteger(0, 1);
    let measures = order ? [gMeasure, lMeasure] : [lMeasure, gMeasure];
    let nums = order ? [gNum, lNum] : [lNum, gNum];

    let answerNum = getRandomInteger(0, 1);
    answer = nums[answerNum];
    nums[answerNum] = '?';

    for(let i= 0; i < 2; i++){
        document.getElementById(`measure${i}`).innerText = measures[i];
        document.getElementById(`var${i}`).innerText = nums[i];
    }
    document.getElementById(`var${answerNum}`).innerHTML = `<input  id="input" type="text">`;
}


function checkAnswer(){
    if (document.getElementById('input').value == answer) {
        moveCar(30);
        setTask();
    } else {
        moveCar(-30);
    }
}

function showBlink(lantern){
    const order = [1, 2, 3, 2, 1];
    let i = 0;
    let blink = setInterval(function () {
        if (i < order.length){
            lanternsElement.style.backgroundImage = `url("images/town_${lantern}${order[i]}.png")`;
            i++;
        }
        else {
            lanternsElement.style.backgroundImage = `url("images/town.jpg")`;
            clearInterval(blink);
        }
    }, 100) 
}


setInterval(function () {
    if (!getRandomInteger(0, 2)) {
        birdsElement.style.animationPlayState = "running";
        setTimeout(function () {
            birdsElement.style.animationPlayState = "paused";
        }, 5000);
    }
} , 6000);


setInterval(function () {
    let rand = getRandomInteger(1, 9)
    if (rand < 3) showBlink('left');
    else if (rand < 5) showBlink('right');
    else if (rand == 9) showBlink('both');
}, 2000);



