
var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}



var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
}

Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}

Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 100) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

var Player1 = function Player1(opts) { 
  this.reloading = 0;
}

var Player2 = function Player2(opts) { 
  this.reloading = 0;
}

Player1.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player1',this.x,this.y);
}

Player2.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player2',this.x,this.y);
}


Player1.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}

Player2.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}


Player1.prototype.step = function(dt) {
  if(Game.keys1['left1']) { this.x -= 100 * dt; }
  if(Game.keys1['right1']) { this.x += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;

  if(Game.keys1['fire1'] && this.reloading <= 0 && this.board.missiles < 50) {
    GameAudio.play('fire1');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player1: true });
    this.board.missiles++;
    this.reloading = 5;
  }
    
    Player2.prototype.step = function(dt) {
  if(Game.keys2['left2']) { this.x -= 100 * dt; }
  if(Game.keys2['right2']) { this.x += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;

  if(Game.keys2['fire2'] && this.reloading <= 0 && this.board.missiles < 50) {
    GameAudio.play('fire2');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player2: true });
    this.board.missiles++;
    this.reloading = 5;
  }
        
  return true;
}


var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player1 = opts.player1;
}

var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player2 = opts.player2;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player1) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

Missile.prototype.die = function() {
  if(this.player2) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}