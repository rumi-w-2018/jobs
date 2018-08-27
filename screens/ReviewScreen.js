import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

// When React Navigation renders a component, a set of props are passed to the component
// navigation is one of them
class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0,122,255,1)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  applyBtnPressed = url => {
    if (url) {
      Linking.openURL(url);
    }
  };

  renderLikedJobs = () => {
    // console.log('liked', this.props.likedJobs);

    return this.props.likedJobs.map(job => {
      const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job;

      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card key={job.jobkey} title={jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              initialRegion={initialRegion}
              scrollEnabled={false}
              cacheEnabled={Platform.OS === 'android'}
              style={{ flex: 1 }}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button title="Apply Now" backgroundColor="#03A9F4" onPress={() => this.applyBtnPressed(url)} />
          </View>
        </Card>
      );
    });
  };

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}
const styles = {
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

const mapStateToProps = ({ likedJobs }) => {
  return { likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
