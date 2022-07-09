import Phaser from 'phaser'
import { Game } from './scenes/Game'
import { StartMenu } from './scenes/StartMenu'

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'phaser',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    fullscreenTarget: 'phaser',
    parent: 'phaser',
    expandParent: true,
  },
  scene: [StartMenu, Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: 0xffffff,
}
