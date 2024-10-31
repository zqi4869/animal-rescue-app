import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, FlatList, TextInput} from 'react-native';
import {Button} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Comment = ({reviews}) => {
  const [dataList, setDataList] = useState([]);
  const [text, setText] = useState([]);

  useEffect(() => {
    setDataList(reviews);
  }, [reviews]);

  const renderItem = ({item, index, separators}) => (
    <View style={styles.card}>
      <Image
        style={styles.card.avatar}
        source={require('../image/cat-1.png')}
      />
      <View style={{flex: 1}}>
        <Text>{item.name}</Text>
        <Text style={styles.black}>{item.content}</Text>
        <Text>{item.createTime}</Text>
      </View>
    </View>
  );

  const submitReview = () => {};

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
        onChangeText={setText}
        value={text}
        placeholder="Type your review ..."
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Button size="sm" color="success" onPress={submitReview}>
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
  black: {
    color: '#000',
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
