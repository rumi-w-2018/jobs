import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { facebookLogin } from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();

    // To remove token from the storage - for testing.
    // AsyncStorage.removeItem('fb_token');
  }

  shouldComponentUpdate(nextProps) {
    // console.log('auth should component update');
    if (nextProps.token) {
      this.props.navigation.navigate('map');
      return false;
    }
    return true;
  }

  render() {
    return <View />;
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ facebookLogin }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
