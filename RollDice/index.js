const rollBtn = document.querySelector("#roll-btn");
const dice = document.querySelector("#dice");
const history = document.querySelector("#roll-history");
const media = document.querySelector("#media");
const distribucion = document.querySelector("#distribucion");

let historyList = new Array();


document.addEventListener("DOMContentLoaded", () => {
  rollBtn.addEventListener("click", () => {
    getNumber();
  });
});

function getNumber() {
  dice.classList.add("roll-animation");
  setTimeout(() => {
    dice.classList.remove("roll-animation");
  }, 1000);
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  const face = getDiceFace(randomNumber);
  dice.innerHTML = face
  historyList.push(face);
  renderHistory();
}

function getDiceFace(n) {
  switch (n) {
    case 1:
      return "&#9856;";
    case 2:
      return "&#9857;";
    case 3:
      return "&#9858;";
    case 4:
      return "&#9859;";
    case 5:
      return "&#9860;";
    default:
      return "&#9861;";
  }
}

function renderHistory() {
    while (history.firstChild) {
        history.removeChild(history.firstChild);
    }
    let n = 1
    historyList.forEach((face) => {
        const li = document.createElement("li");
        li.innerHTML = `Roll ${n}: <span>${face}</span>`;
        history.appendChild(li);
        n++
    })
}




