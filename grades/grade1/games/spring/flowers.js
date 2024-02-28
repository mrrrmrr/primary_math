const xmlns="http://www.w3.org/2000/svg"

const flowersElement = document.getElementById('flowers');

let answer;


function addFlower() {
    let flowerElement = document.createElement('img');
    flowerElement.setAttribute('src', `images/flower${getRandomInteger(1, 11)}.png`);
    flowerElement.className = 'flower';
    flowerElement.style.left = `${getRandomInteger(0, 80)}%`;
    flowersElement.append(flowerElement);
}


function removeFlower() {
    if (flowersElement.childElementCount > 0) {
        flowersElement.lastElementChild.remove();
    }
}


function setTask(){
    let sum = getRandomInteger(2, 20);
    let var1 = getRandomInteger(1, sum - 1);
    let var2 = sum  - var1;

    let vars = [var1, var2];
    answer = sum;

    for (let i = 0; i < 2; i++){
        document.getElementById(`var${i}`).textContent = vars[i];
    }
}


setInterval(function () {
    let n = getRandomInteger(1, 20);

    let raindropElement = document.createElementNS(xmlns,'svg');
    raindropElement.setAttributeNS(null, 'class', 'raindrop');
    raindropElement.setAttributeNS(null,'viewBox', "0 0 64 64");
    raindropElement.setAttributeNS(null,'data', n);
    raindropElement.style.left = `${getRandomInteger(0, 90)}%`

    let pathElement = document.createElementNS(xmlns, 'path');
    pathElement.setAttributeNS(null,'d', "M32 3.829c-4.422 4.418-20.791 21.799-20.787 37.114 0 10.952 9.326 19.859 20.787 19.859s20.783-8.908 20.783-19.859C52.791 25.611 36.422 8.243 32 3.829zm0 53.107c-9.259 0-16.787-7.236-16.787-16.126a.798.798 0 1 1 1.596 0c0 8.013 6.813 14.526 15.19 14.526a.8.8 0 0 1 .001 1.6z")
    raindropElement.append(pathElement);

    let textElement = document.createElementNS(xmlns, 'text');
    textElement.setAttributeNS(null, 'x', '23');
    textElement.setAttributeNS(null, 'y', '45');
    textElement.innerHTML = n;
    raindropElement.append(textElement);

    raindropElement.onclick = function (){
        n = this.getAttribute('data');

        if (n == answer){
            addFlower();
            setTask()
        } else {
            removeFlower();
        }
    }

    setTimeout(function (){
        raindropElement.remove();
    }, 14000);

    document.body.append(raindropElement);


}, 500);


