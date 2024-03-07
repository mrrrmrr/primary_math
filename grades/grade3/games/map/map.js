const mapElement = document.getElementById('map');
const houseCursorElement = document.getElementById('houseCursor');

let houseNum = 0;
let answer;


function setTask(){
    let vars = [];
    let answers = [];

    for (let i = 0; i < 2; i++) {
        let sum = getRandomInteger(300, 999);
        let var0 = getRandomInteger(100, sum-100);
        let var1 = sum - var0;
        let sign;
        if (getRandomInteger(0, 1)) {
            sign = '+';
            vars.push(var0);
            vars.push(var1);
            answers.push(sum);
        } else {
            sign = '-';
            vars.push(sum);
            vars.push(var0);
            answers.push(var1);
        }

        document.getElementById(`sign${i}`).innerText = sign;
    }

    answer = (answers[0] > answers[1]) ? '>' : (answers[0] < answers[1]) ? '<' : '=';

    for (let i = 0; i < 4; i++){
        let n = vars[i];

        let cm = n % 10;
        n = (n - cm) / 10;

        let dm = n % 10;
        n = (n - dm) / 10;

        let m = n;

        document.getElementById(`cm${i}`).innerText = cm;
        document.getElementById(`dm${i}`).innerText = dm;
        document.getElementById(`m${i}`).innerText = m;
    }
}


function addHouseCursor() {
    houseNum = getRandomInteger(1, 16);
    mapElement.style.cursor = `none`;
    houseCursorElement.setAttribute('src', `images/house${houseNum}.png`);
}

function removeHouseCursor() {
    houseNum = 0;
    houseCursorElement.removeAttribute('src');
    houseCursorElement.style.top = "100%";
    houseCursorElement.style.left = "100%";
    mapElement.style.cursor = "auto";
}


for (let btn of document.getElementsByClassName('btn')){
    btn.onclick = function (){
        if (this.getAttribute('data') == answer) {
            addHouseCursor();
            setTask(); 
        }
        else if (mapElement.childElementCount > 0){
                mapElement.lastElementChild.remove();
        }
    }
}

mapElement.onclick = function () {
    if (houseNum) {
        let houseElem = document.createElement('img')
        houseElem.setAttribute('src', `images/house${houseNum}.png`);
        houseElem.className = 'house';
        houseElem.style.top = `${event.pageY}px`;
        houseElem.style.left = `${event.pageX}px`;

        mapElement.append(houseElem);

        removeHouseCursor();
    }
}

document.body.onmousemove = function () {
    if (houseNum){
        houseCursorElement.style.left = `${event.clientX}px`;
        houseCursorElement.style.top = `${event.clientY}px`;
    }
}
