import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectPlaylist from './screens/SelectPlaylist'
import Run from './screens/Run'
import ViewPlaylists from './screens/ViewPlaylists'

let playlists = [{key: 'Playlist 1'}, {key: 'Playlist 2'}, {key: 'Playlist 3'}];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText} >StrideBeats</Text>
      <TouchableOpacity style={styles.runButton} onPress={()=> navigation.navigate('Select Playlist', {playlists})}>
        <Text style={styles.buttonText}> RUN </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewPlaylistButton} onPress={()=> navigation.navigate('My Playlists', {playlists})}>
        <Text style={styles.buttonText}> View Playlists </Text>
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
          {props  => <ViewPlaylists {...props} />}
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
    borderRadius: 32,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
  },
  viewPlaylistButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default App;
