import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Icon } from 'react-native-elements'


export default function ViewPlaylists({ route, navigation }) {

  const [playlists, setPlaylists] = React.useState(route.params.playlists);
  const [playlistToDelete, setPlaylistToDelete] = React.useState("");
  const [, setUpdate] = React.useState(0);

  React.useEffect(() => {
    if (route.params?.playlist) {
      let updatedPlaylists = playlists;
      if (route.params?.oldTitle == "") {
        updatedPlaylists.push(route.params?.playlist)
      } else {
        playlists.forEach((playlist, index) => {
          if (playlist.key == route.params?.oldTitle) {
            updatedPlaylists[index] = route.params?.playlist;
          }
        });
      }
      setPlaylists(updatedPlaylists);
      setUpdate(update => update + 1);
    }
  }, [route.params?.playlist]);
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        renderItem={({item, index}) => (
          <View style={styles.row} onPress={() => navigation.navigate('Run', {playlists})}>
            <Text style={styles.title}>{item.key}</Text>
            <View style={styles.iconViewContainer}>
              <View style={styles.iconView}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit Playlist', {mode: "Edit Playlist", playlist: item})}>
                  <Icon reverse name='edit' type='material' size={16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setPlaylistToDelete(item.key);
                  }}>
                  <Icon reverse name='trash-can-outline' type='material-community' size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.plusBotton} onPress={() => navigation.navigate('Create Playlist', {mode: "Create Playlist", playlist: {}})}>
        <Icon name='plus' type='feather' size={40} color='black' />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={playlistToDelete != ""}
        onRequestClose={() => {
          setPlaylistToDelete("");
        }}> 
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{"Are you sure you want to delete " + playlistToDelete + "?"}</Text>
            <View style={styles.bottomContainer}>
              <View style={styles.cancelContainer}>
                <TouchableOpacity onPress={() => {
                  setPlaylistToDelete("");
                }}>            
                  <Text style={styles.cancelText}> Cancel </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.deleteContainer}>        
                <TouchableOpacity onPress={() => {
                  let updatedPlaylists = playlists;
                  playlists.forEach((playlist, index) => {
                    if (playlist.key == playlistToDelete) {
                      updatedPlaylists.splice(index, 1);
                    }
                  });
                  setPlaylists(updatedPlaylists);
                  setUpdate(update => update + 1);
                  setPlaylistToDelete("");
                }}>          
                  <Text style={styles.deleteText}> Delete </Text>
                </TouchableOpacity>
              </View>
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
  },
  row: {
    backgroundColor: 'red',
    padding: 4,
    paddingLeft: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: 'center',
  },
  iconViewContainer: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  iconView: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    color: 'white',
    flexShrink: 1
  },
  plusBotton: {
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 100,
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cancelContainer: {
    width: '40%',
    margin: 10,
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
  deleteContainer: {
    width: '40%',
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12
  },
  deleteText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    margin: 10
  }
});
