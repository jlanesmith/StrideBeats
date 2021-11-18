import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function Search(props) {
  const { open , onCancel, onSearch } = props;

  const [searchTitle, setSearchTitle] = React.useState("");
  const [searchArtist, setSearchArtist] = React.useState("");
  const [searchBpmMin, setSearchBpmMin] = React.useState("");
  const [searchBpmMax, setSearchBpmMax] = React.useState("");

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          onCancel();
        }}> 
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.text} >Song Title</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setSearchTitle}
              value={searchTitle}
              placeholder="Song Title"
            />
            <Text style={styles.text} >Artist</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setSearchArtist}
              value={searchArtist}
              placeholder="Artist"
            />
            <Text style={styles.text} >Minimum BPM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {setSearchBpmMin(text.replace(/[^0-9]/g, ''))}}
              value={searchBpmMin}
              placeholder="100"
            />
            <Text style={styles.text} >Maximum BPM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {setSearchBpmMax(text.replace(/[^0-9]/g, ''))}}
              value={searchBpmMax}
              placeholder="200"
            />
            <View style={styles.bottomContainer}>
              <View style={styles.cancelContainer}>
                <TouchableOpacity onPress={onCancel}>            
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => { 
                  onSearch(searchTitle, searchArtist, searchBpmMin, searchBpmMax);                
                }}>
                  <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
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
  text: {
    fontSize: 22,
    marginTop: 16,
    marginBottom: 4
  },
  textInput: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    margin: 6
  },
  cancelContainer: {
    width: '50%',
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 12
  },
  cancelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    margin: 10
  },
  searchContainer: {
    width: '50%',
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12
  },
  searchText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    margin: 10
  }
});
