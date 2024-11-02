import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, TextInput} from 'react-native';
import {Button, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FileUpload from '../../components/FileUpload';
import { getImageUri, fetchPost } from "../utils/http";

const NewArticle = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img_url, setImg_url] = useState('');

  const onSave = () => {
    if (title && content) {
      fetchPost('/article/save', {
        title,
        content,
        img_url,
        user_id: '6721c5f4ee78e56cd9e71d81', // todo: get user id from login
      }, () => {
        Alert.alert('Message', 'Save successfully');
        navigation.goBack();
      })
    } else {
      Alert.alert('Message', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.articleInput}
          multiline
          numberOfLines={1}
          onChangeText={setTitle}
          value={title}
          placeholder="Type title..."
          textAlignVertical="top"
        />
        <TextInput
          style={styles.articleInput}
          multiline
          numberOfLines={8}
          onChangeText={setContent}
          value={content}
          placeholder="Type your article here..."
          textAlignVertical="top"
        />
        <FileUpload />
        <Button
          color="warning"
          style={styles.button}
          icon={<AntDesignIcon name="save" size={24} color="#fff" />}
          onPress={onSave}
        >Submit</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
  },
  articleInput: {
    borderWidth: 1,
    borderColor: 'rgb(176,171,171)',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 16,
  },
});

export default NewArticle;
