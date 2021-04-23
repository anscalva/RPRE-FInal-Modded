class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player2) {
      super(scene, x, y, texture, frame); 
      scene.add.existing(this);
 
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket');
      this.moveLeft = keyLEFT;
      this.moveRight = keyRIGHT;
      this.fire = keyUP;
      console.log("Rocket constructor");
      if(player2) {
        console.log("Player 2 ");
        this.moveLeft = keyA;
        this.moveRight = keyD;
        this.fire = keyS;
      }
    }
    update() {
    if(!this.isFiring) {
        if(this.moveLeft.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (this.moveRight.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x += this.moveSpeed;
        }
    
    }
    if(Phaser.Input.Keyboard.JustDown(this.fire)) {
        this.isFiring = true;
        this.sfxRocket.play();
    }
    if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
        this.y -= this.moveSpeed;
    }
    if(this.y <= borderUISize *3 + borderPadding){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
    }
    // end update//
    reset() {
        this.isFiring=false;
        this.y = game.config.height -borderUISize - borderPadding;
    }
  }