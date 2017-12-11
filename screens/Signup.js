import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, ButtonGroup } from 'react-native-elements';
import axios from 'axios';

import config from '../config/config';

class Signup extends Component {

    constructor(){
        super();

        this.state = {
            name: '',
            email: '',
            preferredSportIndex: 0,
            password1: '',
            password2: '',
            errorName: '',
            emailError: '',
            passwordError: '',
        }
    }

    _checkInfo = () => {
        if(this.state.password1 === this.state.password2){
            this.setState({passwordError: ''});
        } else {
            this.setState({passwordError: 'Password do not match'});
        }

        if(this.state.name === ''){
            this.setState({nameError: 'name is required'});
        } else {
            this.setState({nameError: ''});
        }

        if(this.state.email === '') {
            this.setState({emailError: 'email is required'});
        } else {
            this.setState({emailError: ''});
        }
    }

    handleSignup = () => {

        this._checkInfo();

        if(this.state.passwordError === '' && this.state.nameError === '' && this.state.emailError === ''){
            axios.post(config.base_url + 'register', {
                email: this.state.email,
                password: this.state.password1,
                name: this.state.name,
                preferredSport: config.sportList[this.state.preferredSportIndex],
            })
                .then((req) => {
                    console.log(req.data);
                    if(req.status === 201){
                        this.props.navigation.navigate('TabStack', {logout: this.props.navigation.navigate, cord: this.props.navigation.state.params.cord, data: req.data});
                    } else {
                        console.log('not status 200');
                    }
                })
                .catch((e) => {
                    console.error(e);
                })
        }
    }

    updateIndex = (preferredSportIndex) => {
        this.setState({preferredSportIndex})
    }

    render() {
        return (
            <View>
                <Text>Sign Up Page</Text>
                <FormLabel>Name</FormLabel>
                <FormInput 
                    onChangeText={(name) => this.setState({name})} 
                    autoCapitalize={'none'}
                />
                <FormValidationMessage>{this.state.nameError}</FormValidationMessage>

                <FormLabel>email</FormLabel>
                <FormInput 
                    onChangeText={(email) => this.setState({email})} 
                    autoCapitalize={'none'}
                />
                <FormValidationMessage>{this.state.emailError}</FormValidationMessage>

                <FormLabel>password</FormLabel>
                <FormInput 
                    secureTextEntry={true} 
                    onChangeText={(password1) => this.setState({password1})}
                    autoCapitalize={'none'}
                />

                <FormLabel>password confirm</FormLabel>
                <FormInput 
                    secureTextEntry={true} 
                    onChangeText={(password2) => this.setState({password2})} 
                    autoCapitalize={'none'}    
                />
                <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
                
                <ButtonGroup
                    buttons={config.sportList}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.preferredSportIndex}
                />

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