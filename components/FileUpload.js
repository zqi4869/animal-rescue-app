import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { getImageUri, fetchPost } from "../page/utils/http";

const FileUpload = ({ onUploadSuccess }) => {
  const [uploadImageName, setUploadImageName] = useState(null);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('Picker error: ', response.error);
      } else {
        // console.log(response)
        const imageUri = response.assets?.[0]?.uri
        RNFS.readFile(imageUri, 'base64').then((base64Image) => {
          fetchPost('/user/upload', {
            base64: base64Image,
            fileName: response.assets?.[0]?.fileName,
          }, (imageName) => {
            onUploadSuccess(imageName)
            setUploadImageName(imageName)
          })
        })
      }
    });
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {
        uploadImageName ? <Image
          style={styles.preview}
          source={{ uri: getImageUri(uploadImageName) }}
        /> : <View style={styles.upload}>
          <AntDesignIcon name="upload" size={50}  />
          <Text>Click to upload picture</Text>
        </View>
      }
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
  },
  preview: {
    marginBottom: 20,
    height: 200,
  }
});

export default FileUpload;
