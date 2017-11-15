import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class FacebookLogin extends Component {

    handleSignup = () => {
        this.props.navigation.navigate('TabStack', {logout: this.props.navigation.navigate});
    }

    render() {
        return (
            <View>
                <Text>Facebook Login Page</Text>
                <Button
                    title={'Sign Up'}
                    onPress={this.handleSignup}
                />
            </View>
        );
    }
}

FacebookLogin.propTypes = {

};

export default FacebookLogin;