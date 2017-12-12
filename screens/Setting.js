import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import config from '../config/config';
import axios from 'axios';

// const Sports = ['Basketball', 'Football', 'Soccer', 'Tennis', 'Badminton', 'Volleyball'];

class Setting extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            sportIndex: 0,
        }
    }

    handleSignout = () => {

        axios.post(config.base_url + 'logout')
            .then((res) => {
                this.props.navigation.state.params.logout('Login');
            }).catch((e) => {
                console.error(e);
            })
    }

    handleGroup = () => {
        
    }

    render() {
        return (
            <View>
                <Text>Setting Page</Text>
                <ButtonGroup
                    buttons={config.sportList}
                    onPress={(sportIndex) => this.setState({sportIndex})}
                    selectedIndex={this.state.sportIndex}
                />

                <FormLabel>Update Email</FormLabel>
                <FormInput 
                    onChangeText={(email) => this.setState({email})} 
                    autoCapitalize={'none'}
                    placeholder={' example@example.com'}
                />
                <FormLabel>Update Password</FormLabel>
                <FormInput 
                    secureTextEntry={true} 
                    onChangeText={(password) => this.setState({password})} 
                    autoCapitalize={'none'}
                    placeholder={' password'}
                />
                <FormValidationMessage>{this.state.error}</FormValidationMessage>

                <Button
                    title={'Sign Out'}
                    onPress={this.handleSignout}
                />
            </View>
        );
    }
}

Setting.propTypes = {

};

export default Setting;