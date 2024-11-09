import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FileUpload from "../../components/FileUpload";
import { simplePost } from "../utils/request";

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const onSubmit = () => {
    simplePost('/user/save', {
      username,
      password,
      avatar
    }, () => {
      navigation.goBack()
    })
  };

  const onUploadSuccess = imageName => {
    setAvatar(imageName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Username"
          value={username}
          onChangeText={name => setUsername(name)}
        />
        <Input
          label="Password"
          value={password}
          type="password"
          onChangeText={pwd => setPassword(pwd)}
        />
        <FileUpload onUploadSuccess={onUploadSuccess} />
        <Button
          color="warning"
          icon={<AntDesignIcon name="save" size={20} color="#fff" />}
          onPress={onSubmit}
        >  Submit</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  form: {
    width: '100%',
  },
});

export default SignUp;
