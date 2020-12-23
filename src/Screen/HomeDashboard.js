import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
  Text,
  ImageBackground,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import {updateList} from '../actions';

import BackgroundImage from '../assets/images/background.jpg';
import Card from '../components/Card';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  home: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 36,
    borderColor: 'tomato',
    padding: 4,
    paddingLeft: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#FFFFFF',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  btn: {
    marginTop: 16,
    borderRadius: 8,
    marginLeft: '32%',
    marginRight: '32%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 8,
  },
});

const HomeDashboard = () => {
  const [title, setTitle] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?s=${title}&apikey=87b5b1d1&type=movie`,
      );

      const resJson = await response.json();

      if (resJson.Search) {
        setMoviesList(resJson.Search);
      } else {
        Snackbar.show({
          text: resJson.Error,
          duration: Snackbar.LENGTH_LONG,
        });
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Snackbar.show({
        text: 'Error in connection',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const updateState = useCallback(async () => {
    const keys = await AsyncStorage.getAllKeys();

    for (let i = 0; i < keys.length; i++) {
      const data = await AsyncStorage.getItem(keys[i]);
      dispatch(updateList(JSON.parse(data)));
    }
  }, [dispatch]);

  useEffect(() => {
    updateState();
  }, [updateState]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={45} color="blue" />
        <Text>Fetching movies...</Text>
      </View>
    );
  } else {
    return moviesList.length === 0 ? (
      <View style={styles.home}>
        <ImageBackground
          source={BackgroundImage}
          blurRadius={1}
          style={styles.background}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            inlineImageLeft="search_icon"
            blurOnSubmit={true}
            clearButtonMode="always"
            placeholder="Search for movies..."
          />
          <View style={styles.btn}>
            <Button title="Search" onPress={fetchMovies} color="#2196F3" />
          </View>
        </ImageBackground>
      </View>
    ) : (
      <View style={styles.root}>
        <ImageBackground
          source={BackgroundImage}
          blurRadius={2}
          style={styles.background}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTitle(text)}
              inlineImageLeft="search_icon"
              blurOnSubmit={true}
              clearButtonMode="always"
              placeholder="Search for movies..."
            />
            <View style={styles.btn}>
              <Button title="Search" onPress={fetchMovies} color="#2196F3" />
            </View>
            <View style={styles.grid}>
              {moviesList.map((movie, idx) => (
                <Card movie={movie} key={idx} shortlisted={true} />
              ))}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
};

export default HomeDashboard;
