'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  ViroSphere,
  Viro3DObject,
  ViroQuad
} from 'react-viro'

export class NeuralNet extends Component {
  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false
  }

  getNoTrackingUI() {
    const { isTracking, initialized } = this.state
    return (
      <ViroText text={initialized ? 'Initializing AR...' : 'No Tracking'} />
    )
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker
          target={'input'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true
            })
          }
        >
          <ViroBox position={[0, 0.05, 0]} scale={[0.1, 0.1, 0.1]} />
        </ViroARImageMarker>

        <ViroARImageMarker
          target={'hidden'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true
            })
          }
        >
          <ViroBox position={[0, 0.05, 0]} scale={[0.1, 0.1, 0.1]} />
        </ViroARImageMarker>

        <ViroARImageMarker
          target={'output'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true
            })
          }
        >
          <ViroBox position={[0, 0.05, 0]} scale={[0.1, 0.1, 0.1]} />
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
      </ViroARScene>
    )
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  textStyle: {
    flex: 0.5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: 0.5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.5
  }
})

ViroARTrackingTargets.createTargets({
  input: {
    source: require('../res/marker/marker1.png'),
    orientation: 'Up',
    physicalWidth: 0.1 // real world width in meters
  },
  hidden: {
    source: require('../res/marker/marker1.png'),
    orientation: 'Up',
    physicalWidth: 0.1 // real world width in meters
  },
  output: {
    source: require('../res/marker/marker3.png'),
    orientation: 'Up',
    physicalWidth: 0.1 // real world width in meters
  }
})

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

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.05,
      opacity: 1.0
    },
    easing: 'Bounce',
    duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0
    },
    easing: 'Bounce',
    duration: 500
  }
})

module.exports = NeuralNet
