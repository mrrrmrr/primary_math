const mapElement = document.getElementById('map');

let houseCursor = false;
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


for (let btn of document.getElementsByClassName('btn')){
    btn.onclick = function (){
        if (this.getAttribute('data') == answer) {
            houseCursor = true;
            mapElement.style.cursor = `url("images/house.png") 0 0,  auto`;
            setTask();
        }
        else if (mapElement.childElementCount > 0){
                mapElement.lastElementChild.remove();
        }
    }
}

mapElement.onclick = function () {
    if (houseCursor) {
        houseCursor = false;
        this.style.cursor = 'auto';

        let houseElem = document.createElement('img')
        houseElem.setAttribute('src', 'images/house.png')
        houseElem.className = 'house'
        houseElem.style.top = `${event.pageY}px`
        houseElem.style.left = `${event.pageX}px`

        mapElement.append(houseElem)
    }
}
