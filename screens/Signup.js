import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class Signup extends Component {

    handleSignup = () => {
        this.props.navigation.navigate('TabStack', {logout: this.props.navigation.navigate});
    }

    render() {
        return (
            <View>
                <Text>Sign Up Page</Text>
                <Button
                    title={'Sign Up'}
                    onPress={this.handleSignup}
                />
            </View>
        );
    }
}

Signup.propTypes = {

};

export default Signup;