import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

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
                <View style={styles.loginContainer}>
                    <View style={styles.header}>
                        <Text style={styles.name}>Pickup-Game</Text>
                        <Icon
                            type={'font-awesome'}
                            name={'futbol-o'}
                            size={100}
                            color={'grey'}
                            iconStyle={{margin: 20}}
                        />
                    </View>
                    <TextInput
                        placeholder={' User Id'}
                        autoCapitalize={'none'}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={' Password'}
                        autoCapitalize={'none'}
                        style={styles.input}
                    />
                    <Button
                        title={'Login'}
                        onPress={this.handleLogin}
                        buttonStyle={styles.button}
                        icon={{name: 'sign-in', type: 'font-awesome'}}
                    />
                    <Button
                        title={'Sign Up'}
                        onPress={this.handleSignup}
                        buttonStyle={styles.button}
                        icon={{name: 'user-plus', type: 'font-awesome'}}
                    />
                    <Button
                        title={'Facebook Login'}
                        onPress={this.handleFacebook}
                        buttonStyle={styles.button}
                        icon={{name: 'facebook-square', type: 'font-awesome'}}
                    />
                </View>
            </View>
        );
    }
}

Login.propTypes = {

};

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        color: 'grey',
    },
    input: {
        height: 40,
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f9ede3',
    },
    loginContainer: {
        margin: 5,
        marginBottom: 6,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 5,
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    }
})

export default Login;