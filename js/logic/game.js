var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var player;
var Keys = Phaser.Keyboard;
var speed = 4;
var style = 'default';
var bullets;
var fireRate = 50;
var nextFire = 0;

function preload() {
  game.load.image('bground', 'img/bgSpace1.jpg');
  game.load.image('player', 'img/spiked ship 3. small.blue__0.png');
  game.load.image('bullet', 'http://examples.phaser.io/assets/sprites/purple_ball.png');
}

function create() {

  //  Make the world larger than the actual canvas
  game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  Background images
  bground = game.add.tileSprite(0, 0, game.stage.bounds.width, game.stage.bounds.height, 'bground');

  // player sprite
  player = game.add.sprite(game.world.centerX, game.height - 100, 'player');
  player.scale.x = 0.4;
  player.scale.y = 0.4;
  player.anchor.set(0.5);

  player.angle = 0;

  // let camera to follow player
  game.camera.follow(player);
  game.camera.setSize(window.innerWidth, window.innerHeight);

  //enable physics on the player body
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  bullets.createMultiple(50, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);

  player.body.allowRotation = false;
}

function update() {
  bground.tilePosition.y += 5;
  // bground.tilePosition.x += 1;
  player.rotation = game.physics.arcade.angleToPointer(player) + Math.PI/2;
  if (game.input.activePointer.isDown)
  {
    fire();
  }
}

function render () {
  // game.debug.spriteInfo(player, 32, 450);
}

function fire() {
  if (game.time.now > nextFire && bullets.countDead() > 0)
  {
    nextFire = game.time.now + fireRate;
    var bullet = bullets.getFirstDead();
    bullet.reset(player.x - 8, player.y - 8);
    game.physics.arcade.moveToPointer(bullet, 300);
  }
}

function moveToPoint() {

}