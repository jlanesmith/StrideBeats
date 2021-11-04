import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'


export default function SelectPlaylist({ route, navigation }) {
  const { playlists } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Run', {playlists})}>
            <Text style={styles.title}>{item.key}</Text>
            <View style={styles.iconView}>
              <Icon reverse name='arrowright' type='antdesign' size={16} />
            </View>
          </TouchableOpacity>
        )}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    color: 'white'
  },
});
