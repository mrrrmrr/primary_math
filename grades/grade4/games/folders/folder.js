let answer;
let wrongNum = 0, rightNum = 0;



function setTask() {
    let foldersNum = getRandomInteger(2, 9);
    let filesNum = foldersNum * getRandomInteger(2, 1000000000);

    answer = getRandomInteger(0, 1);
    if (!answer){
        filesNum += getRandomInteger(1, foldersNum);
    }

    document.getElementById('folders').innerText = foldersNum;
    document.getElementById('files').innerText = filesNum;
}


for (let btn of  document.getElementsByTagName('button')){
    btn.onclick = function (){
        if (this.getAttribute('data') == answer){
            rightNum++;
            document.getElementById('right').innerText = rightNum;
        } else {
            wrongNum++;
            document.getElementById('wrong').innerText = wrongNum;
        }

        setTask();
    }
}

