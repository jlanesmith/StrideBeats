import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';


export default function AddSong({ route, navigation }) {
  const playlist = route.params;

  const allSongs = [
    {key: "Cold Shoulder", artist: "Adele", BPM: 110, path: "http://www.cs.mcgill.ca/~tcurti/Cold_Shoulder_slow.m4a"}, 
    {key: "Footloose", artist: "Kenny Loggins", BPM: 174, path: "http://www.cs.mcgill.ca/~tcurti/Footloose_very_fast.m4a"},
    {key: "Holding Out for a Hero", artist: "Bonnie Tyler", BPM: 150, path: "http://www.cs.mcgill.ca/~tcurti/Hero_fast.m4a"}, 
    {key: "My Same", artist: "Adele", BPM: 126, path: "http://www.cs.mcgill.ca/~tcurti/My_Same_med.m4a"},
    {key: "Mr. Brightside", artist: "The Killers", BPM: 148, path: "http://www.cs.mcgill.ca/~tcurti/brightside_fast.m4a"}, 
    {key: "Take It All", artist: "Adele", BPM: 138, path: "http://www.cs.mcgill.ca/~tcurti/take_it_fast.m4a"},
    {key: "Shake It Off", artist: "Taylor Swift", BPM: 162, path: "http://www.cs.mcgill.ca/~tcurti/Shake_it_Off.m4a"}, 
    {key: "Rock and Roll Ain't Noise Pollution", artist: "AC/DC", BPM: 95, path: "http://www.cs.mcgill.ca/~tcurti/Rock_and_Roll.m4a"},
    {key: "American Idiot", artist: "Green Day", BPM: 186, path: "http://www.cs.mcgill.ca/~tcurti/American_Idiot.m4a"},
    {key: "James", artist: "Billy Joel", BPM: 140, path: "http://www.cs.mcgill.ca/~tcurti/James.m4a"},
    {key: "Who Knew", artist: "Pink", BPM: 140, path: "http://www.cs.mcgill.ca/~tcurti/Who_Knew.m4a"},
    {key: "White Wedding Part 1", artist: "Billy Idol", BPM: 147, path: "http://www.cs.mcgill.ca/~tcurti/White_Wedding.m4a"},
    {key: "Born To Be Wild", artist: "Steppenwolf", BPM: 146, path: "http://www.cs.mcgill.ca/~tcurti/Born_To_Be_Wild.m4a"},
    {key: "Livin on a Prayer", artist: "Bon Jovi", BPM: 123, path: "http://www.cs.mcgill.ca/~tcurti/Livin_on_a_Prayer.m4a"},
    {key: "Edge of Glory", artist: "Lady Gaga", BPM: 128, path: "http://www.cs.mcgill.ca/~tcurti/Edge_of_Glory.m4a"},
    {key: "Jessie's Girl", artist: "Rick Springfield", BPM: 132, path: "http://www.cs.mcgill.ca/~tcurti/Jessie_Girl.m4a"},
    {key: "Trouble", artist: "Pink", BPM: 135, path: "http://www.cs.mcgill.ca/~tcurti/Trouble.m4a"},
  ]
   
  const [visibleSongs, onChangeVisibleSongs] = React.useState(allSongs.filter(song => (typeof playlist.songs.find(o => o.key == song.key) == 'undefined')));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <View style={styles.textInputView}>
          {/* <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            value={text}
            placeholder="Type playlist title"
          /> */}
        </View>
        <TouchableOpacity style={styles.addSongButton} onPress={() => navigation.navigate('Add Song', {})}>
          <Text style={styles.addSongText}> Add </Text>
          <Text style={styles.addSongText}> Song </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={visibleSongs}
        renderItem={({item}) => (
          <View elevation={20}>
            {/* <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Run', {playlists})}> */}
              <Text>{item.key}</Text>
            {/* </TouchableOpacity> */}
          </View>
        )}
      />
      {/* <View style={styles.saveContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Run', {playlists})}>
          <Text style={styles.saveText}> Save </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8
  },
  row: {
    backgroundColor: 'red',
    padding: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white'
  },
  inputView: {
    flexDirection: 'row',
  },
  textInputView: {
    justifyContent: 'center',
    flex: 1
  },
  textInput: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20
  },
  addSongButton: {
    backgroundColor: 'red',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 24,
    padding: 10
  },
  addSongText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  },
  saveContainer: {
    height: 60,
    margin: 20,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12
  },
  saveText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24
  }
});
