import Phaser from 'phaser'
import { Game } from './scenes/Game'
import { StartMenu } from './scenes/StartMenu'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  parent: 'phaser',
  scene: [StartMenu, Game],
}

const game = new Phaser.Game(config)
