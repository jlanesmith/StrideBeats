import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements'


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

  const emptyArray = new Array(allSongs.length).fill(0);

  const [visibleSongs, setVisibleSongs] = React.useState(allSongs.filter(song => (typeof playlist.songs.find(o => o.key == song.key) == 'undefined')));
  const [checkboxes, setCheckboxes] = React.useState(emptyArray);
  const [, setUpdate] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topViewContainer}>
        <View style={styles.topView}>
          <View style={styles.searchContainer}>
            <View style={styles.searchButton}> 
              <TouchableOpacity onPress={() => {console.log("trash")}}>
                <Icon name='search' type='material-icons' size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.clearSearchButton} onPress={() => navigation.navigate('Add Song', {})}>
            <Text style={styles.clearSearchText}> Clear Search </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={visibleSongs}
        renderItem={({item, index}) => (
          <View elevation={20} style={styles.row}>
            <View style={styles.songArtistView}>
              <Text style={styles.songText}>{item.key}</Text>         
              <Text style={styles.otherText}>   {item.artist}</Text>         
            </View>
            <View style={styles.bpmView}>
              <Text style={styles.otherText}>BPM</Text>
              <Text style={styles.otherText}>{item.BPM}</Text>
            </View>
            <View style={styles.checkboxView}>
              <CheckBox
                checked={checkboxes[index]}
                checkedColor='white'
                uncheckedColor='white'
                onPress={() => {
                  let newCheckboxes = checkboxes;
                  newCheckboxes[index] = !checkboxes[index];
                  setCheckboxes(newCheckboxes);
                  setUpdate(update => update + 1)
                }}
              />
            </View>
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
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    color: 'white'
  },
  topViewContainer: {
    alignItems: 'center'
  },
  topView: {
    flexDirection: 'row',
  },
  searchContainer: {
    justifyContent: 'center',
  },
  searchButton: {
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1
  },
  clearSearchButton: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10
  },
  clearSearchText: {
    fontSize: 20,
    textAlign: 'center'
  },
  row: {
    backgroundColor: 'red',
    padding: 8,
    marginVertical: 6,
    flexDirection: 'row',
  },

  songArtistView: {
    width: '50%'
  },
  bpmView: {
    width: '30%'
  },
  checkboxView: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  songText: {
    color: 'white',
    fontSize: 20,
  },
  otherText: {
    color: 'white',
    fontSize: 18,
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
