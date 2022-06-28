import { Scene } from 'phaser'
export class StartMenu extends Scene {
  create() {
    this.add.rectangle(0, 0, 400, 600, 0x00ffff).setOrigin(0, 0)
    this.add.text(200, 300, 'CLICK TO START', {
      color: '#000000',
      fontSize: '20px',
    })
  }
}
