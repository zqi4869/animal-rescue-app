import React, { useState, useEffect, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import Comment from './Comment';
import { getImageUri, fetchGet, fetchPut } from "../utils/request";
import { format } from "../utils/date";
import { checkLogin } from "../utils/store";

const ArticleScreen = ({navigation}) => {
  const [dataList, setDataList] = useState([]);

  const onShowReview = item => {
    item.reviewDisplay = !item.reviewDisplay;
    setDataList([...dataList]); // re-render
  };

  const onLike = item => {
    checkLogin(() => {
      fetchPut('/article/like', {
        id: item.id,
      }, () => {
        item.like_num += 1;
        setDataList([...dataList])
      })
    })
  };

  const query = () => {
    fetchGet('/article/all', data => {
      setDataList(data);
    })
  }

  const onFresh = (articleId) => {
    dataList.forEach(item => {
      if (item.id === articleId) {
        item.comment_num += 1;
      }
    });
    setDataList([...dataList]); // re-render
  }

  const onAddArticle = () => {
    checkLogin(() =>{
      navigation.navigate('NewArticle');
    })
  }

  useFocusEffect(
    useCallback(() => {
      query()
    }, [])
  );

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          onPress={onAddArticle}
          icon={<AntDesignIcon name="pluscircle" size={24} color="#ffba41" />}
          radius="50"
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <View style={styles.card.row}>
        <Image
          style={styles.card.avatar}
          source={{ uri: getImageUri(item.user.avatar) }}
        />
        <View>
          <Text style={styles.card.name}>{item.user.first_name}</Text>
          <Text>{format(item.create_time)}</Text>
        </View>
      </View>
      <View style={styles.card.row}>
        <Text>{item.content}</Text>
      </View>
      {
        item.img_url
        &&
        <View style={styles.card.row}>
          <Image
            style={styles.card.coverImg}
            source={{ uri: getImageUri(item.img_url) }}
          />
        </View>
      }
      <View style={styles.card.toolbar}>
        <TouchableOpacity
          style={styles.card.toolbar.item}
          onPress={() => onShowReview(item)}>
          <AntDesignIcon name="message1" size={18} style={styles.mr5} />
          <Text>{item.comment_num}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card.toolbar.item} onPress={() => onLike(item)}>
          <AntDesignIcon name="like2" size={18} style={styles.mr5} />
          <Text>{item.like_num}</Text>
        </TouchableOpacity>
      </View>

      {item.reviewDisplay && <Comment articleId={item.id} onFresh={onFresh} />}

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

export default ArticleScreen;
