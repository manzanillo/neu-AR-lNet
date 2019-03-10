'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import { ViroARScene, ViroText, ViroMaterials, ViroSphere } from 'react-viro'

export default class HelloWorldScene extends Component {
  constructor() {
    super()

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroARScene>
        <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={1}
          visible={true}
          position={[0, 0, -2]}
          materials={['blue_sphere']}
        />
        <ViroText
          text="Hello World!"
          width={2}
          height={2}
          position={[0, 0, -2]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    )
  }
}

ViroMaterials.createMaterials({
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
