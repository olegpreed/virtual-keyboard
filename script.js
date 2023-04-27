import { engToRus } from "./rus-keyboard.js";

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

setInterval(() => {
  cursor.style.opacity = cursor.style.opacity === "1" ? "0" : "1";
}, 800);

let buffer = [];
monitor.textContent = "";
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
  let key = e.key;
  if (e.key === "<") key = ",";
  if (e.key === ">") key = ".";
  if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    key = arrowKeys[e.keyCode];
  }
  if (e.key === "Backspace") {
    buffer.pop();
    monitor.textContent = buffer.join("");
  } else if (e.key === "Enter") {
    if (
      monitor.textContent === "4 8 15 16 23 42" ||
      monitor.textContent === "4815162342"
    )
      easterEgg();
    else {
      monitor.textContent += "\n";
      buffer.push("\n");
    }
  } else if (e.key === "Tab") {
    monitor.textContent += "\t";
    buffer.push("\t");
  } else if (e.key === " ") {
    monitor.textContent += " ";
    buffer.push(" ");
  } else if (e.key === "CapsLock") {
    pressCaps();
  } else if (e.key === "Shift") {
    capsPressed = !capsPressed;
  } else if (e.ctrlKey && e.altKey) {
    changeLang();
  } else if (e.key === "Control" || e.key === "Alt" || e.key === "Delete") {
  } else {
    key = key.toLowerCase();
    if (localStorage.getItem("lang") === "eng") {
      // checks that no matter what language input user has it will only text in the language of a virtual keyboard
      for (let engKey in engToRus) {
        if (engToRus[engKey] === key) {
          key = engKey;
        }
      }
    } else if (localStorage.getItem("lang") === "rus") {
      key = engToRus[key] ? engToRus[key] : key;
    }
    if (capsPressed) {
      key = key.toUpperCase();
    }
    insertKey(key);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Shift") {
    capsPressed = !capsPressed;
  }
});

allKeys.forEach((button) => {
  button.addEventListener("mousedown", () => {
    pressBtn(button);
  });
});

allKeys.forEach((button) => {
  button.addEventListener("mouseup", () => {
    if (button.innerHTML != "caps") releaseBtn(button);
  });
});

window.addEventListener("keyup", (e) => {
  let pressedBtn = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (pressedBtn && pressedBtn.textContent != "caps") releaseBtn(pressedBtn);
});

symbolKeys.forEach((button) => {
  button.addEventListener("click", () => {
    if (capsPressed) {
      monitor.textContent += button.textContent.toUpperCase();
      buffer.push(button.textContent.toUpperCase());
    } else {
      monitor.textContent += button.textContent;
      buffer.push(button.textContent);
    }
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
  if (btn.textContent === "enter") {
    btn.style.backgroundColor = "var(--enter-key-color)";
  } else btn.style.backgroundColor = "var(--key-color)";
  btn.style.color = "var(--letter-color)";
  btn.style.top = "0";
}

function pressBtn(btn) {
  if (btn === null) return;
  if (btn.textContent === "enter") {
    btn.style.backgroundColor = "var(--enter-key-pressed-color)";
  } else btn.style.backgroundColor = "var(--key-pressed-color)";
  btn.style.color = "var(--letter-pressed-color)";
  btn.style.top = "2px";
}

function changeLang() {
  function rusToEng(symbol) {
    return Object.keys(engToRus).find((key) => engToRus[key] === symbol);
  }
  if (localStorage.getItem("lang") === "eng") {
    localStorage.setItem("lang", "rus");
    symbolKeys.forEach((button) => {
      let rusKey = engToRus[button.textContent.toLowerCase()];
      button.textContent = rusKey ? rusKey : button.textContent;
    });
  } else {
    localStorage.setItem("lang", "eng");
    symbolKeys.forEach((button) => {
      let engKey = rusToEng(button.textContent);
      button.textContent = engKey ? engKey : button.textContent;
    });
  }
}

function insertKey(key) {
  buffer.push(key);
  monitor.textContent += key;
}

function easterEgg() {
  function randomChar() {
    return String.fromCharCode(0x13000 + Math.random() * (0x131B9-0x13000+1));
  }
  terminal.style.setProperty("--text-color", "red");
  monitor.classList.add('easter-egg');
  monitor.textContent = "";
  setTimeout(() => {
    setInterval(() => {
      terminal.scrollTop = terminal.scrollHeight;
      monitor.textContent += randomChar();
    }, 4);
  }, 1500);
}
