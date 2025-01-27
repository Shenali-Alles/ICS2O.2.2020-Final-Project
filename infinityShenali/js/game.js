/* global phaser */

// Copyright (c) 2021 Infinity de Guzman & Shenali Alles All rights reserved
//
// Created by Infinity de Guzman & Shenali Alles
// Created on June 2021
// This is the Phaser3 configuration file

import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js'
import GameScene1 from './gameScene1.js'
//import GameScene2 from './gameScene2.js'

// Our Game Scene
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene1 = new GameScene1()
//const gameScene2 = new GameScene2()

//* Game Scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  // Set backgroundColor
  backgroundColor: 0x050A30,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

// Load scenes
// NOTE: remember any "key" is global and CANNOT be reused (in the different scenes)
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene1', gameScene1)
//game.scene.add('gameScene2', gameScene2)

// Start title
//game.scene.start('splashScene')
//game.scene.start('gameScene1')
//game.scene.start('gameScene2')
game.scene.start('menuScene')