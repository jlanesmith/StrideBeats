import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'


export default function ViewPlaylists({ route, navigation }) {
  const { playlists } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        renderItem={({item}) => (
          <View style={styles.row} onPress={() => navigation.navigate('Run', {playlists})}>
            <Text style={styles.title}>{item.key}</Text>
            <View style={styles.iconViewContainer}>
              <View style={styles.iconView}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit Playlist', {mode: "Edit Playlist", playlist: item})}>
                  <Icon reverse name='edit' type='material' size={16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("trash")}}>
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
    color: 'white'
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
  }
});
