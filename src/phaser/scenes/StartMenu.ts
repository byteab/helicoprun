import { Scene } from 'phaser'
export class StartMenu extends Scene {
  startTitle?: Phaser.GameObjects.Text
  constructor() {
    super({ key: 'StartMenu' })
  }
  create() {
    this.add.rectangle(0, 0, window.innerWidth, 600, 0x00ffff).setOrigin(0, 0)
    this.startTitle = this.add.text(
      window.innerWidth / 2 - 80,
      300,
      'CLICK TO START',
      {
        color: '#000000',
        fontSize: '20px',
      }
    )
    this.startTitle.setInteractive()
    this.startTitle.on('pointerup', () => {
      this.scene.stop('StartMenu')
      this.scene.start('Game')
    })
  }
}
