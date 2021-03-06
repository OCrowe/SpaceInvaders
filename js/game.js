// -------------------------- Alien Game Stuff -------------------------- \\
var AlienFlock = function AlienFlock() { // --- Alien Flock data --- \\
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
        
      if(this instanceof AlienBP)  {		// Lets the drawn aliens move and fire. Multipule ones so aliens can have different fire rates
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
        
        if(this instanceof AlienBO)  {
            if(!max[this.x] || this.y > max[this.x]) {
                max[this.x] = this.y; 
        }
        cnt++;
      } 
        
        if(this instanceof AlienYG)  {
            if(!max[this.x] || this.y > max[this.x]) {
                max[this.x] = this.y; 
        }
        cnt++;
      } 
        
        if(this instanceof AlienRB)  {
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

// --------------------------- Alien functions ---------------------------  \\

var AlienBP = function AlienBP(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

AlienBP.prototype.draw = function(canvas) { // ----- Draw aliens 
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

AlienBP.prototype.die = function() { // ---- Alien die function 
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
}

AlienBP.prototype.step = function(dt) { // --- Alien movement 
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

AlienBP.prototype.fireSometimes = function() { // --- Alien fire function. Different for ach alien class.
      if(Math.random()*100 < 10) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

var AlienYG = function AlienYG(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

AlienYG.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

AlienYG.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
}

AlienYG.prototype.step = function(dt) {
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

AlienYG.prototype.fireSometimes = function() {
      if(Math.random()*100 < 35) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

var AlienBO = function AlienBO(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

AlienBO.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

AlienBO.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
}

AlienBO.prototype.step = function(dt) {
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

AlienBO.prototype.fireSometimes = function() {
      if(Math.random()*100 < 65) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

var AlienRB = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

AlienRB.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

AlienRB.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
}

AlienRB.prototype.step = function(dt) {
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

AlienRB.prototype.fireSometimes = function() {
      if(Math.random()*100 < 90) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

// ---------------------- Player Functions ---------------------- \\

var playerA = function playerA(opts) { 
  this.reloading = 0;
}

playerA.prototype.draw = function(canvas) { // ------ Drawing player to scene
   Sprites.draw(canvas,'playerA',this.x,this.y);
}


playerA.prototype.die = function() { //------ Player die function 
  GameAudio.play('die');
  Game.callbacks['die']();
}

playerA.prototype.step = function(dt) {   // ---- player (movement and fire) control functions
  if(Game.keys['left1']) { this.x -= 100 * dt; }
  if(Game.keys['right1']) { this.x += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;

  if(Game.keys['fire1'] && this.reloading <= 0 && this.board.missiles < 100) { //----- ammount of missles player can fire
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 5;
  }
  return true;
}

var playerB = function playerB(opts) {
  this.reloading = 0;
}

playerB.prototype.draw = function(canvas) {
  Sprites.draw(canvas,'playerB',this.x,this.y);
}

playerB.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}

playerB.prototype.step = function(dt) {
  if(Game.keys['left2']) { this.x -= 100 * dt; }
  if(Game.keys['right2']) { this.x += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;

  if(Game.keys['fire2'] && this.reloading <= 0 && this.board.missiles < 100) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 5;
  }
  return true;
}

// --------------------- Missle functions --------------------- \\

var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.playerA = opts.playerA;
}

var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.playerB = opts.playerB;
}

Missile.prototype.draw = function(canvas) { // ----- Draw missles to canvas
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) { // ------ missile colliding and destorying player or alien
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() { // ----- missile being destoryed
  if(this.playerA) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

Missile.prototype.die = function() {
  if(this.playerB) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}