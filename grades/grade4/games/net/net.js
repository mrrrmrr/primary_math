const sendingSpeed = 100;
const netElement = document.getElementById("net");

let colors = ["#69EBFC", "#FF9372", "#F7FF85", "#FF85F5", "#8990EE", "#A1FA65"];
let score = 0;
let userCursor;


function setTask(){
    let gMeasure, lMeasure;
    let gNum, lNum;

    if (getRandomInteger(0, 1) == 0) {
        gMeasure = 'м²';

        if (getRandomInteger(0, 1) == 0){
            lMeasure = 'дм²';
            gNum = getRandomInteger(1, 99);
            lNum = gNum * 100;
        } else {
            lMeasure = 'см²';
            gNum = getRandomInteger(1, 99);
            lNum = gNum * 10000;
        }

    } else {
        gMeasure = 'дм²';
        lMeasure = 'см²';
        gNum = getRandomInteger(1, 99);
        lNum = gNum * 100;
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
        addUser();
        setTask();
    } else {
        removeUser();
    }
}


function pxToNumber(px) {
    return Number(px.slice(0, px.length-2));
}


function addUser() {
    score++;

    colorNum = getRandomInteger(0, colors.length - 1);
    let color = colors[colorNum];
    if (color[0] == '#') color = "%23" + color.slice(1);

    let element = document.createElement('div');
    element.style.backgroundImage = `url('data:image/svg+xml,<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.6 789.5" style="enable-background:new 0 0 456.6 789.5;" xml:space="preserve"><circle cx="228.3" cy="72.2" r="72.2"/><path d="M452,394.5L308.6,194c-8.3-15.7-24.7-26.3-43.7-26.3h-73.3c-18.9,0-35.4,10.7-43.7,26.3L4.6,394.5c-8,11.3-5.3,27,6,35s27,5.3,35-6l96.7-135.2v148.4c0,10.1,3,19.4,8.2,27.2l-0.1,300.2c-0.1,13.8,11.2,25.2,25,25.3s25.2-11.2,25.3-25l0.1-278.3H256l-0.1,278.1c-0.1,13.8,11.2,25.2,25,25.3s25.2-11.2,25.3-25l0.1-300.7c5.1-7.8,8.1-17,8.1-27V288.4l96.7,135.2c8,11.3,23.8,14,35,6S460,405.8,452,394.5L452,394.5z"/></svg>')`;
    element.className = 'user';
    element.dataset.userId = score;
    netElement.append(element);

    document.body.style.cursor = `none`;
    userCursor = element;
    userCursor.style.left = `${event.clientX}px`;
    userCursor.style.top = `${event.clientY}px`;
}


function removeUser(){
    score--;

    let element = document.querySelector(".user");
    let userId = element.dataset.userId;

    for (let edgeElement of Array.prototype.slice.call(document.querySelectorAll(".edge"))) {
        if (edgeElement.dataset.fromUser == userId || edgeElement.dataset.toUser == userId) edgeElement.remove();
    }
    element.remove();
}


function addEdges(startUserElement){
    let startUserStyle = window.getComputedStyle(startUserElement);
    let startX = pxToNumber(startUserStyle.left);
    let startY = pxToNumber(startUserStyle.top);

    for (let endUserElement of Array.prototype.slice.call(document.querySelectorAll(".user"), 0, -1)){
        let endUseStyle = window.getComputedStyle(endUserElement);
        let endX = pxToNumber(endUseStyle.left);
        let diffX = startX - endX;
        let endY = pxToNumber(endUseStyle.top);
        let diffY = startY - endY;
        let length = Math.sqrt(diffX ** 2 + diffY ** 2);

        let angle1, angle2;
        if (diffX == 0) {
            angle1 = diffY > 0 ? -1/2 * Math.PI : Math.PI/2;
            angle2 = -1 * angle1;
        }
        else {
           let angle = Math.atan(diffY/diffX); 
           angle1 = diffX < 0 ? angle : Math.PI + angle;
           angle2 = diffX > 0 ? angle : Math.PI + angle;
           
        } 

        let edge1Element = document.createElement('div');
        edge1Element.className = "edge";
        edge1Element.innerHTML = `<div class="line"></div>`;
        edge1Element.dataset.fromUser = startUserElement.dataset.userId;
        edge1Element.dataset.toUser = endUserElement.dataset.userId;
        edge1Element.style.top = `${startY + 25}px`;
        edge1Element.style.left = `${startX + 35}px`;
        edge1Element.style.width = `${length}px`;
        edge1Element.style.transform = `rotate(${angle1}rad)`;
        if (Math.abs(angle1) > Math.PI/2){
            edge1Element.dataset.scale = 'true';
        }

        let edge2Element = document.createElement('div');
        edge2Element.className = "edge";
        edge2Element.innerHTML = `<div class="line"></div>`;
        edge2Element.dataset.fromUser = endUserElement.dataset.userId;
        edge2Element.dataset.toUser = startUserElement.dataset.userId;
        edge2Element.style.top = `${endY + 25}px`;
        edge2Element.style.left = `${endX + 35}px`;
        edge2Element.style.width = `${length}px`;
        edge2Element.style.transform = `rotate(${angle2}rad)`;
        if (Math.abs(angle2) > Math.PI/2){
            edge2Element.dataset.scale = 'true';
        }

        netElement.append(edge1Element);
        netElement.append(edge2Element);
    }
}


document.body.onmousemove = function () {
    if (userCursor){
        
        userCursor.style.left = `${event.clientX}px`;
        userCursor.style.top = `${event.clientY}px`;
    }
}

netElement.onclick = function () {
    if (userCursor) {
        userCursor.style.left = `${event.clientX}px`;
        userCursor.style.top = `${event.clientY}px`;
        addEdges(userCursor);
        netElement.style.cursor = `auto`;
        userCursor = null;
    }
}

setInterval(function () {
    for (let edgeElement of Array.prototype.slice.call(document.querySelectorAll(".edge"))){
        backElement = document.querySelector(`[data-from-user="${edgeElement.dataset.toUser}"][data-to-user="${edgeElement.dataset.fromUser}"]`)
        if (!edgeElement.hidden && edgeElement.childElementCount == 1 && !getRandomInteger(0, 3)) {
            let fileType = getRandomInteger(0, 3);
            let fileElement = document.createElement('img');
            fileElement.className = 'file';
            fileElement.setAttribute('src', `images/file${fileType}.svg`);
            if (edgeElement.dataset.scale){
                fileElement.style.transform = `rotate(${Math.PI}rad)`;
            }
            let time = pxToNumber(window.getComputedStyle(edgeElement).width) / sendingSpeed;
            fileElement.style.animationDuration = `${time}s`
            edgeElement.prepend(fileElement);
            backElement.hidden = true;
            setTimeout( function () {
                backElement.hidden = false;
                fileElement.remove();
            }, 1000 * time - 5);
        }
    }
}, 2000);

