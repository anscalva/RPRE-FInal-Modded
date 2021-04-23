class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('mini', './assets/mini.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        // end of preload //
      }
    create() {
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      

      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, false).setOrigin(0.5, 0);
      this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, true).setOrigin(0.5, 0);

      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4.4, 'spaceship', 0, 30).setOrigin(0, 0);
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
      //mini mod insert//
      this.mini01 = new Mini(this, game.config.width, borderUISize + borderPadding + borderPadding*6, 'mini', 0, 100). setOrigin(0,0);

      this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
});
//score//
this.p1Score = 0;
this.p2Score = 0;

let scoreConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#F3B141',
  color: '#843605',
  align: 'right',
  padding: {
    top: 5,
    bottom: 5,
  },
  fixedWidth: 100
}

this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
this.scoreRight = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig).setOrigin(-4.5, 0);
this.gameOver = false;
scoreConfig.fixedWidth = 0;
this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    if(this.p1Score >= this.p2Score) {
      this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'P1 Wins!', scoreConfig).setOrigin(-1.5, 0);
    }
    else {
      this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'P2 Wins!', scoreConfig).setOrigin(-1.5, 0);
    }
    this.add.text(game.config.width/2, game.config.height/2, 
      'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 
      '‘Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
}, null, this);
    }
    // end of create //
    update() {
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene");
      }
    }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
        this.p1Rocket.update();
        this.p2Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.mini01.update();
        }
if(this.checkCollision(this.p1Rocket, this.ship03)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship03, true);   
}
if (this.checkCollision(this.p1Rocket, this.ship02)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship02, true);
}
if (this.checkCollision(this.p1Rocket, this.ship01)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship01, true);
}
if (this.checkCollision(this.p1Rocket, this.mini01)) {
  this.p1Rocket.reset();
  this.shipExplode(this.mini01, true);
}
if(this.checkCollision(this.p2Rocket, this.ship03)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship03, false);   
}
if (this.checkCollision(this.p2Rocket, this.ship02)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship02, false);
}
if (this.checkCollision(this.p2Rocket, this.ship01)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship01, false);
}
if (this.checkCollision(this.p2Rocket, this.mini01)) {
  this.p2Rocket.reset();
  this.shipExplode(this.mini01, false);
}
      }
      // end of update //
      checkCollision(rocket, ship) { if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
            return true;
    } else {
        return false;
    }
}

shipExplode(ship, isP1) {
  ship.alpha = 0;
  let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
  boom.anims.play('explode');
  boom.on('animationcomplete', () => {
    ship.reset();
    ship.alpha = 1;
    boom.destroy();
  });
  if(isP1)
    this.p1Score += ship.points;
  else
    this.p2Score += ship.points
  this.scoreLeft.text = this.p1Score;
  this.scoreRight.text = this.p2Score;
  this.sound.play('sfx_explosion');

}
}