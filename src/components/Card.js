import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/Octicons';
import GalleryIcon from '../assets/images/gallery.jpg';
import {useDispatch} from 'react-redux';

import {addMovie} from '../actions';
import {LABELS} from '../constants';

const styles = StyleSheet.create({
  card: {
    height: 300,
    minHeight: 300,
    width: '49%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  imgView: {
    height: '70%',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'flex-end',
    color: 'white',
    padding: 2,
    backgroundColor: 'tomato',
    borderRadius: 4,
  },
  textView: {
    padding: 4,
    marginTop: 12,
    flex: 1,
  },
  key: {width: '36%', color: '#000000', fontSize: 14},
  keyVal: {
    flexDirection: 'row',
  },
  val: {width: '64%', fontWeight: '600', color: 'grey', fontSize: 14},
});

const Card = ({movie, shortlisted}) => {
  const dispatch = useDispatch();

  const [directorName, setDirectorName] = useState('');

  const fetchDirector = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=87b5b1d1&type=movie`,
    );

    const resJson = await response.json();
    setDirectorName(resJson.Director);
  };

  const onPressIcon = async () => {
    dispatch(addMovie(movie));
    await AsyncStorage.setItem(movie.imdbID, JSON.stringify(movie));

    Snackbar.show({
      text: 'Movie saved!!',
      duration: Snackbar.LENGTH_LONG,
    });
  };

  useEffect(() => {
    fetchDirector();
  });

  return (
    <View style={styles.card}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={movie.Poster === 'N/A' ? GalleryIcon : {uri: movie.Poster}}
          progressiveRenderingEnabled={true}
        />
        {shortlisted && (
          <Icon
            name="bookmark"
            size={24}
            style={styles.icon}
            onPress={onPressIcon}
          />
        )}
      </View>
      <View style={styles.textView}>
        {Object.keys(LABELS).map((key, idx) => (
          <View style={styles.keyVal} key={idx}>
            <Text style={styles.key}>{`${LABELS[key]}: `}</Text>
            <Text style={styles.val} numberOfLines={2}>
              {LABELS[key] === 'Director' ? directorName : movie[LABELS[key]]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Card;
