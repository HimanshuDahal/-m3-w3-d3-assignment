const pacMen = []; // holds all PacMen

function setToRandom(scale) {
  return { x: Math.random() * scale, y: Math.random() * scale };
}

function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;

  newimg.style.left = position.x + "px";
  newimg.style.top = position.y + "px";

  game.appendChild(newimg);

  return { position, velocity, newimg };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + "px";
    item.newimg.style.top = item.position.y + "px";
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  let imgW = item.newimg.width;
  let imgH = item.newimg.height;
  let nextX = item.position.x + item.velocity.x;
  let nextY = item.position.y + item.velocity.y;

  if (nextX + imgW > window.innerWidth || nextX < 0) {
    item.velocity.x = -item.velocity.x;
    // flip horizontal sprite
    item.newimg.src =
      item.velocity.x > 0
        ? "./images/PacMan1.png"
        : "./images/PacMan1-flip.png";
  }

  if (nextY + imgH > window.innerHeight || nextY < 0) {
    item.velocity.y = -item.velocity.y;
  }

  // toggle chomp animation
  let mouthOpen = item.newimg.src.includes("PacMan1");
  let baseName = mouthOpen ? "PacMan2" : "PacMan1";
  let dirSuffix = item.velocity.x < 0 ? "-flip" : "";
  item.newimg.src = `./images/${baseName}${dirSuffix}.png`;
}

function makeOne() {
  pacMen.push(makePac());
}

if (typeof module !== "undefined") {
  module.exports = { checkCollisions, update, pacMen };
}
