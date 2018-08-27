import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// store/index.js exports a function that returns an object with a store and persistor.
import Store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

// store/index.js exports a function that returns an object with a store and persistor.
const { store, persistor } = Store();

class App extends Component {
  render() {
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: WelcomeScreen,
        auth: AuthScreen,
        main: {
          screen: createBottomTabNavigator(
            {
              map: MapScreen,
              deck: DeckScreen,
              review: createStackNavigator({
                review: ReviewScreen,
                settings: SettingsScreen
              })
            },
            {
              tabBarOptions: {
                labelStyle: {
                  fontSize: 12
                }
              },
              navigationOptions: {
                title: 'Review Jobs',
                tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />
              }
            }
          )
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        } // ,
        // lazy: true
      }
    );

    // To make it work for iPhoneX or iPhoneX simulator, add SafeAreaView
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
            <View style={styles.container}>
              <MainNavigator />
            </View>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});

export default App;
