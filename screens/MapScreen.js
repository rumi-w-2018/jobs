import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Button, Icon } from 'react-native-elements';
import { fetchJobs } from '../actions';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Map',
    tabBarIcon: ({ tintColor }) => <Icon name="my-location" size={30} color={tintColor} />
  });

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = region => {
    // Android some times doesn't return region -> continue panning
    // console.log(region);
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    // import to addd flex: 1 to View and MapView
    // To zoom in/out Option + click
    return (
      <View style={{ flex: 1 }}>
        {/* prettier-ignore */}
        <MapView 
          style={{ flex: 1 }} 
          region={this.state.region} 
          onRegionChangeComplete={this.onRegionChangeComplete} />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ fetchJobs }, dispatch);
// };

export default connect(
  null,
  { fetchJobs }
)(MapScreen);
