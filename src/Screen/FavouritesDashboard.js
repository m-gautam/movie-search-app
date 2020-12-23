import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../components/Card';

const styles = StyleSheet.create({
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  root: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  msgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  msg: {
    fontSize: 20,
    color: 'grey',
    marginTop: 8,
  },
});

const FavouritesDashboard = () => {
  const [movies, setMovies] = useState([]);

  const movieState = useSelector((state) => state);

  const fetchSavedMovies = useCallback(async () => {
    const keys = await AsyncStorage.getAllKeys();

    let savedList = [];

    for (let i = 0; i < keys.length; i++) {
      const data = await AsyncStorage.getItem(keys[i]);
      savedList.push(JSON.parse(data));
    }
    setMovies(savedList);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSavedMovies();
    }, [fetchSavedMovies]),
  );

  if (movies.length === 0) {
    return (
      <>
        <View style={styles.msgView}>
          <Icon name="movie-open-outline" size={70} color="grey" />
          <Text style={styles.msg}>Shortlist movies to see here !</Text>
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Your List</Text>
          <View style={styles.grid}>
            {movieState.map((movie, idx) => (
              <Card movie={movie} key={idx} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default FavouritesDashboard;
