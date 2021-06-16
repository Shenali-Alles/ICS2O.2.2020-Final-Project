/* global Phaser */

// Copyright (c) 2021 Infinity de Guzman & Shenali Alles All rights reserved
//
// Created by: Infinity de Guzman & Shenali Alles 
// Created on: June 2021
// This is the Game Scene

class GameScene extends Phaser.Scene {

  constructor () {
    super({ key: 'gameScene' })

    this.player = null
    this.platforms = null
    this.background = null
    this.signPost = null
    this.coin = null
    this.portal = null
    this.spike = null
    this.checkpoint = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#fff', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#050A30')
  }

  preload () {
    console.log('Game Scene')

    // spritesheets
    this.load.spritesheet('scene1_squareSprite', './assets/squareSprite.png', { frameWidth: 48, frameHeight: 48 })

    // images
    this.load.image('scene1_galaxyBackground', './assets/galaxyBackground.jpg')
    this.load.image('scene1_coin', './assets/coin.png')
    this.load.image('scene1_spike', './assets/spike.png')
    this.load.image('scene1_ground', './assets/platform.png')
    this.load.image('scene1_checkpoint', './assets/checkpoint.gif')
    this.load.image('scene1_portal', './assets/portal.gif')
     this.load.image('scene1_signPost', './assets/signPost.gif')
    // sound
  }

  create (data) {
    this.background = this.add.image(0, 0, 'scene1_galaxyBackground')
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    // platforms
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(100, 250, 'scene1_ground')
    this.platforms.create(292, 250, 'scene1_ground')
    this.platforms.create(484, 250, 'scene1_ground')
    this.platforms.create(676, 250, 'scene1_ground')
    this.platforms.create(868, 250, 'scene1_ground')
    this.platforms.create(1060, 250, 'scene1_ground')
    this.platforms.create(1252, 250, 'scene1_ground')
    this.platforms.create(1444, 250, 'scene1_ground')
    
    this.platforms.create(1820, 520, 'scene1_ground')
    this.platforms.create(1628, 520, 'scene1_ground')    
    this.platforms.create(1436, 520, 'scene1_ground')
    this.platforms.create(1244, 520, 'scene1_ground')
    this.platforms.create(1052, 520, 'scene1_ground')
    this.platforms.create(860, 520, 'scene1_ground')
    this.platforms.create(668, 520, 'scene1_ground')
    this.platforms.create(476, 520, 'scene1_ground')

    this.platforms.create(100, 790, 'scene1_ground')
    this.platforms.create(292, 790, 'scene1_ground')
    this.platforms.create(484, 790, 'scene1_ground')
    this.platforms.create(676, 790, 'scene1_ground')
    this.platforms.create(868, 790, 'scene1_ground')
    this.platforms.create(1060, 790, 'scene1_ground')
    this.platforms.create(1252, 790, 'scene1_ground')
    this.platforms.create(1444, 790, 'scene1_ground')

    // checkpoint
    this.checkpoint = this.add.sprite (1800, 439, 'scene1_checkpoint')

    // portal
    this.portal = this.add.sprite (1500, 730, 'scene1_portal')

    // spike
    this.spike = this.physics.add.staticGroup()
    this.spike.create(1200, 480, 'scene1_spike')
    this.spike.create(1190, 480, 'scene1_spike')
    this.spike.create(1000, 480, 'scene1_spike')

    // coin
    this.coin = this.physics.add.sprite (1190, 430, 'scene1_coin')

    // sign posts
    this.signPost1 = this.add.sprite (500, 175, 'scene1_signPost').setScale(0.8)

    // player
    this.player = this.physics.add.sprite (100, 199, 'scene1_squareSprite');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('scene1_squareSprite', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    })

    // collision between player and platforms
    this.physics.add.collider(this.player, this.platforms)

    // collision between spikes and platforms
    this.physics.add.collider(this.spike, this.platforms)

    // collision between player and spikes
    this.physics.add.collider(this.player, this.spike)

    // collision between spike and coin
    this.physics.add.collider(this.coin, this.spike)

    // collision between the player and coins
    this.physics.add.collider(this.player, this.coin, function(playerCollide, coinCollide) {
      coinCollide.setActive(false).setVisible(false);
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
    })
  }

  update (time, delta) {
    // called 60 times a second, hopefully!
    const keySpaceObj = this.input.keyboard.addKey('SPACE') // Get key object
    const keyLeftObj = this.input.keyboard.addKey('LEFT') // Get key object
    const keyRightObj = this.input.keyboard.addKey('RIGHT') // Get key object

    if (keyLeftObj.isDown === true) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (keyRightObj.isDown === true) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    }

    if (keySpaceObj.isDown === true && this.player.body.touching.down) {
      this.player.setVelocityY(-200)
    }
  }
}

export default GameScene
