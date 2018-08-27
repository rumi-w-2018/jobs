import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Deck',
    tabBarIcon: ({ tintColor }) => <Icon name="description" size={30} color={tintColor} />
  });

  renderCard = job => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={job.jobtitle} key={job.jobKey}>
        <View style={{ height: 300 }}>
          {/* prettier-ignore */}
          <MapView
            scrollEnabled={false}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            style={{ flex: 1 }}
            initialRegion={initialRegion} />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Go Back to Map"
          large
          backgroundColor="#03A9F4"
          icon={{ name: 'my-location' }}
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  };

  handleSwipeRight = job => {
    // console.log('liked job', job.jobtitle);
    this.props.likeJob(job);
  };

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        {/* prettier-ignore */}
        <Swipe
          data={this.props.jobs} 
          renderCard={this.renderCard}  
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={this.handleSwipeRight}
          keyProp="jobkey"
          />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};
const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
};
export default connect(
  mapStateToProps,
  actions
)(DeckScreen);
