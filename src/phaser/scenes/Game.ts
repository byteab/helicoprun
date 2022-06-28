import { Scene } from 'phaser'

const gameState = {
  graphics: Phaser.GameObjects.Graphics,
  curve: Phaser.Curves.CubicBezier,
  curvesGroup: Phaser.Physics.Arcade.StaticGroup,
}

const heightThirdPart = window.innerHeight / 3
const widthFourthPart = window.innerWidth / 4

const maximumRoadTopY = heightThirdPart - heightThirdPart / 3
const minimumRoadTopY = heightThirdPart
const roadHeigh = heightThirdPart + heightThirdPart / 3
const eachLineDistance = widthFourthPart

export class Game extends Scene {
  helicopter?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  groupOfCurves?: Phaser.Physics.Arcade.StaticGroup
  topLines?: Phaser.Physics.Arcade.StaticGroup
  bottomLines?: Phaser.Physics.Arcade.StaticGroup
  lastPointOfLine: {
    y: number
    x: number
  }
  constructor() {
    super({ key: 'Game' })
    this.lastPointOfLine = {
      y: maximumRoadTopY,
      x: -widthFourthPart,
    }
    console.log({ height: window.innerHeight, width: window.innerWidth })
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
      heightThirdPart + heightThirdPart / 2,
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
    // gameState.curvesGroup = this.physics.add.staticGroup()
    this.topLines = this.physics.add.staticGroup()
    this.bottomLines = this.physics.add.staticGroup()

    this.physics.add.collider(this.topLines, this.helicopter, () => {
      console.log('collide')
    })

    this.drawBoundaries()

    for (const _ in Array(1000).fill(0)) {
      this.drawCurve()
    }
  }

  // make the generated lines inside a boundary
  // make the lines to remove when fully overlap with the world
  // create new line when one line overlap
  // make sprite and lines to overlap

  // have a group of curves
  // add new curve to the group
  // make sure that every time we have 4 curves in the group
  // call draw curve again when one of curves are overlaping with the world
  // store latest point of prev line in an object

  drawBoundaries() {
    const graphicTop = this.add.graphics()
    graphicTop.lineStyle(1, 0xff00ff)
    graphicTop.beginPath()
    graphicTop.moveTo(0, maximumRoadTopY)
    graphicTop.lineTo(window.innerWidth, maximumRoadTopY)
    graphicTop.closePath()
    graphicTop.strokePath()

    const graphicMinTop = this.add.graphics()
    graphicMinTop.lineStyle(1, 0xffbbaa)
    graphicMinTop.beginPath()
    graphicMinTop.moveTo(0, minimumRoadTopY)
    graphicMinTop.lineTo(window.innerWidth, minimumRoadTopY)
    graphicMinTop.closePath()
    graphicMinTop.strokePath()

    //bottom boundary
    const graphicBottom = this.add.graphics()
    graphicBottom.lineStyle(1, 0xff00ff)
    graphicBottom.beginPath()
    graphicBottom.moveTo(0, heightThirdPart * 2 + heightThirdPart / 3)
    graphicBottom.lineTo(
      window.innerWidth,
      heightThirdPart * 2 + heightThirdPart / 3
    )
    graphicBottom.closePath()
    graphicBottom.strokePath()

    const graphicMinBottom = this.add.graphics()
    graphicMinBottom.lineStyle(1, 0xffbbaa)
    graphicMinBottom.beginPath()
    graphicMinBottom.moveTo(0, heightThirdPart * 2)
    graphicMinBottom.lineTo(window.innerWidth, heightThirdPart * 2)
    graphicMinBottom.closePath()
    graphicMinBottom.strokePath()
  }

  generateRandom(min: number, max: number) {
    // find diff
    const difference = max - min

    // generate random number
    let rand = Math.random()

    // multiply with difference
    rand = Math.floor(rand * difference)

    // add with min value
    rand = rand + min

    return rand
  }

  drawCurve() {
    this.lastPointOfLine.x = this.lastPointOfLine.x + eachLineDistance

    // const random = minimumRoadTopY + Math.random() * maximumRoadTopY
    // in here maximumTopY is smaller than minimumTopY
    // -------    maximum top y. eg: 10px
    //
    // -------    minimum top y. eg: 30px
    const random = this.generateRandom(maximumRoadTopY, minimumRoadTopY)

    // top line
    const graphicTop = this.add.graphics()
    graphicTop.lineStyle(1, 0x000000)
    graphicTop.beginPath()
    graphicTop.moveTo(this.lastPointOfLine.x, this.lastPointOfLine.y)
    graphicTop.lineTo(this.lastPointOfLine.x + eachLineDistance, random)
    graphicTop.closePath()
    graphicTop.strokePath()
    this.topLines?.add(graphicTop)

    // bottom line
    const graphicBottom = this.add.graphics()
    graphicBottom.lineStyle(1, 0x000000)
    graphicBottom.beginPath()
    graphicBottom.moveTo(
      this.lastPointOfLine.x,
      this.lastPointOfLine.y + roadHeigh
    )
    graphicBottom.lineTo(
      this.lastPointOfLine.x + eachLineDistance,
      random + roadHeigh
    )
    graphicBottom.closePath()
    graphicBottom.strokePath()
    this.bottomLines?.add(graphicBottom)

    this.lastPointOfLine.y = random
  }

  update(time: any): void {
    if (!this.helicopter) {
      throw new Error('helicopter game object not exists!')
    }

    if (this.topLines) {
      this.topLines.getChildren().forEach((child) => {
        const graphic = child as Phaser.GameObjects.Graphics
        graphic.x -= 3
      })
    }

    if (this.bottomLines) {
      this.bottomLines.getChildren().forEach((child) => {
        const graphic = child as Phaser.GameObjects.Graphics
        graphic.x -= 3
      })
    }

    if (this.input.activePointer.isDown) {
      // this.helicopter.y -= 2
      this.helicopter.angle = 5
    } else {
      // this.helicopter.y += 2
      this.helicopter.angle = 0
    }
  }
}
