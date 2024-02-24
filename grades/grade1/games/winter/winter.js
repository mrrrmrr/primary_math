const xmlns = "http://www.w3.org/2000/svg";
const colors = ['#f44336', '#e91e63', '#9c27b0', '#009688', '#cddc39', '#ff9800', '#ff5722'];


const ballsElement = document.getElementById('balls');
let answer;
let ballColorNum;
let hand = false;


function removeBall() {
    if (ballsElement.childElementCount > 0) {
        ballsElement.lastElementChild.remove();
    }
}



function setTask() {
    let sum = getRandomInteger(2, 20);
    let var1 = getRandomInteger(1, sum - 1);
    let vars = [sum, var1];
    answer = sum  - var1;

    for (let i = 0; i < 2; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
}


function generateBalls() {
    let panelElement = document.getElementById('panel')
    while (panelElement.childElementCount > 0) {
        panelElement.lastElementChild.remove();
    }

    for (let i = 0; i < 8; i++){
        let data = getRandomInteger(1, 20);
        let colorNum = getRandomInteger(0, colors.length - 1);

        let ballElement = document.createElementNS(xmlns, 'svg');
        ballElement.setAttributeNS(null, 'viewBox', "0 0 90 112.5");
        ballElement.setAttributeNS(null, 'class', 'ball');
        ballElement.setAttributeNS(null, 'data', data);
        ballElement.setAttributeNS(null, 'colorNum', colorNum);
        ballElement.innerHTML = `
            <path d="M45,16.1c-1.3,0-2.4,0.9-2.8,2.1h5.5C47.4,17,46.3,16.1,45,16.1z" fill="grey"/>
            <path d="M49.6,27v-6.8h-9.2V27c1.5-0.3,3-0.4,4.6-0.4C46.6,26.5,48.1,26.7,49.6,27z" fill="grey"/>
            <path fill=${colors[colorNum]} d="M45,28.5c-12.5,0-22.7,10.2-22.7,22.7c0,12.5,10.2,22.7,22.7,22.7c12.5,0,22.7-10.2,22.7-22.7C67.7,38.7,57.5,28.5,45,28.5z   M63.8,50.2c0.6,0,1,0.4,1,1C64.8,62.1,55.9,71,45,71c-0.6,0-1-0.4-1-1s0.4-1,1-1c9.8,0,17.8-8,17.8-17.8  C62.8,50.7,63.3,50.2,63.8,50.2z"/>
            <text x='36' y='55' fill="white"> ${data} </text>`;

        ballElement.onclick = function (){
            if (this.getAttribute('data') == answer){
                hand = true;
                ballColorNum = this.getAttribute('colorNum');
                setTask();
            } else removeBall();    
        };

        panelElement.prepend(ballElement);
    }
}


ballsElement.onclick = function (){
    if (hand) {
        hand = false;

        let ballElement = document.createElementNS(xmlns, 'svg');
        ballElement.style.left = event.offsetX;
        ballElement.style.top = event.offsetY;
        ballElement.setAttributeNS(null, 'viewBox', "0 0 90 112.5");
        ballElement.setAttributeNS(null, 'class', 'ball');
        ballElement.innerHTML = `
            <path d="M45,16.1c-1.3,0-2.4,0.9-2.8,2.1h5.5C47.4,17,46.3,16.1,45,16.1z" fill="grey"/>
            <path d="M49.6,27v-6.8h-9.2V27c1.5-0.3,3-0.4,4.6-0.4C46.6,26.5,48.1,26.7,49.6,27z" fill="grey"/>
            <path fill=${colors[ballColorNum]} d="M45,28.5c-12.5,0-22.7,10.2-22.7,22.7c0,12.5,10.2,22.7,22.7,22.7c12.5,0,22.7-10.2,22.7-22.7C67.7,38.7,57.5,28.5,45,28.5z   M63.8,50.2c0.6,0,1,0.4,1,1C64.8,62.1,55.9,71,45,71c-0.6,0-1-0.4-1-1s0.4-1,1-1c9.8,0,17.8-8,17.8-17.8  C62.8,50.7,63.3,50.2,63.8,50.2z"/>`;
        ballsElement.append(ballElement);

        if (ballsElement.childElementCount >= 5){
            document.getElementById('star').style.visibility = 'visible';
        }
    }
}

generateBalls();
