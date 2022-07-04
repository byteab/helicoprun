import Phaser from 'phaser'
import { Game } from './scenes/Game'
import { StartMenu } from './scenes/StartMenu'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'phaser',
  // scene: [StartMenu, Game],
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: 0xffffff,
}
const game = new Phaser.Game(config)
