import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Review from './Review';

const BbsScreen = ({navigation}) => {
  const [dataList, setDataList] = useState([
    {
      id: 1,
      name: '张三',
      createTime: '2024-05-01 12:30:00',
      content: '小猫小猫小猫小猫',
      url: '../image/avator.jpg',
      like: 12,
      reviewDisplay: false,
      reviews: [
        {
          id: 1,
          name: '11111111111111111',
          createTime: '2024-05-01 12:30:00',
          content: '小猫小猫小猫小猫',
          like: 12,
        },
        {
          id: 2,
          name: '222222222222222',
          createTime: '2024-05-01 12:30:00',
          content: '小猫小猫小猫小猫',
          like: 12,
        },
      ],
    },
    {
      id: 2,
      name: '李四',
      createTime: '2023-05-01 12:30:00',
      content: '小猫小猫小猫小猫',
      url: '../image/avator.jpg',
      like: 45,
      reviewDisplay: false,
      reviews: [],
    },
  ]);
  const renderItem = ({item, index, separators}) => (
    <View style={styles.card}>
      <View style={styles.card.row}>
        <Image
          style={styles.card.avatar}
          source={require('../image/avator.jpg')}
        />
        <View>
          <Text style={styles.card.name}>{item.name}</Text>
          <Text>{item.createTime}</Text>
        </View>
      </View>
      <View style={styles.card.row}>
        <Text>{item.content}</Text>
      </View>
      <View style={styles.card.row}>
        <Image
          style={styles.card.coverImg}
          source={require('../image/avator.jpg')}
        />
      </View>
      <View style={styles.card.toolbar}>
        <TouchableOpacity
          style={styles.card.toolbar.item}
          onPress={() => onShowReview(item)}>
          <AntDesignIcon name="message1" size={18} style={styles.mr5} />
          <Text>{item.reviews.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card.toolbar.item} onPress={() => onLike(item)}>
          <AntDesignIcon name="like2" size={18} style={styles.mr5} />
          <Text>{item.like}</Text>
        </TouchableOpacity>
      </View>

      {/*Review content*/}
      {item.reviewDisplay && <Review reviews={item.reviews} />}
    </View>
  );

  const onShowReview = item => {
    item.reviewDisplay = !item.reviewDisplay;
    setDataList([...dataList]); // re-render
  };

  const onLike = item => {
    // TODO: update like count
  };

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          onPress={() => navigation.navigate('NewPost')}
          icon={<AntDesignIcon name="pluscircle" size={24} color="#ffba41" />}
          radius="50"
        />
      ),
    });
  }, [navigation]);

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
    // justifyContent: 'center',
    padding: 10,
  },
  flatList: {
    width: '100%',
  },
  mr5: {
    marginRight: 5,
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
      marginTop: 10,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
      },
    },
  },
});

export default BbsScreen;
