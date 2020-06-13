function playerHit() {
  if (hp == 0) {
    Crafty.scene('menu');
    Menu.load('gameOver');
    Menu.show();
  } else {
    hp--;
    hpArr[hp].destroy();
  }
}

function decreaseTime() {
  timeLeft --;
  if (timeLeft == 0) {
    Crafty.scene('menu');
    Menu.show();
    Menu.load('gameOver');
  } else if (timerON === true) {
    setTimeout(decreaseTime, 1000);
  }
}

Crafty.scene('game', () => {  
  if (timerON) {
    timeLeft = startTimer;
    decreaseTime();
    Crafty.e('TimerText');
  }
  Crafty.e('ScoreText');
  Crafty.background(gameBackgrounds[COLOR]);
  score = 0;
  hp = startHP;
  hpArr = [];
  bricksAmount = 0;
  var curHPx = 10;
  for (let i = 0; i < hp; ++i) {
    hpArr[i] = Crafty.e('HP')
    .attr({x: curHPx, y: HPMargin});
    curHPx += 30;
  }
  var width = RESOLUTIONS[RESOLUTION][0];
  var height = RESOLUTIONS[RESOLUTION][1];

  ball = Crafty.e('Ball, ball')
  .attr({w: ballRadius, h: ballRadius});

  for (let i = 0; i < fieldHeight; ++i) {
    field[i] = [];
    for (let j = 0; j < fieldWidth; ++j) {
      field[i][j] = lvlField[i][j];
      if (field[i][j] === 1) {
        bricksAmount++;
      }
    }
  }
  let curX = 0, curY = 0;
  let brickWidht = (width - 2 * (fieldWidth * brickDX)) / fieldWidth;
  let brickHeight = (height - 2 * (fieldHeight * brickDX) - brickMargin) / fieldHeight;
  for (let i = 0; i < fieldHeight; ++i) {
    for (let j = 0; j < fieldWidth; ++j) {
      if (field[i][j] === 1) {
        Crafty.e('Brick, Obstacle')
        .attr({x: curX + brickDX, y: curY + brickDX, w: brickWidht, h: brickHeight, i: i, j: j})
        .color(brickColors[(i + j) % 5]);
      }
      curX += 2 * brickDX;
      curX += brickWidht;
    }
    curY += 2 * brickDX;
    curY += brickHeight;
    curX = 0;
  }

  Crafty.e('Wall, wall_top, Obstacle')
  .attr({x: 0, y: 0, w: width, h: wallSize});
  Crafty.e('Wall, wall_bottom, Obstacle')
  .attr({x: 0, y: height - wallSize, w: width, h: wallSize});
  Crafty.e('Wall, wall_side, Obstacle')
  .attr({x: 0, y: 0, w: wallSize, h: height});
  Crafty.e('Wall, wall_side, Obstacle')
  .attr({
    x: width - wallSize,
    y: 0,
    w: wallSize,
    h: height
  });

  board = Crafty.e('Board, Obstacle')
  .attr({x: wallSize + (width - 2 * wallSize) / 2 - boardWidht[DIFF] / 2, y: wallSize + bottomMargin})
  .bind('UpdateFrame', function() { 
    boardX = this.x + boardWidht[DIFF] / 2;
    if (hitData = this.hit('wall_side')) {
      if (hitData.type == 'SAT') {
        this.x -= hitData.overlap * hitData.nx;
      } else {
        if (this.x > width - wallSize - boardWidht[DIFF]) { 
          this.x = width - wallSize - boardWidht[DIFF];
        }
        if (this.x < wallSize) {
          this.x = wallSize;
        }
      }
    }
  })
  .bind('playerHit', function() {
    this.x = wallSize + (width - 2 * wallSize) / 2 - boardWidht[DIFF] / 2;
    this.y = wallSize + bottomMargin;
  })
});

Crafty.bind('SceneChange', ({newScene}) => {
  switch(newScene) {
    case 'editor':
      iFeditor = true;
      break;
    default:
      iFeditor = false;
  }
});

Crafty.bind('SceneChange', ({newScene}) => {
  if (newScene != 'game') {
    timerON = false;
  }
});

Crafty.scene('editor', () =>  {
  Crafty.e('EditorExit');
  var width = RESOLUTIONS[RESOLUTION][0];
  var height = RESOLUTIONS[RESOLUTION][1];
  Crafty.background(gameBackgrounds[COLOR]);
  let curX = 0, curY = 0;
  let brickWidht = (width - 2 * (fieldWidth * brickDX)) / fieldWidth;
  let brickHeight = (height - 2 * (fieldHeight * brickDX) - brickMargin) / fieldHeight;
  for (let i = 0; i < fieldHeight; ++i) {
    for (let j = 0; j < fieldWidth; ++j) {
      if (lvlField[i][j] === 1) {
        Crafty.e('Brick, Obstacle')
        .attr({x: curX + brickDX, y: curY + brickDX, w: brickWidht, h: brickHeight, i: i, j: j})
        .color(brickColors[(i + j) % 5]);
      } else {
        Crafty.e('Brick, Obstacle')
        .attr({x: curX + brickDX, y: curY + brickDX, w: brickWidht, h: brickHeight, i: i, j: j})
        .color(gameBackgrounds[COLOR]);
      }
      curX += 2 * brickDX;
      curX += brickWidht;
    }
    curY += 2 * brickDX;
    curY += brickHeight;
    curX = 0;
  }
});