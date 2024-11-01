import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, FlatList, TextInput} from 'react-native';
import {Button} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { getImageUri, fetchGet, fetchPost } from "../utils/http";
import { format } from "../utils/date";

const Comment = ({ articleId }) => {
  const [dataList, setDataList] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // fetch comment data from server
    fetchGet('/comment/all?articleId=' + articleId, data => {
      setDataList(data);
    })
  }, [articleId]);

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <Image
        style={styles.card.avatar}
        source={{ uri: getImageUri(item.user.avatar) }}
      />
      <View style={{flex: 1}}>
        <Text>{item.user.first_name}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
        <Text>{format(item.create_time)}</Text>
      </View>
    </View>
  );

  const submitComment = () => {
    fetchPost('/comment/save', {
      article_id: articleId,
      user_id: '6721c5f4ee78e56cd9e71d81', // todo: get user id from login
      comment: comment,
    }, () => {
      setText('')
    })
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={dataList}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        onChangeText={setComment}
        value={comment}
        placeholder="Type your review ..."
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Button size="sm" color="success" onPress={submitComment}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  comment: {
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(233,238,232)',
    backgroundColor: 'rgba(233,238,232,0.33)',
    padding: 10,
    flexDirection: 'row',
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 10,
    },
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgb(176,171,171)',
    borderRadius: 5,
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
});

export default Comment;
