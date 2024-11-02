import React, { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import {Button, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FileUpload from "../../components/FileUpload";
import { getImageUri, fetchPost } from "../utils/http";

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    fetchPost('/user/save', {
      username,
      password,
    }, () => {
      navigation.goBack()
    })
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
        <FileUpload />
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
