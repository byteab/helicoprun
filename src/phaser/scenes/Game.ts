import { Scene } from 'phaser'

const gameState = {
  graphics: Phaser.GameObjects.Graphics,
  curve: Phaser.Curves.CubicBezier,
  curvesGroup: Phaser.Physics.Arcade.StaticGroup,
}

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const LINE_WIDTH = window.innerWidth / 4

const ONE_THIRD_OF_SCREEN_HEIGHT = window.innerHeight / 3
const widthFourthPart = window.innerWidth / 4

const MAXIMUM_ROAD_TOP_Y =
  ONE_THIRD_OF_SCREEN_HEIGHT - ONE_THIRD_OF_SCREEN_HEIGHT / 3

const MINIMUM_ROAD_TOP_Y = ONE_THIRD_OF_SCREEN_HEIGHT

const ROAD_HEIGHT = ONE_THIRD_OF_SCREEN_HEIGHT + ONE_THIRD_OF_SCREEN_HEIGHT / 3

export class Game extends Scene {
  helicopter?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  groupOfCurves?: Phaser.Physics.Arcade.StaticGroup
  topLines?: Phaser.Curves.Path
  bottomLines?: Phaser.Curves.Path
  moveSpeed: number
  /** used to track how many pixel landscape is moved */
  moveOffset: number
  drawer?: Phaser.GameObjects.Graphics

  constructor() {
    super({ key: 'Game' })
    this.moveOffset = 0
    this.moveSpeed = 1
  }
  preload() {
    this.load.spritesheet('helicopter', 'src/assets/helicopter.png', {
      frameWidth: 96,
      frameHeight: 32,
    })
  }

  create() {
    this.physics.world.setBounds(
      0,
      0,
      window.innerWidth * 2,
      window.innerHeight
    )

    this.add
      .rectangle(0, 0, window.innerWidth, window.innerHeight, 0xffffff)
      .setOrigin(0)
    this.helicopter = this.physics.add.sprite(
      widthFourthPart / 2,
      ONE_THIRD_OF_SCREEN_HEIGHT + ONE_THIRD_OF_SCREEN_HEIGHT / 2,
      'helicopter'
    )
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

    // Graphics part
    this.drawer = this.add.graphics()
    // gameState.curvesGroup = this.physics.add.staticGroup()
    this.topLines = new Phaser.Curves.Path()
    this.bottomLines = new Phaser.Curves.Path()

    // generate initial lines
    // consider one more line as buffer
    for (let x = 0; x <= SCREEN_WIDTH + LINE_WIDTH; x += LINE_WIDTH) {
      const topLineY = Phaser.Math.Between(
        MAXIMUM_ROAD_TOP_Y,
        MINIMUM_ROAD_TOP_Y
      )
      const BottomLineY = topLineY + ROAD_HEIGHT

      this.topLines.lineTo(x, topLineY)
      this.bottomLines.lineTo(x, BottomLineY)
    }

    this.moveOffset = 0
  }

  update(): void {
    if (!this.helicopter) {
      throw new Error('helicopter game object not exists!')
    }
    if (!this.drawer) {
      throw new Error('drawer not exists!')
    }

    if (!this.topLines?.getLength() || !this.bottomLines?.getLength()) {
      throw new Error('top and bottom lines should not be empty')
    }

    this.cameras.main.x += this.moveSpeed
    this.helicopter.x += this.moveSpeed
    this.moveOffset += this.moveSpeed

    if (this.input.activePointer.isDown) {
      this.helicopter.y -= 2
      this.helicopter.angle = 5
    } else {
      this.helicopter.y += 2
      this.helicopter.angle = 0
    }

    if (this.moveOffset >= 200) {
      console.log('move offset if clause')
      const topLineY = Phaser.Math.Between(
        MAXIMUM_ROAD_TOP_Y,
        MINIMUM_ROAD_TOP_Y
      )
      const BottomLineY = topLineY + ROAD_HEIGHT

      this.topLines.lineTo(this.topLines.getEndPoint().x + LINE_WIDTH, topLineY)
      this.bottomLines.lineTo(
        this.bottomLines.getEndPoint().x + LINE_WIDTH,
        BottomLineY
      )
      this.topLines.curves.shift()
      this.bottomLines.curves.shift()
      this.moveOffset = 0
    }

    // clear previous command to avoid necessary redraw
    this.drawer.clear()

    if (this.topLines?.curves.length) {
      this.drawLandChunk(this.topLines.curves, 'top')
    }

    if (this.bottomLines?.curves.length) {
      this.drawLandChunk(this.bottomLines.curves, 'bottom')
    }
  }

  drawLandChunk(curves: Phaser.Curves.Curve[], position: 'top' | 'bottom') {
    const yValue: number = position === 'top' ? 0 : SCREEN_HEIGHT

    const points: { x: number; y: number }[] = [
      {
        x: 0,
        y: yValue,
      },
    ]

    for (let i = 0; i < curves.length; i++) {
      const eachCurve = curves[i]
      points.push(eachCurve.getStartPoint(), eachCurve.getEndPoint())
    }

    points.push({ x: curves[curves.length - 1].getEndPoint().x, y: yValue })

    this.drawer!.fillStyle(0xcc183a)
    this.drawer!.fillPoints(points, true, true)
  }
}
