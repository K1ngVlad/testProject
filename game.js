const firstDiv = document.querySelectorAll('.player')[0];
const secondDiv = document.querySelectorAll('.player')[1];
const playerSwitch = document.querySelector('.player-switch');

console.log(playerSwitch);

class Player {
  constructor(xPosition, yPosition, div, name, xSpeed, ySpeed) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.div = div;
    this.name = name;
  }

  xMove(x) {
    this.xSpeed = x;
  }

  yMove(y) {
    this.ySpeed = y;
  }

  setX(x) {
    this.xPosition = x;
  }

  setY(y) {
    this.xPosition = y;
  }

  move() {
    if (this.xPosition > 0) {
      this.xPosition += this.xSpeed;
      if (this.xPosition < 0) {
        this.xPosition = 0;
      }
    } else {
      if (this.xSpeed > 0) {
        this.xPosition += this.xSpeed;
      }
    }
    if (this.yPosition > 0) {
      this.yPosition += this.ySpeed;
      if (this.yPosition < 0) {
        this.yPosition = 0;
      }
    } else {
      if (this.ySpeed > 0) {
        this.yPosition += this.ySpeed;
      }
    }
  }

  render() {
    this.div.style.left =
      this.name === 'first'
        ? `${this.xPosition}px`
        : `${this.xPosition - 64}px`;
    // this.div.style.backgroundColor = 'green';
    //   this.name === 'first' ? this.xPosition : this.xPosition - 64;
    this.div.style.bottom = `${this.yPosition}px`;
  }
}

const firstPlayer = new Player(0, 0, firstDiv, 'first', 0, 0);
const secondPlayer = new Player(64, 64, secondDiv, 'second', 0, 0);
firstPlayer.render();
secondPlayer.render();

let choisenPlayer = 'first';
playerSwitch.onclick = () => {
  choisenPlayer = playerSwitch.checked ? 'second' : 'first';
  if (choisenPlayer === 'first') {
    secondPlayer.xMove(0);
    secondPlayer.yMove(0);
  } else {
    firstPlayer.xMove(0);
    firstPlayer.yMove(0);
  }
};

const left = keyboard('ArrowLeft');
const right = keyboard('ArrowRight');
const up = keyboard('ArrowUp');
const down = keyboard('ArrowDown');

left.press = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.xMove(-5);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.xMove(-5);
  }
};

left.release = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.xMove(0);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.xMove(0);
  }
};

right.press = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.xMove(5);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.xMove(5);
  }
};

right.release = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.xMove(0);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.xMove(0);
  }
};

up.press = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.yMove(5);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.yMove(5);
  }
};

up.release = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.yMove(0);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.yMove(0);
  }
};

down.press = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.yMove(-5);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.yMove(-5);
  }
};

down.release = () => {
  if (choisenPlayer === 'first') {
    firstPlayer.yMove(0);
  }
  if (choisenPlayer === 'second') {
    secondPlayer.yMove(0);
  }
};

const fetchPlayers = async () => {
  try {
    // const first = await fetch('http://85.113.58.53:8000/first', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     xPositionFirstPlayer: firstPlayer.xPosition,
    //     yPositionFirstPlayer: firstPlayer.yPosition,
    //   }),
    // });
    if (choisenPlayer === 'first') {
      const first = await axios.post('http://85.113.58.53:8000/first', {
        xPositionFirstPlayer: firstPlayer.xPosition,
        yPositionFirstPlayer: firstPlayer.yPosition,
      });
      secondPlayer.setX(first.xPositionSecondPlayer);
      secondPlayer.setY(first.yPositionSecondPlayer);
    } else {
      const second = await axios.post('http://85.113.58.53:8000/second', {
        xPositionSecondPlayer: secondPlayer.xPosition,
        yPositionSecondPlayer: secondPlayer.yPosition,
      });
      firstPlayer.setX(second.xPositionfirstPlayer);
      firstPlayer.setY(second.yPositionfirstPlayer);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const calculate = () => {
  firstPlayer.move();
  firstPlayer.render();
  secondPlayer.move();
  secondPlayer.render();
  console.log(secondPlayer.xPosition);
};

setInterval(fetchPlayers, 100);
setInterval(calculate, 10);
