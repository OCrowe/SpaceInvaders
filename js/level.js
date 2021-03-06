  var levelData = {  // --- Enemy level flock data --- \\
     1:  [[0,0,0,0,4,4,4,0,0,0,0],
          [0,0,0,0,3,3,3,0,0,0,0],
          [0,0,0,0,2,2,2,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,1,1,1,1,1,0,0,0],
          [0,0,0,1,1,1,1,1,0,0,0]],
      
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
      
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,4,4,4,4,4,4,4,4,4,0],
          [0,4,4,4,4,4,4,4,4,4,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0]],

      4: [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,4,4,4,4,4,4,4,4,4,0],
          [0,4,4,4,4,4,4,4,4,4,0],
          [0,4,4,4,4,4,4,4,4,4,0],
          [0,4,4,4,4,4,4,4,4,4,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,3,3,3,3,3,3,3,3,3,0]],

     5:  [[4,4,4,4,4,4,4,4,4,4,4],
          [4,4,4,4,4,4,4,4,4,4,4],
          [3,3,3,3,3,3,3,3,3,3,3],
          [3,3,3,3,3,3,3,3,3,3,3],
          [3,3,3,3,3,3,3,3,3,3,3],
          [2,2,2,2,2,2,2,2,2,2,2],
          [2,2,2,2,2,2,2,2,2,2,2],
          [2,2,2,2,2,2,2,2,2,2,2],
          [1,1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1,1]] };

  var spriteData = { // --- Sprite Data --- \\
    'alien1': { sx: 0,  sy: 0,  w: 23, h: 18, cls: AlienBP, frames: 2 },
    'alien2': { sx: 0,  sy: 18, w: 23, h: 18, cls: AlienYG, frames: 2 },
    'alien3': { sx: 0,  sy: 36, w: 23, h: 18, cls: AlienBO, frames: 2 },
    'alien4': { sx: 0,  sy: 54, w: 23, h: 18, cls: AlienRB, frames: 2 },
    'playerA': { sx: 0,  sy: 72, w: 26, h: 16, cls: playerA },
    'playerB': { sx: 27,  sy: 72, w: 26, h: 16, cls: playerB },
    'missile': { sx: 0,  sy: 86, w: 3,  h: 13, cls: Missile }
  }

  function startGame() {
    var screen = new GameScreen("Alien Invaders", "press enter to start.", "Player 1 A & D to move, W to shoot.", "Player 2 left & right to move, up to shoot.",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("Game Over","(press enter to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","(press enter to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

  $(function() { // --- Sound effects --- \\
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/explosion.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



