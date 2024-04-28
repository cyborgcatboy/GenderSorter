const addCard = document.getElementById("addcard");
const todo = document.getElementsByClassName("rdw");
const cardInput = document.getElementById("card-input");
const card = document.querySelector(".card");
const dropZone = document.querySelector(".dropzone");
const precards = document.getElementsByClassName("precard");
const pop_all_button = document.getElementById("pop-all");
let cardNum = 0;
let dragged;

const switchTheme = document.querySelector("#switch");

if (document.body.classList.contains("dark-mode") && !switchTheme.checked) {
  document.body.classList.toggle("dark-mode");
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark-mode");
    switchTheme.checked = true;
}

switchTheme.addEventListener("click", function () {
  if (switchTheme.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

for (var i = 0; i < precards.length; i++) {
  precards[i].addEventListener("click", addPreCardToDo);
}

addCard.addEventListener("click", addCardToDo);
pop_all_button.addEventListener("click", populate_all_pre);

cardInput.addEventListener("keyup", function(event){
  if (event.key === "Enter") {
    addCardToDo()
  }
})

function populate_all_pre() {
  for (var i = 0; i < 10; i++) { //really jank but yeah
    setTimeout(function() {
      for (var i = 0; i < precards.length; i++) {
        precards[i].click();
      }
    }, 100);
  }
}

function addPreCardToDo(event) {
  let text = event.target.outerText;
  let node = document.createElement("DIV");
  let textNode = document.createTextNode(text);
  node.id = `card-number-${cardNum}`;
  node.classList.add("card");
  node.appendChild(textNode);
  node.setAttribute("draggable", true);
  node.setAttribute("ondragstart", "onDragStart(event)");
  node.setAttribute("ondragover", "onDragOver(event)");
  node.setAttribute("onclick", "onCardClick(event)")
  for (var i = 0; i < todo.length; i++) {
    todo[i].appendChild(node.cloneNode(true));
  }
  cardNum++;
  event.target.remove();
}

function addCardToDo() {
  let text = cardInput.value;
  let node = document.createElement("DIV");
  let textNode = document.createTextNode(text);
  node.id = `card-number-${cardNum}`;
  node.classList.add("card");
  node.appendChild(textNode);
  node.setAttribute("draggable", true);
  node.setAttribute("ondragstart", "onDragStart(event)");
  node.setAttribute("ondragover", "onDragOver(event)");
  node.setAttribute("onclick", "onCardClick(event)")
  for (var i = 0; i < todo.length; i++) {
    todo[i].appendChild(node.cloneNode(true));
  }
  cardNum++;
  cardInput.value = "";
}


function onDragStart(event) {
  let target = event.target;
  event.dataTransfer.setData("text", target.id);
  dragged = target;
  console.log(target.id);
}

function onDragLeave(event) {
  event.preventDefault();
  event.target.style.background = "";
}

function onDragEnter(event) {
  event.preventDefault();
  const target = event.target;
}

function onDrop(event) {
  event.preventDefault();
  const target = event.target;
  target.appendChild(dragged);
}

function onDragOver(event) {
  // Prevent default to allow drop
  event.preventDefault();
}

function onCardClick(event) {
  let target = event.target;
  target.remove();
}
