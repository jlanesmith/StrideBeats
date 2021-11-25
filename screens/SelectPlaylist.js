import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';


export default function SelectPlaylist({ route, navigation }) {
  const { playlists } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        renderItem={({item}) => (
          <View elevation={20}>
            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Run', item)}>
              <Text style={styles.title}>{item.key}</Text>
              <Text style={styles.songNumber}>Number of songs: {item.songs.length}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  songNumber: {
    fontSize: 16,
    color: 'white'
  }
});
