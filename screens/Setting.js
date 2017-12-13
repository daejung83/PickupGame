import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import config from '../config/config';
import axios from 'axios';

const Sports = ['Basketball', 'Football', 'Soccer', 'Tennis', 'Badminton', 'Volleyball'];

class Setting extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            name: '',
            error: ''
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

    handleGroup = (idx) => {
        axios.put(config.base_url + 'user', {preferredSport: Sports[idx]}).then((res) => {});
    }

    handleUpdate = () => {
        const body = {};
        if (this.state.email) body['email'] = this.state.email;
        if (this.state.name) body['name'] = this.state.name;
        axios.put(config.base_url + 'user', body)
            .then((res) => {
                this._emailInput.clearText();
                this._nameInput.clearText();
            })
    }

    render() {
        return (
            <View>
                <Text>Setting Page</Text>
                <ButtonGroup
                    buttons={config.sportList}
                    onPress={this.handleGroup}
                    textStyle={{fontSize: 10}}
                />

                <FormLabel>Update Email</FormLabel>
                <FormInput 
                    onChangeText={(email) => this.setState({email})} 
                    autoCapitalize={'none'}
                    placeholder={' example@example.com'}
                    ref={r => this._emailInput = r}
                />
                <FormLabel>Update Name</FormLabel>
                <FormInput 
                    onChangeText={(name) => this.setState({name})} 
                    autoCapitalize={'none'}
                    placeholder={'First Last'}
                    ref={r => this._nameInput = r}
                />
                <FormValidationMessage>{this.state.error}</FormValidationMessage>

                <Button
                    title={'Update'}
                    onPress={this.handleUpdate}
                    backgroundColor={config.color1}
                />

                <Button
                    title={'Sign Out'}
                    onPress={this.handleSignout}
                    backgroundColor={config.color1}
                />
            </View>
        );
    }
}

Setting.propTypes = {

};

export default Setting;