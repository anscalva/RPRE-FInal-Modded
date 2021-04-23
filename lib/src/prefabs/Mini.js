class Mini extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed*1.75;
    }
    update() {
        this.x -= this.moveSpeed*1.75;
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
    reset() {
        this.x = game.config.width;
    }
}