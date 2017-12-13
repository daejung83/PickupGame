import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import { Button, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Geolocation from 'geolocation';
import axios from 'axios';
import config from '../config/config';

const color1 = config.color1;
const color2 = config.color2;

class Login extends Component {

    constructor(){
        super();

        this.state = {
            isLoading: true,
            coords: {},
            email: '',
            password: '',
            error: '',
        }
    }

    handleLogin = () => {
        axios.post(config.base_url + 'login', {   
            email: this.state.email,
            password: this.state.password,
            
        }, {
            validateStatus: function(status){
                return status < 500;
            }
        })
            .then((req) => {
                console.log(req.data);
                if(req.status === 200){
                    this.props.navigation.navigate('TabStack', {logout: this.props.navigation.navigate, cord: this.state.coords, data: req.data});            
                } else {
                    console.log('status: ' + req.status);
                    if (req.data.message) this.setState({error: req.data.message});
                    else this.setState({error: 'Incorrect Login'});
                }
            })
            .catch((e) => {
                console.error(e);
            })
        
    }

    handleSignup = () => {
        this.props.navigation.navigate('Signup',{cord: this.state.coords});
    }

    handleFacebook = () => {
        this.props.navigation.navigate('FacebookLogin');
    }

    componentDidMount(){
        try{
            Geolocation.getCurrentPosition ((err, pos) => {
                this.setState({isLoading: true})
                if(err){
                    console.log(err);
                } 
                
                console.log(pos.coords.latitude);
                console.log(pos.coords.longitude);
                this.setState({coords: pos.coords, isLoading: false});
            })
        } catch(e) {
            console.error(e);
        }
    }

    render() {
        if(this.state.isLoading){
            return (
                <View style={styles.container}>
                    <Text>Loading......</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <View style={styles.header}>
                            <Text style={styles.name}>Pickup-Game</Text>
                            <Icon
                                type={'font-awesome'}
                                name={'futbol-o'}
                                size={100}
                                color={color1}
                                iconStyle={{margin: 20}}
                            />
                        </View>
                        <FormLabel>Email</FormLabel>
                        <FormInput 
                            onChangeText={(email) => this.setState({email})} 
                            autoCapitalize={'none'}
                            placeholder={' example@example.com'}
                        />
                        <FormLabel style={{color: color1}}>password</FormLabel>
                        <FormInput 
                            secureTextEntry={true} 
                            onChangeText={(password) => this.setState({password})} 
                            autoCapitalize={'none'}
                            placeholder={' password'}
                        />
                        <FormValidationMessage>{this.state.error}</FormValidationMessage>
                        <Button
                            title={'Login'}
                            onPress={this.handleLogin}
                            buttonStyle={styles.button}
                            icon={{name: 'sign-in', type: 'font-awesome', color: color2}}
                            backgroundColor={color1}
                            color={color2}
                        />
                        <Button
                            title={'Sign Up'}
                            onPress={this.handleSignup}
                            buttonStyle={styles.button}
                            icon={{name: 'user-plus', type: 'font-awesome', color: color2}}
                            backgroundColor={color1}
                            color={color2}
                        />
                    </View>
                </View>
            );
        }
    }
}

Login.propTypes = {

};

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        color: color1,
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
        backgroundColor: color2,
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