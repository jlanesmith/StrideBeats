import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';


export default function CreateEditPlaylist({ route, navigation }) {
  const { mode, playlist } = route.params;
  const [text, onChangeText] = React.useState(mode == "Create Playlist" ? "" : playlist.key);
  const [songs, setSongs] = React.useState(mode == "Create Playlist" ? [] : playlist.songs);

  React.useEffect(() => {
    if (route.params?.songs) {
      setSongs(songs => [...songs, ...route.params?.songs])
    }
  }, [route.params?.songs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            value={text}
            placeholder="Type playlist title"
          />
        </View>
        <TouchableOpacity style={styles.addSongButton} onPress={() => navigation.navigate('Add Song', { mode: mode, playlistSongs: playlist.songs })}>
          <Text style={styles.addSongText}> Add </Text>
          <Text style={styles.addSongText}> Song </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={songs}
        renderItem={({item}) => (
          <View elevation={20}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.title}>{item.key}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.saveContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Run', {playlists})}>
          <Text style={styles.saveText}> Save </Text>
        </TouchableOpacity>
      </View>
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
