import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import React from 'react';

import HomeDashboard from './src/Screen/HomeDashboard';
import FavouritesDashboard from './src/Screen/FavouritesDashboard';
import {createStore} from 'redux';
import movieReducer from './src/reducers/movies';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';

const store = createStore(movieReducer);

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'md-home' : 'md-home';
              } else if (route.name === 'Saved') {
                iconName = focused ? 'list-circle' : 'list-circle';
              }

              return <Ionicons name={iconName} size={30} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeDashboard} />
          <Tab.Screen name="Saved" component={FavouritesDashboard} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
