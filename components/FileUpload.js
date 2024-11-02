import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const FileUpload = ({}) => {
  const onUpload = () => {
    Alert.alert('Upload profile successful');
  };

  return (
    <TouchableOpacity onPress={onUpload}>
      <View style={styles.upload}>
        <AntDesignIcon name="upload" size={50}  />
        <Text>Click to upload picture</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  upload: {
    borderWidth: 1,
    borderColor: '#4b4141',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FileUpload;
