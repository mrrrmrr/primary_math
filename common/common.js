function getRandomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


function showRules() {
	alert(rules);
}


function returnBack(){
	history.back();
	return false;
}

let helpElement = document.createElement('div');
helpElement.setAttribute('id', "help");
helpElement.onclick = showRules;
helpElement.innerText = "?";
document.body.prepend(helpElement);

let exitElement = document.createElement('div');
exitElement.setAttribute('id', "exit");
exitElement.onclick = returnBack;
exitElement.innerText = "×";
document.body.prepend(exitElement);

window.onload = function () {
	setTask();
	showRules();
}