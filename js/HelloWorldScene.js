'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import {
  ViroARScene,
  ViroMaterials,
  ViroSphere,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroAnimations,
  ViroBox
} from 'react-viro'
import { Z_FULL_FLUSH } from 'zlib'

const distance = -0.5

const input = [[-0.15, 0, 0.15], [-0.15, 0, -0.15]]
const hidden = [[0, 0, 0.2], [0, 0, 0], [0, 0, -0.2]]
const output = [[0.15, 0, 0.15], [0.15, 0, -0.15]]

const streams = []
const streamsRef = []
const animation = {}
input.map(inputV => {
  hidden.map(hiddenV => {
    calculate(inputV, hiddenV)
  })
})

hidden.map(inputV => {
  output.map(hiddenV => {
    calculate(inputV, hiddenV)
  })
})

export default class HelloWorldScene extends Component {
  constructor() {
    super()

    this.state = {
      material: 'red_sphere'
    } // Set initial state here
  }

  staticViroSphere = input.concat(hidden).concat(output)
  layers = [
    { material: 'blue_sphere', pos: input },
    { material: 'lightblue_sphere', pos: hidden },
    { material: 'blue_sphere', pos: output }
  ]

  _setARNodeRef(component) {
    if (!this.arNodeRef) {
      this.arNodeRef = [component]
    } else {
      this.arNodeRef.push(component)
    }
  }

  changecolor() {
    streamsRef[0].setNativeProps({ materials: ['red_sphere'] })
    streamsRef[1].setNativeProps({ materials: ['red_sphere'] })
    streamsRef[2].setNativeProps({ materials: ['red_sphere'] })
  }

  render() {
    return (
      <ViroARScene>
        <ViroARPlaneSelector minHeight={0.5} minWidth={0.5}>
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
              onClick={this.changecolor.bind(this)}
              key={Math.random()}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.025}
              position={pos}
              materials={['blue_sphere']}
              ref={this._setARNodeRef.bind(this)}
            />
          ))}
          {streams.map(pos => pos)}
        </ViroARPlaneSelector>
      </ViroARScene>
    )
  }
}

function pushRef(component) {
  streamsRef.push(component)
}

function calculate(inputV, hiddenV) {
  for (let i = 0; i <= 0; i++) {
    const animationName = Math.random()
      .toString(36)
      .substring(7)

    const element = (
      <ViroSphere
        key={Math.random()}
        heightSegmentCount={20}
        widthSegmentCount={20}
        radius={0.015}
        position={inputV}
        materials={['grey_sphere']}
        animation={{ name: animationName, run: true, loop: true }}
        ref={pushRef}
      />
    )
    streams.push(element)

    const x = Math.random()
      .toString(36)
      .substring(7)
    const y = Math.random()
      .toString(36)
      .substring(7)

    const deltaX = hiddenV[0] - inputV[0]
    const deltaY = hiddenV[1] - inputV[1]
    const deltaZ = hiddenV[2] - inputV[2]

    const animation1X =
      deltaX > 0 ? `+=${Math.abs(deltaX)}` : `-=${Math.abs(deltaX)}`
    const animation1Y =
      deltaY > 0 ? `+=${Math.abs(deltaY)}` : `-=${Math.abs(deltaY)}`
    const animation1Z =
      deltaZ > 0 ? `+=${Math.abs(deltaZ)}` : `-=${Math.abs(deltaZ)}`

    const animation2X =
      deltaX > 0 ? `-=${Math.abs(deltaX)}` : `+=${Math.abs(deltaX)}`
    const animation2Y =
      deltaY > 0 ? `-=${Math.abs(deltaY)}` : `+=${Math.abs(deltaY)}`
    const animation2Z =
      deltaZ > 0 ? `-=${Math.abs(deltaZ)}` : `+=${Math.abs(deltaZ)}`

    animation[x] = {
      properties: {
        positionX: animation1X,
        positionY: animation1Y,
        positionZ: animation1Z
      },
      easing: 'Linear',
      duration: Math.round(Math.random() * (3000 - 2000)) + 2000,
      delay:
        i === 1
          ? Math.round(Math.random() * (150 - 0)) + 0
          : Math.round(Math.random() * (150 - 0)) + 1000
    }
    animation[y] = {
      properties: {
        positionX: animation2X,
        positionY: animation2Y,
        positionZ: animation2Z
      },
      easing: 'Linear',
      duration: 0
    }
    animation[animationName] = [[x, y]]
  }
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
  lightblue_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(135,206,250)'
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
