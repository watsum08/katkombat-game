import { Player } from "./classes/Player.js";

const canvas = document.createElement("canvas");
canvas.width = 1280;
canvas.height = 720;
canvas.id = "wheelCanvas";
canvas.innerText = "Canvas tag not supported";
canvas.style.border = "1px #000 solid";
canvas.style.margin = "auto";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;

const gravity = 0.4;
const gameObjects = [];

const gameUpdate = (timestamp) => {
  requestAnimationFrame(gameUpdate);
  deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
  lastTimestamp = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  gameObjects.forEach((gameObj) => gameObj.update(gravity, canvas));
  gameObjects.forEach((gameObj) => gameObj.draw(ctx));
};

const gameStart = () => {
  gameObjects.push(new Player(600, 300, 64, 128, "green", "right"));

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(gameUpdate);
};

gameStart();
