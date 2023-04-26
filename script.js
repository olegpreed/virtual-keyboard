// import { Node, printList } from "./classes.js";

const symbolKeys = document.querySelectorAll(".keyboard__key");
const terminal = document.querySelector(".interface__screen");
const monitor = document.querySelector(".screen__input");
const cursor = document.querySelector(".screen__cursor");
const space = document.getElementById("space-btn");
const ctrl = document.getElementById("ctrl-btn");
const del = document.getElementById("del-btn");
const allKeys = document.querySelectorAll(".key");
const alt = document.getElementById("alt-btn");
const tab = document.getElementById("tab-btn");
const shift = document.getElementById("shift-btn");
const enter = document.getElementById("enter-btn");
const capsLock = document.getElementById("caps-btn");
const backspace = document.getElementById("backspace-btn");

let buffer = [];
monitor.textContent = "";
setInterval(() => {
  cursor.style.display = cursor.style.display === "none" ? "inline" : "none";
}, 1000);

const arrowKeys = {
  37: "←",
  38: "↑",
  39: "→",
  40: "↓",
};

let capsPressed;

window.addEventListener("keydown", (e) => {
  terminal.scrollTop = terminal.scrollHeight; // allows screen to scroll down automatically when text overflows
  e.preventDefault(); // removes default behavior of keydown events like when pressing space moves page down
  let pressedBtn = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  pressBtn(pressedBtn);
  if (e.key === "Backspace") {
    buffer.pop();
    monitor.textContent = buffer.join("");
  } else if (e.key === "Enter") {
    monitor.textContent += "\n";
    buffer.push("\n");
  } else if (e.key === "Tab") {
    monitor.textContent += "\t";
    buffer.push("\t");
  } else if (e.key === " ") {
    monitor.textContent += " ";
    buffer.push(" ");
  } else if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    monitor.textContent += arrowKeys[e.keyCode];
    buffer.push(arrowKeys[e.keyCode]);
  } else if (e.key === "CapsLock") {
    pressCaps();
  } else if (e.key === "Shift") {
  } else if (e.key === "Control") {
  } else if (e.key === "Alt") {
  } else if (e.key === "Delete") {
  } else {
    buffer.push(e.key);
    monitor.textContent += e.key;
  }
});

allKeys.forEach((button) => {
  button.addEventListener("click", () => {
    pressBtn(button);
  });
});

allKeys.forEach((button) => {
  button.addEventListener("transitionend", () => {
    if (button.innerHTML != "caps") releaseBtn(button);
  });
});

window.addEventListener("keyup", (e) => {
  let pressedBtn = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (pressedBtn.textContent != "caps") releaseBtn(pressedBtn);
});

symbolKeys.forEach((button) => {
  button.addEventListener("click", () => {
    monitor.textContent += button.textContent;
    buffer.push(button.textContent);
  });
});

backspace.addEventListener("click", () => {
  buffer.pop();
  monitor.textContent = buffer.join("");
});

space.addEventListener("click", () => {
  buffer.push(" ");
  monitor.textContent += " ";
  console.log(buffer);
});

capsLock.addEventListener("click", () => {
  pressCaps();
});

enter.addEventListener("click", () => {
  monitor.textContent += "\n";
  buffer.push("\n");
});

function pressCaps() {
  capsPressed = !capsPressed;
  capsLock.style.backgroundColor = capsPressed
    ? "var(--key-pressed-color)"
    : "var(--key-color)";
  capsLock.style.color = capsPressed
    ? "var(--letter-pressed-color)"
    : "var(--letter-color)";
  capsLock.style.top = capsPressed ? "2px" : "0";
  if (capsPressed) {
    symbolKeys.forEach((button) => {
      if (button.innerHTML === "Capslock") return;
      button.textContent = button.textContent.toUpperCase();
    });
  } else {
    symbolKeys.forEach((button) => {
      if (button.innerHTML === "Capslock") return;
      button.textContent = button.textContent.toLowerCase();
    });
  }
}

function releaseBtn(btn) {
  btn.style.backgroundColor = "var(--key-color)";
  btn.style.color = "var(--letter-color)";
  btn.style.top = "0";
}

function pressBtn(btn) {
  btn.style.backgroundColor = "var(--key-pressed-color)";
  btn.style.color = "var(--letter-pressed-color)";
  btn.style.top = "2px";
}
