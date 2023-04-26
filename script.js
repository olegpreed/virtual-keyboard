// import { Node, printList } from "./classes.js";

const buttons = document.querySelectorAll(".keyboard__key");
const screen = document.querySelector(".screen__input");
const cursor = document.querySelector(".screen__cursor");
const space = document.getElementById("space-btn");
const ctrl = document.getElementById("ctrl-btn");
const del = document.getElementById("del-btn");
const alt = document.getElementById("alt-btn");
const tab = document.getElementById("tab-btn");
const shift = document.getElementById("shift-btn");
const enter = document.getElementById("enter-btn");
const capsLock = document.getElementById("caps-btn");
const backspace = document.getElementById("backspace-btn");

let buffer = [];
screen.textContent = "";
setInterval(() => {
  cursor.style.display = cursor.style.display === "none" ? "inline" : "none";
}, 1000);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    screen.textContent += button.textContent;
    buffer.push(button.textContent);
  });
});

backspace.addEventListener("click", () => {
  buffer.pop();
  screen.textContent = buffer.join("");
});

space.addEventListener("click", () => {
  buffer.push(" ");
  screen.textContent += " ";
  console.log(buffer);
});
