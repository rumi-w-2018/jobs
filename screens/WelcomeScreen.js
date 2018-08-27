import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

// When React Navigation renders a component, a set of props are passed to the component
// this.props.navigation is one of them
class WelcomeScreen extends Component {
  state = { initToken: null };

  async componentWillMount() {
    let initToken = await AsyncStorage.getItem('fb_token');

    if (initToken) {
      this.props.navigation.navigate('auth');
      this.setState({ initToken });
    } else {
      this.setState({ initToken: false });
    }
  }

  onSlideComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    // Clear AyncStorage for testing
    // AsyncStorage.removeItem('fb_token');

    if (_.isNull(this.state.initToken)) {
      return <AppLoading />;
    }

    // flex:1 ensures the ScrollView fills the screen and text is aligned center
    return (
      <View style={{ flex: 1 }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete} />
      </View>
    );
  }
}

export default WelcomeScreen;
