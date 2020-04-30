import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './src/screen/Home';
import Detail from './src/screen/Detail';

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

function App() {
  console.disableYellowBox = true;
  return <AppContainer />;
}

export default App;
