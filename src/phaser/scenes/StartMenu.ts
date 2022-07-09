import { Scene } from 'phaser'

const style = {
  font: 'bold 32px Arial',
  fill: '#fff',
  boundsAlignH: 'center',
  boundsAlignV: 'center',
}

export class StartMenu extends Scene {
  startTitle?: Phaser.GameObjects.Text
  constructor() {
    super({ key: 'StartMenu' })
  }
  create() {
    this.add
      .rectangle(0, 0, window.innerWidth - 10, window.innerHeight, 0x2b0101)
      .setOrigin(0, 0)

    this.scale.lockOrientation(Phaser.Scale.LANDSCAPE)

    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2
    this.startTitle = this.add
      .text(screenCenterX, screenCenterY, 'CLICK TO START', style)
      .setOrigin(0.5)
    this.startTitle.setInteractive()
    this.startTitle.on('pointerup', () => {
      this.scale.startFullscreen()
      this.scene.stop('StartMenu')
      this.scene.start('Game')
    })
  }
}
