import React, {useState} from 'react';
import {StyleSheet, View, Alert, TextInput} from 'react-native';
import {Button} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FileUpload from '../../components/FileUpload';
import { getImageUri, fetchPost } from "../utils/http";
import { GlobalStorage } from "../utils/store";

const NewArticle = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img_url, setImg_url] = useState('');

  const onUploadSuccess = imageName => {
    setImg_url(imageName);
  };

  const onSave = () => {
    if (title && content) {
      GlobalStorage('loginUser', 'json').then(loginUser => {
        fetchPost('/article/save', {
          title,
          content,
          img_url,
          user_id: loginUser.id,
        }, () => {
          Alert.alert('Message', 'Save successfully');
          navigation.goBack();
        })
      }).catch(() => {
        console.log(1111111111)
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
        <FileUpload onUploadSuccess={onUploadSuccess} />
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
