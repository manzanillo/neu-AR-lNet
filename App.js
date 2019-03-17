/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} from 'react-native'

import { ViroARSceneNavigator } from 'react-viro'

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: '6399F935-AD0C-4966-A336-C2A943DA86F0' //process.env.API_KEY,
}

// Sets the default scene you want for AR and VR
var NeuralNetScene = require('./js/NeuralNet')
var HelloWorldScene = require('./js/HelloWorldScene')

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.

export default class ViroSample extends Component {
  constructor() {
    super()

    this.state = {
      sharedProps: sharedProps,
      setting: 0
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this)
    this._getNeuralNetScene = this._getNeuralNetScene.bind(this)
    this._getHelloWorldScene = this._getHelloWorldScene.bind(this)
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    )
    this._exitViro = this._exitViro.bind(this)
  }

  // Replace this function with the contents of _getHelloWorldScene() or _getNeuralNetScene()
  // if you are building a specific type of experience.
  render() {
    if (this.state.setting == 0) {
      return this._getExperienceSelector()
    } else if (this.state.setting == 1) {
      return this._getHelloWorldScene()
    } else if (this.state.setting == 2) {
      return this._getNeuralNetScene()
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(1)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>1</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(2)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>2</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getNeuralNetScene() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: NeuralNetScene }}
      />
    )
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getHelloWorldScene() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: HelloWorldScene }}
        onExitViro={this._exitViro}
      />
    )
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(settingType) {
    return () => {
      this.setState({
        setting: settingType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      setting: 0
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
})

module.exports = ViroSample
