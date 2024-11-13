import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { getImageUri, fetchGet } from "../utils/request";

const MyAdoption = ({navigation, route}) => {
  const {userId} = route.params;
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchGet('/adoption/all?userId=' + userId, (data) => {
      setDataList(data)
    })
  }, [])

  const renderItem = ({item, index}) => (
    <View style={styles.card} key={index}>
      <View style={styles.card.row}>
        <Image style={styles.card.avatar} source={{ uri: getImageUri(item.animal.cover_url) }}/>
        <View>
          <Text style={styles.card.name}>{item.animal.name}(No.{item.animal.no})</Text>
          <Text>{item.animal.remark}</Text>
        </View>
      </View>
      <View style={styles.card.row}>
        <Text style={styles.tag}>{item.animal.city}</Text>
        <Text style={styles.tag}>{item.animal.gender}</Text>
        <Text style={styles.tag}>{item.animal.age}</Text>
        {
          item.animal.label.split('#').map((label) => {
            return <Text style={styles.tag}>{label}</Text>
          })
        }
      </View>
      <Image
        style={styles.card.coverImg}
        source={{ uri: getImageUri(item.animal.story_img_url) }}
      />
      <Text>{item.animal.story}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={dataList}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  flatList: {
    width: '100%',
  },
  tag: {
    backgroundColor: '#3ac55f',
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(233,238,232,0.33)',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: 10,
    },
    name: {
      color: '#000',
      fontWeight: 'bold',
    },
    coverImg: {
      width: '100%',
      height: 200,
      // resizeMode: 'contain',
      marginTop: 10,
    },
  },
});

export default MyAdoption;
