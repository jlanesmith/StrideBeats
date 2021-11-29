import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements'
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import Search from './Search'

export const allSongs = [
  {key: "Cold Shoulder", artist: "Adele", BPM: 110, path: require("../assets/sounds/Cold_Shoulder_slow.m4a")}, 
  {key: "Footloose", artist: "Kenny Loggins", BPM: 174, path: require("../assets/sounds/Footloose_very_fast.m4a")},
  {key: "Holding Out for a Hero", artist: "Bonnie Tyler", BPM: 150, path: require("../assets/sounds/Hero_fast.m4a")}, 
  {key: "My Same", artist: "Adele", BPM: 126, path: require("../assets/sounds/My_Same_med.m4a")},
  {key: "Mr. Brightside", artist: "The Killers", BPM: 148, path: require("../assets/sounds/brightside_fast.m4a")}, 
  {key: "We're Not Gonna Take It", artist: "Twisted Sister", BPM: 152, path: require("../assets/sounds/take_it_fast.m4a")},
  {key: "Shake It Off", artist: "Taylor Swift", BPM: 162, path: require("../assets/sounds/Shake_it_Off.m4a")}, 
  {key: "Rock and Roll Ain't Noise Pollution", artist: "AC/DC", BPM: 95, path: require("../assets/sounds/Rock_and_Roll.m4a")},
  {key: "American Idiot", artist: "Green Day", BPM: 186, path: require("../assets/sounds/American_Idiot.m4a")},
  {key: "James", artist: "Billy Joel", BPM: 140, path: require("../assets/sounds/James.m4a")},
  {key: "Who Knew", artist: "Pink", BPM: 140, path: require("../assets/sounds/Who_Knew.m4a")},
  {key: "White Wedding Part 1", artist: "Billy Idol", BPM: 147, path: require("../assets/sounds/White_Wedding.m4a")},
  {key: "Born To Be Wild", artist: "Steppenwolf", BPM: 146, path: require("../assets/sounds/Born_To_Be_Wild.m4a")},
  {key: "Livin on a Prayer", artist: "Bon Jovi", BPM: 123, path: require("../assets/sounds/Livin_on_a_Prayer.m4a")},
  {key: "Edge of Glory", artist: "Lady Gaga", BPM: 128, path: require("../assets/sounds/Edge_of_Glory.m4a")},
  {key: "Jessie's Girl", artist: "Rick Springfield", BPM: 132, path: require("../assets/sounds/Jessie_Girl.m4a")},
  {key: "Trouble", artist: "Pink", BPM: 135, path: require("../assets/sounds/Trouble.m4a")},
]

export default function AddSong({ route, navigation }) {
  const { mode, playlistSongs } = route.params;

  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchTitle, setSearchTitle] = React.useState("");
  const [searchArtist, setSearchArtist] = React.useState("");
  const [searchBpmMin, setSearchBpmMin] = React.useState(0);
  const [searchBpmMax, setSearchBpmMax] = React.useState(1000);

  const [selectedSort, setSelectedSort] = React.useState("none");
  const [sortDirection, setSortDirection] = React.useState(true);

  const visibleSongs = allSongs
    .filter(song => (typeof playlistSongs.find(o => o.key == song.key) == 'undefined')) // Only songs that aren't in the playlist
    .filter(song => song.key.toLowerCase().includes(searchTitle.toLowerCase()))
    .filter(song => song.artist.toLowerCase().includes(searchArtist.toLowerCase()))
    .filter(song => song.BPM >= searchBpmMin)
    .filter(song => song.BPM <= searchBpmMax);

  let sortedSongs = visibleSongs;
  if (selectedSort == "title")
    sortedSongs.sort((a,b) => sortDirection ? a.key.localeCompare(b.key) : b.key.localeCompare(a.key));
  else if (selectedSort == "artist")
    sortedSongs.sort((a,b) => sortDirection ? a.artist.localeCompare(b.artist) : b.artist.localeCompare(a.artist));
  else if (selectedSort == "bpm")
    sortedSongs.sort((a,b) => sortDirection ? a.BPM - b.BPM : b.BPM - a.BPM);

  const [checkboxes, setCheckboxes] = React.useState(new Array(sortedSongs.length).fill(0));
  const [, setUpdate] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topViewContainer}>
        <View style={styles.topView}>
          <View style={styles.iconContainer}>
            <View style={styles.iconButton}> 
              <TouchableOpacity onPress={() => setOpenSearch(true)}>
                <Icon name='search' type='material-icons' size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.clearSearchButton} 
            onPress={() => {
              setSearchTitle("");
              setSearchArtist("");
              setSearchBpmMin(0);
              setSearchBpmMax(1000);
            }}
          >
            <Text style={styles.clearSearchText}> Clear </Text>
            <Text style={styles.clearSearchText}> Search </Text>
          </TouchableOpacity>
          <View style={styles.pickerContainer}>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedSort}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedSort(itemValue)
                }>
                <Picker.Item style={styles.pickerItem} label="None" value="none" />
                <Picker.Item style={styles.pickerItem} label="Title" value="title" />
                <Picker.Item style={styles.pickerItem} label="Artist" value="artist" />
                <Picker.Item style={styles.pickerItem} label="BPM" value="bpm" />
              </Picker>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconButton}> 
              <TouchableOpacity onPress={() => setSortDirection(!sortDirection)}>
                <Icon name={sortDirection ? 'sort-amount-down-alt' : 'sort-amount-up'} type='font-awesome-5' size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.flatList}
        data={sortedSongs}
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
      <View style={styles.bottomContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate({
              name: mode,
              merge: true,
            });
          }}>            
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.saveContainer}>
          <TouchableOpacity onPress={() => {
            let songsToAdd = [];
            visibleSongs.forEach((song, index) => {
              if (checkboxes[index]) {
                songsToAdd.push(song);
              }
            });
            navigation.navigate({
              name: mode,
              params: { songs: songsToAdd },
              merge: true,
            });
          }}>
            <Text style={styles.saveText}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BlurView tint="dark" intensity={50} style={openSearch ? { position: 'absolute', height:'100%', width:'100%'} : {}}>
        <Search 
          open={openSearch} 
          onCancel={() => setOpenSearch(false)} 
          onSearch={(title, artist, bpmMin, bpmMax) => {
            setSearchTitle(title);
            setSearchArtist(artist);
            setSearchBpmMin(bpmMin == "" ? 0 : bpmMin.toString());
            setSearchBpmMax(bpmMax == "" ? 1000 :bpmMax.toString());
            setOpenSearch(false);
          }}
        />
      </BlurView>
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
    marginHorizontal: 20
  },
  iconContainer: {
    justifyContent: 'center',
  },
  iconButton: {
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
    padding: 6
  },
  clearSearchText: {
    fontSize: 18,
    textAlign: 'center'
  },
  pickerContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginRight: 10
  },
  picker: {
    width: 110,
    justifyContent: 'center'
  },
  pickerItem: {
    fontSize: 18,
    textAlign: 'center'
  },
  flatList: {
    height: Dimensions.get('window').height - 210,
    flexGrow: 0
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
  }
});
