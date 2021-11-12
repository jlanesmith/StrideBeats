import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Icon } from 'react-native-elements'

export default function CreateEditPlaylist({ route, navigation }) {
  const { mode, playlist, allPlaylists } = route.params;
  const oldTitle = mode == "Create Playlist" ? "" : playlist.key;
  const [title, onChangeTitle] = React.useState(oldTitle);
  const [songs, setSongs] = React.useState(mode == "Create Playlist" ? [] : playlist.songs);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [, setUpdate] = React.useState(0);

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
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Type playlist title"
          />
        </View>
        <TouchableOpacity style={styles.addSongButton} onPress={() => navigation.navigate('Add Song', { mode: mode, playlistSongs: songs })}>
          <Text style={styles.addSongText}> Add </Text>
          <Text style={styles.addSongText}> Song </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={songs}
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
            <View style={styles.trashView}>
              <TouchableOpacity onPress={() => {
                  let updatedSongs = songs;
                  updatedSongs.splice(index, 1);
                  setSongs(updatedSongs);
                  setUpdate(update => update + 1);
                }}>   
                <Icon reverse name='trash-can-outline' type='material-community' size={17} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate({
              name: "My Playlists",
              merge: true,
            });
          }}>            
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.saveContainer}>        
          <TouchableOpacity onPress={() => {
            if (title.trim() == "") {
              setErrorMessage("Provide a name for your playlist first!");
            } else if (typeof allPlaylists.find(o => o.key == title.trim()) != 'undefined') {
              setErrorMessage("Sorry, a playlist with this name already exists!");
            } else if (songs.length == 0) {
              setErrorMessage("Add some songs to the playlist first!");             
            } else {
              navigation.navigate({
                name: "My Playlists",
                params: { playlist: {key: title.trim(), songs: songs}, oldTitle: oldTitle},
                merge: true,
              });
            }
          }}>          
            <Text style={styles.saveText}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorMessage != ""}
        onRequestClose={() => {
          setErrorMessage("");
        }}> 
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <View style={styles.closeModalContainer}>
              <TouchableOpacity onPress={() => {
                setErrorMessage("");
              }}>            
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8
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
    marginLeft: 24,
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
  trashView: {
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cancelContainer: {
    width: '30%',
    margin: 15,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 12
  },
  cancelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    margin: 10
  },
  saveContainer: {
    width: '30%',
    margin: 15,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12
  },
  saveText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    margin: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderWidth: 2,
    width: '80%',
    alignItems: 'center'
  },
  modalText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 24
  },
  closeModalContainer: {
    width: '30%',
    margin: 15,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 16
  },
  closeModalText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    margin: 10    
  }
});
