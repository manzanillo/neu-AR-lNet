'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroSphere,
  ViroAmbientLight,
  ViroSpotLight,
  ViroAnimations
} from 'react-viro'

const input = [[-0.5, 0.25, -2], [-0.5, -0.25, -2]]
const hidden = [[0, 0.35, -2], [0, 0, -2], [0, -0.35, -2]]
const output = [[0.5, 0.25, -2], [0.5, -0.25, -2]]

export default class HelloWorldScene extends Component {
  constructor() {
    super()

    this.state = {} // Set initial state here
  }

  staticViroSphere = input.concat(hidden).concat(output)

  streams = [[-0.5, 0.25, -2], [-0.5, 0.25, -2], [-0.5, 0.25, -2]]
  // [0, 0.35, -2], [0, 0, -2], [0, -0.35, -2]

  render() {
    return (
      <ViroARScene>
        <ViroSpotLight
          position={[0, 0, 3]}
          color="#777777"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={40}
        />
        <ViroAmbientLight color="#eee" />

        {this.staticViroSphere.map(pos => (
          <ViroSphere
            key={Math.random()}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.1}
            position={pos}
            materials={['blue_sphere']}
          />
        ))}

        {
          // Animation
        }
        <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.05}
          visible={true}
          position={[-0.5, 0.25, -2]}
          materials={['red_sphere']}
          animation={{ name: 'pack', run: true, loop: true }}
        />
      </ViroARScene>
    )
  }
}

animation = {}

input.map(inputV => {
  hidden.map(hiddenV => {
    animation
  })
})

const animation = {
  moveRight: {
    properties: { positionX: '+=0.5', positionY: '+=0.1' },
    easing: 'Linear',
    duration: 2000
  },
  moveLeft: {
    properties: { positionX: '-=0.5', positionY: '-=0.1' },
    easing: 'Linear',
    duration: 0
  },
  pack: [['moveRight', 'moveLeft']]
}

ViroAnimations.registerAnimations(animation)

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseColor: 'rgb(231,231,231)'
  },
  quad: {
    diffuseColor: 'rgba(0,0,0,0.5)'
  },
  white_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)'
  },
  blue_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(19,42,143)'
  },
  grey_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(75,76,79)'
  },
  red_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(168,0,0)'
  }
})

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

module.exports = HelloWorldScene
