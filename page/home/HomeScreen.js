import React, {useState, useEffect,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {Button, SearchBar} from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { getImageUri, fetchGet } from "../utils/request";

// Get screen width
const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const [dataAll, setDataAll] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    useCallback(() => {
      // when screen is focused
      fetchGet('/animal/all', data => {
        setDataList(data);
        setDataAll([...data])
      })
    }, [])
  );

  const viewDetail = (animal) => {
    navigation.navigate('PetDetail', {
      animal,
    });
  };

  const onSearch = (text) => {
    setSearchText(text);
    const filteredData = dataAll.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setDataList(filteredData);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        platform="default"
        containerStyle={{width: '100%'}}
        inputContainerStyle={{backgroundColor: '#fff'}}
        inputStyle={{}}
        leftIconContainerStyle={{display: 'none'}}
        rightIconContainerStyle={{display: 'none'}}
        onChangeText={onSearch}
        placeholder="Search Pets..."
        placeholderTextColor="#888"
        round
        value={searchText}
      />

      <Image style={styles.badge} source={require('../image/badge.jpg')} />

      <FlatList
        numColumns={2}
        style={styles.flatList}
        data={dataList}
        renderItem={({item, index}) => (
          <View style={styles.imageItem}>
            <Image
              style={styles.image}
              source={{uri: getImageUri(item.cover_url)}}
            />
            <View style={styles.content}>
              <Text>NO：{item.no}</Text>
              <Text>Name：{item.name}</Text>
              <Text>Gender：{item.gender}</Text>
              <View style={styles.adoptBtn}>
                <Button size="sm" color="warning" onPress={() => viewDetail(item)}>
                  View Detail
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
    alignItems: 'flex-start',
    backgroundColor: '#fec41a',
  },
  badge: {
    width: '100%',
    height: 150,
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
