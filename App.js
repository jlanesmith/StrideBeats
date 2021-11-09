import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectPlaylist from './screens/SelectPlaylist'
import Run from './screens/Run'
import MyPlaylists from './screens/MyPlaylists'
import CreateEditPlaylist from './screens/CreateEditPlaylist'
import AddSong from './screens/AddSong'

let playlists = [
  {key: 'Playlist 1 a', songs: 
    [{key: "Song 1", artist: "Artist 1", BPM: 160, path: "path/to/song1"}, 
    {key: "Song 2", artist: "Artist 2", BPM: 110, path: "path/to/song2"}]
  }, 
  {key: 'Playlist 2 a', songs: 
    [{key: "Song 1", artist: "Artist 1", BPM: 160, path: "path/to/song1"}, 
    {key: "Song 2", artist: "Artist 2", BPM: 110, path: "path/to/song2"}]
  }, 
  {key: 'Playlist 3 a', songs: 
    [{key: "Song 1", artist: "Artist 1", BPM: 160, path: "path/to/song1"}, 
    {key: "Song 2", artist: "Artist 2", BPM: 110, path: "path/to/song2"}]
  }
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText} >StrideBeats</Text>
      <TouchableOpacity style={styles.runButton} onPress={()=> navigation.navigate('Select Playlist', {playlists})}>
        <Text style={styles.runText}> RUN </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.playlistsButton} onPress={()=> navigation.navigate('My Playlists', {playlists})}>
      <Text style={styles.playlistsText}> Create & Edit </Text>
      <Text style={styles.playlistsText}> Playlists </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen options={{headerShown: false}} name="Home">
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerTitleStyle: {fontSize: 32} }} name="Select Playlist" >
          {props  => <SelectPlaylist {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerTitleStyle: {fontSize: 32} }} name="Run" >
          {props  => <Run {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerTitleStyle: {fontSize: 32} }} name="My Playlists" >
          {props  => <MyPlaylists {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerTitleStyle: {fontSize: 32} }} name="Create Playlist" >
          {props  => <CreateEditPlaylist {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerTitleStyle: {fontSize: 32} }} name="Edit Playlist" >
          {props  => <CreateEditPlaylist {...props} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerTitleStyle: {fontSize: 32} }} name="Add Song" >
          {props  => <AddSong {...props} />}
        </Stack.Screen>      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 120
  },
  runButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 60,
    borderRadius: 40,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
  },
  playlistsButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center'
  },
  runText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'
  },
  playlistsText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default App;
