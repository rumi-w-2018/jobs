import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide = index => {
    if (index === this.props.data.length - 1) {
      return (
        // prettier-ignore
        <Button
          title="Onwards" 
          buttonStyle={styles.buttonStyle} 
          raised 
          onPress={this.props.onComplete}   // Don't add ()-it will execute as soon as button is rendered
          />
      );
    }
  };

  renderSlides = () => {
    return this.props.data.map((item, i) => {
      return (
        <View key={i} style={[styles.slideStyle, { backgroundColor: item.color }]}>
          <Text style={styles.textStyle}>{item.text}</Text>
          {this.renderLastSlide(i)}
        </View>
      );
    });
  };

  // ScrollView renders all its react child components at once
  render() {
    return (
      // prettier-ignore
      <ScrollView 
        horizontal 
        pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  textStyle: {
    color: '#fff',
    fontSize: 30
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
};

export default Slides;
