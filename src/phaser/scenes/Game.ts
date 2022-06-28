import { Scene } from 'phaser'

export class Game extends Scene {
  helicopter?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  constructor() {
    super({ key: 'Game' })
  }
  preload() {
    this.load.spritesheet('helicopter', 'src/assets/helicopter.png', {
      frameWidth: 96,
      frameHeight: 32,
    })
  }

  create() {
    this.helicopter = this.physics.add.sprite(100, 100, 'helicopter')
    const helicopterAnimation = this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('helicopter', {}),
      frameRate: 100,
      repeat: -1,
    })
    this.helicopter.anims.startAnimation('move')
  }

  update(time: number, delta: number): void {
    if (this.input.activePointer.isDown) {
      this.helicopter!.body.allowGravity = false
    } else {
      this.helicopter!.body.allowGravity = true
    }
    // if (this.input.mousePointer.isDown) {
    //   this.helicopter?.setGravityY(0).refreshBody()
    //   this.helicopter!.y -= 2
    // } else {
    //   this.helicopter?.setGravityY(10).refreshBody()
    // }
  }
}
