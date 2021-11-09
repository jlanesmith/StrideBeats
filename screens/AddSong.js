import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';


export default function AddSong({ route, navigation }) {
  const playlist = route.params;

  const allSongs = [
    {key: "Song 1", artist: "Artist 1", BPM: 160, path: "path/to/song1"}, 
    {key: "Song 2", artist: "Artist 2", BPM: 110, path: "path/to/song2"},
    {key: "Song 3", artist: "Artist 1", BPM: 160, path: "path/to/song3"}, 
    {key: "Song 4", artist: "Artist 2", BPM: 110, path: "path/to/song4"},
    {key: "Song 5", artist: "Artist 1", BPM: 160, path: "path/to/song5"}, 
    {key: "Song 6", artist: "Artist 2", BPM: 110, path: "path/to/song6"},
    {key: "Song 7", artist: "Artist 1", BPM: 160, path: "path/to/song7"}, 
    {key: "Song 8", artist: "Artist 2", BPM: 110, path: "path/to/song8"},
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
