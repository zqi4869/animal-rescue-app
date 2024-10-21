import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import {Button, SearchBar} from '@rneui/themed';

// Get screen width
const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setDataList([
      {title: 'Text1', key: 'item1'},
      {title: 'Text2', key: 'item2'},
      {title: 'Text2', key: 'item2'},
      {title: 'Text2', key: 'item2'},
    ]);
  }, []);

  const viewPetDetail = () => {
    navigation.navigate('PetDetail', {
      params: null,
    });
  };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.logoText}>宠物领养</Text>*/}
      <SearchBar
        platform="default"
        containerStyle={{width: '100%'}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{display: 'none'}}
        rightIconContainerStyle={{display: 'none'}}
        onChangeText={newVal => console.log(newVal)}
        placeholder="Search Pets..."
        placeholderTextColor="#888"
        round
        value={searchText}
      />

      <Image style={styles.badge} source={require('../image/badge.jpg')} />
      <Text style={{marginTop: 20, color: '#000'}}>Need your help!</Text>

      <FlatList
        numColumns={2}
        style={styles.flatList}
        data={dataList}
        renderItem={({item, index, separators}) => (
          <View style={styles.imageItem}>
            <Image
              style={styles.image}
              source={require('../image/cat-1.png')}
            />
            <View style={styles.content}>
              <Text>NO：1000000</Text>
              <Text>Category：萨摩</Text>
              <Text>Gender：Male</Text>
              <View style={styles.adoptBtn}>
                <Button size="sm" color="warning" onPress={viewPetDetail}>
                  我要领养
                </Button>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fec41a',
  },
  badge: {
    width: '100%',
    height: 150,
  },
  logoText: {
    width: '100%',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#98de1b',
    color: '#fecb14',
  },
  imageItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0px 0px 10px #00000020',
    width: screenWidth / 2 - 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: 200,
    // resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  adoptBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
  flatList: {
    marginBottom: 20,
  },
});

export default HomeScreen;
