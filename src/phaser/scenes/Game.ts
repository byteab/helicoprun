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
    this.helicopter.setInteractive()
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('helicopter', {}),
      frameRate: 100,
      repeat: -1,
    })
    this.helicopter.anims.startAnimation('move')
    this.helicopter.body.allowGravity = false
    this.helicopter.refreshBody()
  }

  update(): void {

    if(!this.helicopter) {
      throw new Error('helicopter game object not exists!')
    }

    if (this.input.activePointer.isDown) {
      this.helicopter.y -= 2
      this.helicopter.angle = 5
    } else {
      this.helicopter.y += 2
      this.helicopter.angle = 0
    }

  }
}
