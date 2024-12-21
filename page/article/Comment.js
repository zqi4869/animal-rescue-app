import React, { useState, useCallback } from 'react';
import {StyleSheet, Alert, Text, View, Image, FlatList, TextInput,TouchableOpacity} from 'react-native';
import {Button} from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { getImageUri, fetchGet, fetchPost } from "../utils/request";
import { format } from "../utils/date";
import { checkLogin, GlobalStorage } from "../utils/store";

const Comment = ({ articleId, onFresh }) => {
  const [dataList, setDataList] = useState([]);
  const [comment, setComment] = useState('');
  const [loginUser, setLoginUser] = useState({});

  const query = () => {
    // fetch comment data from server
    fetchGet('/comment/all?articleId=' + articleId, data => {
      setDataList(data);
    });
  }

  const queryLoginUser = () => {
    GlobalStorage('loginUser', 'json').then(loginUser => {
      setLoginUser(loginUser);
    }).catch(() => {
    })
  }

  useFocusEffect(
    useCallback(() => {
      query()
      queryLoginUser()
    }, [])
  );

  const onDeleteComment = item => {
    Alert.alert('Message', 'Do you want to delete this comment?', [
      {text: 'Yes', onPress: () => {
          checkLogin(() => {
            fetchPost('/comment/delete', {
              id: item.id,
            }, () =>{
              query()
              Alert.alert('Message', 'Successfully deleted')
            })
          })
        }
      },
      {text: 'No', onPress: () => console.log('No Pressed')},
    ])
  }

  const onSave = () => {
    GlobalStorage('loginUser', 'json').then(loginUser => {
      fetchPost('/comment/save', {
        article_id: articleId,
        user_id: loginUser.id,
        comment: comment,
      }, () => {
        setComment('')
        query()
        onFresh(articleId)
      })
    }).catch(() => {
      Alert.alert('Message', 'Please login first')
    })
  };

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <Image
        style={styles.card.avatar}
        source={{ uri: getImageUri(item.user.avatar) }}
      />
      <View style={{flex: 1}}>
        <Text>{item.user.first_name}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
        <View style={styles.reviewDate}>
          <Text>{format(item.create_time)}</Text>
          {
            loginUser.id === item.user.id
            &&
            <TouchableOpacity
              onPress={() => onDeleteComment(item)}>
              <AntDesignIcon name="delete" size={18} style={styles.mr5} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={dataList}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.commentInput}
        multiline
        numberOfLines={4}
        onChangeText={setComment}
        value={comment}
        placeholder="Type your comment here ..."
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Button size="sm" color="success" onPress={onSave}>
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
  reviewDate: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  commentInput: {
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
