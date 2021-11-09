import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { TapGestureHandler, RotationGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import {
  LongPressGestureHandler,
  PinchGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

var songPlaying = null;

var audio = null;

var songState = {
  firstSong: true,
  songPlaying: false,
  prevSong: -1,
  songNumber: 1,
  panStartX: -1,
  panStartY: -1,
  poll: 0,
  speed_increase: false,
  speed_decrease: false,
};

export class RunControl extends Component {
  doubleTapRef = React.createRef();
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if(songState.songPlaying) {
        songState.songPlaying = false
        //PAUSE THE SONG
      }
      this.props.navigation.navigate('Home');
    }
  };
  _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert(this.props.playlist.key);
    }
  };
  _onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.props.navigation.navigate('Home')
    }
  };
  _onPanHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) {
      console.log(nativeEvent.x, nativeEvent.y)
      songState.panStartX = nativeEvent.x
      songState.panStartY = nativeEvent.y
      songState.poll = 0
    }

    if (nativeEvent.state === State.ACTIVE) {
      songState.poll = songState.poll + 1
      var deltaX = songState.panStartX - nativeEvent.x
      var deltaY = songState.panStartY - nativeEvent.y
      console.log(deltaY);
      console.log(deltaX);
      if(Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY > 0) {
          console.log("entered increase")
          //ADD THE HAPTIC BEHAVIOUR 

          if (!songState.speed_increase) {
            songState.speed_increase = true
          }

          if (songState.speed_decrease) {
            songState.speed_decrease = false
          }
        } else {
          console.log("entered decrease")
          //ADD THE HAPTIC BEHAVIOUR

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
      console.log("end", "poll:", songState.poll)
      var deltaX = songState.panStartX - nativeEvent.x
      var deltaY = songState.panStartY - nativeEvent.y

      console.log(deltaX, deltaY)

      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX < 0) {
          console.log('skip to prev')
          if (songState.prevSong != -1) {
            var temp = songState.songNumber
            songState.songNumber = songState.prevSong
            songState.prevSong = temp
            songState.firstSong = true
            if (audio != null) {
              audio.pause()
            }
            //PLAY THE SONG
          }
          //left swipe (skip to Next Song)
        } else {

          console.log('skip to next')

          songState.prevSong = songState.songNumber

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
        if (deltaY > 0) {

          console.log('increase song')
          //STOP THE INCREASE HAPtIC
          //CALCULATE HOW FAST
        } else {
          console.log('decrease song')
          //STOP THE DECREASE
          //CALCULATE HOW FAST

        }
        //PLAY THE SONG
      }
    }

  };
  render() {
    return (
      <PinchGestureHandler
        onHandlerStateChange={this._onPinchHandlerStateChange}>
        <PanGestureHandler
          onHandlerStateChange={this._onPanHandlerStateChange}>
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
