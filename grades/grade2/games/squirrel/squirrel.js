let answer, wrongNum = 0, rightNum = 0;

const frogElement = document.getElementById("frog");
const rabbitElement = document.getElementById("rabbit");
const bee1Element = document.getElementById("bee1");
const bee2Element = document.getElementById("bee2");


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


function showAnimation(filename, fps, frameMax, imgElement, endless=false){
    let n = 1;
    let animation = setInterval(function (){
        if (n > frameMax){
            if (!endless){
               imgElement.removeAttribute('src');
                clearInterval(animation);
                return; 
            }
            else n = 1;            
        }
        imgElement.setAttribute('src', `${filename}${String(n).padStart(4, '0')}.png`);
        n++;
    }, 1000/fps);
}

showAnimation("images/bee1/bee1", 25, 84, bee1Element, true);
showAnimation("images/bee2/bee2", 25, 112, bee2Element, true);

setInterval(function (){
    if (!frogElement.getAttribute('src') && getRandomInteger(1, 3) == 1){
        showAnimation(filename="images/frog/frog.jpg", fps=30, frameMax=226, imgElement=frogElement)
    }

    if (!rabbitElement.getAttribute('src') && getRandomInteger(1, 3) == 1) {
       showAnimation(filename="images/rabbit/rabbit", fps=50, frameMax=70, imgElement=rabbitElement)
    }
}, 3000)