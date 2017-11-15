import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class Login extends Component {

    handleLogin = () => {
        this.props.navigation.navigate('TabStack', {logout: this.props.navigation.navigate});
    }

    handleSignup = () => {
        this.props.navigation.navigate('Signup');
    }

    handleFacebook = () => {
        this.props.navigation.navigate('FacebookLogin');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login Page</Text>
                <TextInput
                    placeholder={'User Id'}
                    autoCapitalize={'none'}
                    style={styles.input}
                />
                <TextInput
                    placeholder={'password'}
                    autoCapitalize={'none'}
                    style={styles.input}
                />
                <Button
                    title={'Login'}
                    onPress={this.handleLogin}
                />
                <Button
                    title={'Sign Up'}
                    onPress={this.handleSignup}
                />
                <Button
                    title={'Facebook Login'}
                    onPress={this.handleFacebook}
                />
            </View>
        );
    }
}

Login.propTypes = {

};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
    },
    container: {
        flex: 1,
    }
})

export default Login;