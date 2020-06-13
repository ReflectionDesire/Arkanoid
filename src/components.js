Crafty.c('Board', {
    required: '2D, Canvas, Color, Motion, Collision, Twoway',
    init: function() {
        this.w = boardWidht[DIFF];
        this.h = boardHeight;
        this.color(boardColors[COLOR]);
        this.twoway(boardSpeed, 0);
    }
});

Crafty.c('ScoreText', {
  required: '2D, Canvas, Text',
  init: function() {
    this.x = scoreX;
    this.y = scoreY;
    this.textAlign('center');
    this.unselectable();
    this.textFont({size: '10px', family: 'arcade'});
  },
  events: {
    'UpdateFrame': function() {
      this.text(`Score: ${score}`);
    }
  }
});

Crafty.c('EditorExit', {
  required: 'Keyboard',
  events: {
    'KeyDown': function(data) {
      if (data.key == Crafty.keys.ESC) {
        Crafty.scene('menu');
        Menu.show();
      } 
    }
  }
});

Crafty.c('TimerText', {
  required: '2D, Canvas, Text',
  init: function() {
    this.x = timerX;
    this.y = scoreY;
    this.textAlign('center');
    this.unselectable();
    this.textFont({size: '10px', family: 'arcade'});
  },
  events: {
    'UpdateFrame': function() {
      this.text(`Time left: ${timeLeft}`);
    }
  }
});

Crafty.c('Brick', {
    required: '2D, Canvas, Color, Collision, Mouse',
    init: function() {
      this.color('black');
    },
    events: {
        'UpdateFrame': function() {
          if (hitDatas = this.hit('ball')) {
            score++;
            bricksAmount--;
            field[this.i][this.j] = 0; 
            this.destroy();
            if (bricksAmount == 0) {
                Crafty.scene('menu');
                Menu.load('gameFinished');
                Menu.show();
            }
          }
        },
        'Click': function() {
          if (iFeditor) {
            if (lvlField[this.i][this.j] === 0) {
              this.color(brickColors[(this.i + this.j) % 5]);
              lvlField[this.i][this.j] = 1;
            } else if (lvlField[this.i][this.j] === 1) {
              this.color(gameBackgrounds[COLOR]);
              lvlField[this.i][this.j] = 0;
            }
          }
        }
    }
});

Crafty.c('HP', {
    required: '2D, Canvas, Color',
    init: function() {
      this.h = HPSize;
      this.w = HPSize;
    },
    events: {
      'Draw': function(data) {
        data.ctx.beginPath();              
        data.ctx.lineWidth = 2;
        data.ctx.moveTo(data.pos._x + 14, data.pos._y + 14);
        data.ctx.arc(data.pos._x + 9, data.pos._y, 5, Math.PI, 2*Math.PI);
        data.ctx.arc(data.pos._x + 19, data.pos._y, 5, Math.PI, 2 * Math.PI);
        data.ctx.moveTo(data.pos._x + 14, data.pos._y + 14);
        data.ctx.lineTo(data.pos._x + 24, data.pos._y);
        this.fillCol = '#e80b6e';
        data.ctx.fillStyle = this.fillCol;
        data.ctx.strokeStyle = this.outlineCol;
        data.ctx.fill();
        data.ctx.stroke();
      }
    }
  })

Crafty.c('Wall', {
    required: '2D, Canvas, Collision, Color',
    init: function() {
      this.color('#191818');
    }
  });


Crafty.c('Ball', {
    required: '2D, Canvas, Color, Collision, Motion',
    ball: function(radius, fillCol, outlineCol) {
      this.w = this.h = radius * 2;
      this.fillCol = fillCol;
      this.outlineCol = outlineCol;
      this.collision((new Crafty.circle(this.w / 2, this.h / 2, this.w / 2))
                                .points);
      return this;
    },
    init: function() {
      this.reset();
    }, 
    reset: function() {
        let cos = Math.random();
        let sin = Math.sqrt(1 - cos * cos);
        if (Math.random() < 0.5)
          cos *= -1;
        if (Math.random() < 0.5)
          sin *= -1;
        this.vx = ballSpeed[DIFF]*cos;
        this.vy = ballSpeed[DIFF]*sin;
        this.x = ballW;
        this.y = ballH;
    },
    events: {
      'Draw': function(data) {
        data.ctx.beginPath();
        data.ctx.arc(data.pos._x + data.pos._w / 2,
                     data.pos._y + data.pos._h / 2,
                     data.pos._w / 2, 0, Math.PI * 2, false);
        this.fillCol = ballColors[COLOR];
        data.ctx.fillStyle = this.fillCol;
        data.ctx.fill();
        data.ctx.strokeStyle = this.outlineCol;
        data.ctx.lineWidth = 2;
        data.ctx.stroke();
      },
      'UpdateFrame': function() {
        if (coll = this.hit('Board')) {
          let D = this.x - boardX + this.w / 2;
          let newV = Math.sqrt(D * D + boardY * boardY);
          this.vx = D / newV * ballSpeed[DIFF];
          this.vy = -1 * boardY / newV * ballSpeed[DIFF];
        } else
        if (this.hit('wall_bottom')) {
             playerHit();
             Crafty.trigger('playerHit');
             this.reset();
         } else
         if (collisions = this.hit('Obstacle')) {
             coll = collisions[0];
             let velocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
             let vx = -this.vx / velocity;
             let vy = -this.vy / velocity;
             let cos = vx * coll.nx + vy * coll.ny;
             let sin = Math.sqrt(1 - cos * cos);
             let vx1 = coll.nx * cos - coll.ny * sin;
             let vy1 = coll.nx * sin + coll.ny * cos;
             sin = -sin;
             let vx2 = coll.nx * cos - coll.ny * sin;
             let vy2 = coll.nx * sin + coll.ny * cos;
             this.vx = vx1 + vx2 - vx;
             this.vy = vy1 + vy2 - vy;
             this.vx *= velocity;
             this.vy *= velocity;
         }
      }
    }
  });