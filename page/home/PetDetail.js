import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
import {Button, ListItem, Input} from '@rneui/themed';
import { getImageUri, fetchPost } from "../utils/http";
import { GlobalStorage } from "../utils/store";

const PetDetail = ({navigation, route }) => {
  const { animal } = route.params

  const tags = [animal.city, animal.gender, animal.age].map((t, index) => (
    <View style={styles.card.tag} key={'tag-' + index}>
      <Text style={{color: 'white'}}>{t}</Text>
    </View>
  ));

  const onSave = () => {
    GlobalStorage('loginUser', 'json').then(loginUser => {
      fetchPost('/adoption/save', {
        animal_id: animal.id,
        user_id: loginUser.id,
      }, () => {
        Alert.alert('Message', 'Adopt successfully');
        navigation.goBack();
      })
    })
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.card.cardTop}>
          <Image
            style={styles.card.avatar}
            source={{uri: getImageUri(animal.cover_url)}}
          />
          <View>
            <Text style={styles.card.title}>{animal.name}</Text>
            <Text style={styles.card.text}>{animal.remark}</Text>
            <Text style={styles.card.text}>{animal.label}</Text>
          </View>
        </View>

        <View style={styles.card.tagContainer}>{tags}</View>
      </View>

      <Text style={styles.quote}>Pet story</Text>
      <View style={styles.story}>
        <Text style={styles.story.content}>{animal.story}</Text>
        <Image
          style={styles.story.img}
          source={{uri: getImageUri(animal.story_img_url)}}
        />
      </View>

      <Button
        color="warning"
        buttonStyle={styles.submit}
        onPress={onSave}
      >I want to adopt</Button>
    </ScrollView>
  );
};

const commonColor = '#6c5cd3';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    height: '100%',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: commonColor,
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
    cardTop: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 20,
    },
    title: {
      color: 'white',
      fontSize: 26,
    },
    text: {
      color: 'white',
    },
    tagContainer: {
      flexDirection: 'row',
    },
    tag: {
      color: 'white',
      margin: 5,
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'white',
    },
  },
  story: {
    alignItems: 'center',
    content: {
      fontSize: 20,
      lineHeight: 24,
    },
    img: {
      width: 200,
      height: 200,
    },
  },
  quote: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: commonColor,
    color: commonColor,
    paddingLeft: 10,
  },
  submit: {
    marginTop: 20,
    marginBottom: 30,
  }
});

export default PetDetail;
