import Phaser from 'phaser'
import { Game } from './scenes/Game'
import { StartMenu } from './scenes/StartMenu'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: 600,
  parent: 'phaser',
  scene: [StartMenu, Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 10 },
    },
  },
}
const game = new Phaser.Game(config)
