import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { TapGestureHandler, RotationGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import {
  LongPressGestureHandler,
  PinchGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import * as Haptics from 'expo-haptics';

var currentBPM = 100;

var nextSongBPM = -1;

var audio = null;

var songState = {
  firstSong: true,
  songPlaying: false,
  prevSongKey: null,
  currentSongKey: null,
  panStartX: -1,
  panStartY: -1,
  poll: 0,
  speed_increase: false,
  speed_decrease: false,
};

var timer = null;
var iterationOfTimer = 0;
var firstTimer = true;

var interval = null;
var BPMChange = 4;

export class RunControl extends Component {
  doubleTapRef = React.createRef();
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (songState.songPlaying) {
        songState.songPlaying = false
        //PAUSE THE SONG
      }
      this.props.navigation.navigate('Home');
    }
  };
  _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert(this.props.playlist.key)
      if (songState.songPlaying) {
        songState.songPlaying = false
        //PAUSE THE SONG
      } else {
        songState.songPlaying = true
        //PLAY THE SONG
      }
    }
  };
  _onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.props.navigation.navigate('Home')
    }
  };

  _onPanHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) {
      songState.panStartX = nativeEvent.x
      songState.panStartY = nativeEvent.y
    }

    if (nativeEvent.state === State.ACTIVE) {

      var deltaX = songState.panStartX - nativeEvent.x
      var deltaY = songState.panStartY - nativeEvent.y
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY > 0) {
          var i = 0
          var myFunction = function () {

            clearInterval(interval);

            i = i + BPMChange;
            nextSongBPM = i + currentBPM;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

            interval = setInterval(myFunction, 1000 / ((currentBPM + i) / 60));
          }
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          interval = setInterval(myFunction, 1000 / ((currentBPM + i) / 60));

          if (!songState.speed_increase) {
            songState.speed_increase = true
          }

          if (songState.speed_decrease) {
            songState.speed_decrease = false
          }
        } else {
          var i = 0
          var myFunction = function () {

            clearInterval(interval);

            i = i + BPMChange;
            nextSongBPM = i + currentBPM;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

            interval = setInterval(myFunction, 1000 / ((currentBPM - i) / 60));
          }
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          interval = setInterval(myFunction, 1000 / ((currentBPM - i) / 60));


          if (!songState.speed_decrease) {
            songState.speed_decrease = true
          }

          if (songState.speed_increase) {
            songState.speed_increase = false
          }
        }
      }
    }

    if (nativeEvent.state === State.END) {
      var deltaX = songState.panStartX - nativeEvent.x
      var deltaY = songState.panStartY - nativeEvent.y

      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX < 0) {
          console.log('skip to prev')
          if (songState.prevSongKey != null) {
            var temp = songState.currentSongKey
            songState.currentSongKey = songState.prevSongKey
            songState.prevSongKey = temp
            songState.firstSong = true
            if (audio != null) {
              audio.pause()
            }
            //PLAY THE SONG
          }
          //left swipe (skip to Next Song)
        } else {

          console.log('skip to next')

          songState.prevSongKey = songState.currentSongKey

          if (songState.speed_increase) {
            songState.speed_increase = false

            // Figure out the next song to play based off of BPM increase

          } else if (songState.speed_decrease) {
            songState.speed_decrease = false

            // Figure out the next song to play based off of BPM decrease

          } else {

            //NO INCREASE/DECREASE 
            // Select a song at the BPM of the person's current pace

          }
          songState.firstSong = true
          //firstSong reloads the song (starts it from the begining)

          if (audio != null) {
            audio.pause()
          }

          //PLAY THE SONG

        }
      } else {
        iterationOfTimer = 0;
        timer = null;
        firstTimer = true;
        clearInterval(interval);
        interval = null;
        if (deltaY > 0) {

          console.log('increase song')
          //CONFIRM THE INCREASE HAPtIC
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          //CALCULATE HOW FAST
        } else {
          console.log('decrease song')
          //STOP THE DECREASE
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          //CALCULATE HOW FAST

        }
        //PLAY THE SONG
      }
    }

  };
  render() {
    const pan = React.createRef();
    const longPress = React.createRef();
    return (
      <PinchGestureHandler
        onHandlerStateChange={this._onPinchHandlerStateChange}>
        <PanGestureHandler
          ref={pan}
          simultaneousHandlers={longPress}
          onHandlerStateChange={this._onPanHandlerStateChange}
        // onGestureEvent={
        //   (e) => { this._onPanHandler(e, 1000 / ((iterationOfTimer + currentBPM) / 60)) }}
        >
          <TapGestureHandler
            onHandlerStateChange={this._onSingleTap}
            waitFor={this.doubleTapRef}>
            <TapGestureHandler
              ref={this.doubleTapRef}
              onHandlerStateChange={this._onDoubleTap}
              numberOfTaps={2}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
            </TapGestureHandler>
          </TapGestureHandler>
        </PanGestureHandler>
      </PinchGestureHandler>
    );
  }
}

export default function RunScreen({ route, navigation }) {

  const selectedPlaylist = route.params;

  return (
    <RunControl playlist={selectedPlaylist} navigation={navigation}></RunControl>
  );
}
