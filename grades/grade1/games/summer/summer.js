let answer, rightNum = 0, wrongNum = 0;


function set_Task() {
    let vars = [getRandomInteger(1, 20), getRandomInteger(1, 20)]
    answer = vars[0] > vars[1] ? '>' : vars[0] < vars[1] ? '<' : '=';

    for (let i = 1; i <= 2; i++){
        document.getElementById(`var${i}`).innerHTML = vars[i-1];
    }
}


for (let btn of document.getElementsByClassName('btn')){
    btn.onclick = function (){
        if (this.getAttribute('data') == answer){
            rightNum++;
            document.getElementById('right').innerHTML = rightNum;
            set_Task();
        } else {
            wrongNum++;
            document.getElementById('wrong').innerHTML = wrongNum;
        }
    }
}
