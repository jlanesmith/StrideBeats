import React, { Component, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';

import { TapGestureHandler, PinchGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';

import * as Haptics from 'expo-haptics';
import { callNextSong } from '../components/callNextSong';
import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';

var currentPace = 140;

export var currentBPM = 140;

var nextSongBPM = -1;
var nextSong = [];

var songState = {
  firstSong: true,
  songPlaying: false,
  prevSong: null,
  currentSong: null,
  panStartX: -1,
  panStartY: -1,
  poll: 0,
  speed_increase: false,
  speed_decrease: false,
};

// Unused variables (not sure why they're here)
var audio = null;
var timer = null;
var iterationOfTimer = 0;
var firstTimer = true;

var interval = null;
var BPMChange = 4;

const sound = new Audio.Sound();

function hapticHeavy() {
  if (Platform.OS !== 'web')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}
function hapticSuccess() {
  if (Platform.OS !== 'web')
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export class RunControl extends Component {

  doubleTapRef = React.createRef();

  _onPinchHandlerStateChange = async event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (songState.songPlaying) {

        await sound.stopAsync();
      }

      if (songState.currentSong != null){
        await sound.unloadAsync();
      }
      songState.songPlaying = false;
      songState.firstSong = true;
      songState.currentSong = null;
      currentBPM = 140;
      nextSongBPM = -1;
      this.props.navigation.navigate('Home');
    }
  };
  
  _onDoubleTap = async event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (songState.songPlaying) {

        await sound.stopAsync();
      }

      if (songState.currentSong != null){
        await sound.unloadAsync();
      }
      songState.songPlaying = false;
      songState.firstSong = true;
      songState.currentSong = null;
      currentBPM = 140;
      nextSongBPM = -1;
      this.props.navigation.navigate('Home');
    }
  };

  _onSingleTap = async event => {
    if (event.nativeEvent.state === State.END) {
      
      if (songState.songPlaying) {
        songState.songPlaying = false
        //PAUSE THE SONG
        try {
          await sound.pauseAsync()
        } catch(err) {
          alert("Please wait for audio to load!")
        }
      } else {
        songState.songPlaying = true
        //PLAY THE SONG
        var playlist = this.props.playlist;
        if (songState.currentSong == null) {
          if(currentPace != 0 ){
            currentBPM = currentPace
          }
          songState.currentSong = callNextSong(currentBPM, playlist)
        }
        if (songState.firstSong) {
          await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

          await sound.loadAsync(songState.currentSong.path);
          songState.firstSong = false;
        }
        console.log("play/paused called: on", songState.currentSong.key)

        await sound.playAsync();  
      }
    }
  };
  
  _onPanHandlerStateChange = async ({ nativeEvent }) => {
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
            hapticHeavy();

            interval = setInterval(myFunction, 1000 / ((currentBPM + i) / 60));
          }
          hapticHeavy();
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
            nextSongBPM = currentBPM - i;
            hapticHeavy();

            interval = setInterval(myFunction, 1000 / ((currentBPM - i) / 60));
          }
          hapticHeavy();
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
          if (songState.prevSong != null) {
            var temp = songState.currentSong
            songState.currentSong = songState.prevSong
            songState.prevSong = temp
            songState.firstSong = true
            currentBPM = songState.currentSong.BPM
            nextSongBPM = songState.currentSong.BPM

            if (songState.songPlaying) {
              sound.pauseAsync()
            }


            if (songState.firstSong) {
              await sound.unloadAsync()
              await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
              await sound.loadAsync(songState.currentSong.path);
              songState.firstSong = false;
            }
            await sound.playAsync();
          }
          //left swipe (skip to Next Song)
        } else if (deltaX > 0) {

          console.log('skip to next')
          console.log(currentBPM)

          songState.prevSong = songState.currentSong

          if (songState.speed_increase) {
            songState.prevSong = songState.currentSong;
            var playlist = this.props.playlist
            console.log(nextSongBPM)
            nextSong = callNextSong(nextSongBPM, playlist);
            songState.speed_increase = false;
            songState.currentSong = nextSong;  // INSERT NEW CURRENT SONG KEY
            currentBPM = nextSongBPM;
            // Figure out the next song to play based off of BPM increase
          } else if (songState.speed_decrease) {
            songState.prevSong = songState.currentSong;
            var playlist = this.props.playlist
            nextSong = callNextSong(nextSongBPM, playlist);
            songState.currentSong = nextSong;  // INSERT NEW CURRENT SONG KEY
            currentBPM = nextSongBPM;
            songState.speed_decrease = false

            // Figure out the next song to play based off of BPM decrease

          } else {

            //NO INCREASE/DECREASE 
            // Select a song at the BPM of the person's current pace
            nextSongBPM = Platform.OS == 'ios' ? currentPace : currentBPM;
            songState.prevSongKey = songState.currentSongKey;
            var playlist = this.props.playlist;
            nextSong = callNextSong(nextSongBPM, playlist);
            songState.currentSong = nextSong;  // INSERT NEW CURRENT SONG KEY
          }
          songState.firstSong = true
          //firstSong reloads the song (starts it from the begining)

          if (songState.songPlaying) {
            sound.pauseAsync()
          }

          if (songState.firstSong) {
            await sound.unloadAsync()
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
            await sound.loadAsync(songState.currentSong.path);
            songState.firstSong = false;
          }
          await sound.playAsync();

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
          hapticSuccess();
          //CALCULATE HOW FAST
        } else {
          console.log('decrease song')
          //STOP THE DECREASE
          hapticSuccess();
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
        >
          <TapGestureHandler
            onHandlerStateChange={this._onSingleTap}
            waitFor={this.doubleTapRef}>
            <TapGestureHandler
              ref={this.doubleTapRef}
              onHandlerStateChange={this._onDoubleTap}
              numberOfTaps={2}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                <Image
                  style = {{
                    height: '80%',
                    width: '80%',
                    resizeMode: 'contain'
                  }}
                  source={require("../assets/gesture-instructions.png")}
                />
              </View> 
            </TapGestureHandler>
          </TapGestureHandler>
        </PanGestureHandler>
      </PinchGestureHandler>
    );
  }
}

export default function RunScreen({ route, navigation }) {

  const selectedPlaylist = route.params;

  if (Platform.OS === 'ios') {

      setInterval(async() => {
        
        
          await Pedometer.getStepCountAsync(new Date(Date.now()-5000), new Date(Date.now())).then(
          result => {
            currentPace= 12 *result.steps
          },
          error => {
            console.log("error getting steps, defaulting to 140")
            currentPace= 140
          }
        
        )
          console.log("outside ped", currentPace)
      }, 5000);

      // return () => clearInterval(interval);
      // console.log(Pedometer.getStepCountAsync(new Date(Date.now()-500000), new Date(Date.now()-100000)));
  }

  return (  
      <RunControl playlist={selectedPlaylist} navigation={navigation} />    
  );
}
