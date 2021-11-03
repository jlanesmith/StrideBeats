import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RunScreen from './screens/Run'

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText} >StrideBeats</Text>
      <Pressable style={styles.runButton} onPress={()=> navigation.navigate('Run')}>
        <Text style={styles.buttonText}> RUN </Text>
      </Pressable>
      <Pressable style={styles.viewPlaylistButton} onPress={()=> {}}>
        <Text style={styles.buttonText}> View Playlists </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Run" component={RunScreen} />
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
  },
  viewPlaylistButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default App;
