const xmlns = "http://www.w3.org/2000/svg";
const colors = ['#f44336', '#e91e63', '#9c27b0', '#009688', '#cddc39', '#ff9800', '#ff5722'];


const ballsContainer = document.getElementById('balls');
let answer;
let hand = false;
let ballURL;


function removeBall() {
    if (ballsContainer.childElementCount > 0) {
        ballsContainer.lastElementChild.remove();
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
                let colorNum = this.getAttribute('colorNum');
                let color = colors[colorNum].slice(1);
                ballURL = `data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='50' viewBox='0 0 90 112.5'%3e%3cpath fill='gray' d='M45 16.1c-1.3 0-2.4.9-2.8 2.1h5.5c-.3-1.2-1.4-2.1-2.7-2.1zM49.6 27v-6.8h-9.2V27c1.5-.3 3-.4 4.6-.4 1.6-.1 3.1.1 4.6.4z'/%3e%3cpath fill='%23${color}' d='M45 28.5c-12.5 0-22.7 10.2-22.7 22.7S32.5 73.9 45 73.9s22.7-10.2 22.7-22.7S57.5 28.5 45 28.5zm18.8 21.7c.6 0 1 .4 1 1C64.8 62.1 55.9 71 45 71c-.6 0-1-.4-1-1s.4-1 1-1c9.8 0 17.8-8 17.8-17.8 0-.5.5-1 1-1z'/%3e%3c/svg%3e`;
                document.body.style.cursor = `url("${ballURL}") 0 0,  auto`;
                setTask();
            } else removeBall();    
        };

        panelElement.prepend(ballElement);
    }
}


ballsContainer.onclick = function (){
    if (hand) {
        hand = false;
        document.body.style.cursor = `auto`;

        ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.backgroundImage = `url("${ballURL}")`
        ball.style.left = `${event.offsetX}px`;
        ball.style.top = `${event.offsetY}px`;
        ballsContainer.append(ball);

        if (ballsContainer.childElementCount >= 5){
            document.getElementById('star').style.visibility = 'visible';
        }
    }
}

generateBalls();
