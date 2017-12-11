import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import axios from 'axios';

import config from '../config/config';


class CreateGroup extends Component {

    constructor() {
        super();

        this.state = {
            errorName: '',
            errorMaxSize: '',
            name: '',
            maxSize: 0,
            sportListIndex: 0,
        }
    }

    handleCancel = () => {
        this.props.navigation.goBack(null);
    }

    handleCreate = async () => {
         // name, sport, lon, lat, maxSize, start, end
        await axios.post(config.base_url + 'groups', {
            name: this.state.name,
            maxSize: this.state.maxSize,
            start: '2017-12-12T04:06:07.000Z',
            end: '2017-12-12T05:06:07.000Z',
            lat: this.props.navigation.state.params.coordinate.latitude,
            lon: this.props.navigation.state.params.coordinate.longitude,
            sport: config.sportList[this.state.sportListIndex],
        })
            .then((res) => {
                console.log(this.props.navigation.state.params.updateData);
                console.log(res.data);
                
            }).catch((e) => {
                console.log(e);
            })

            this.props.navigation.state.params.updateData;
            this.props.navigation.state.params.clearTemp;
            this.props.navigation.goBack(null);
    }

    handleGroup = (sportListIndex) => {
        this.setState({sportListIndex});
    }

    render() {
        return (
            <ScrollView>
                <Text>CreateGroup Page</Text>
                <ButtonGroup
                    buttons={config.sportList}
                    onPress={this.handleGroup}
                    selectedIndex={this.state.sportListIndex}
                />
                <FormLabel>Name</FormLabel>
                <FormInput 
                    onChangeText={(name) => this.setState({name})} 
                    autoCapitalize={'none'}
                    placeholder={' Name'}
                />
                <FormValidationMessage>{this.state.errorName}</FormValidationMessage>
                <FormLabel>Max Size</FormLabel>
                <FormInput 
                    onChangeText={(maxSize) => this.setState({maxSize})} 
                    autoCapitalize={'none'}
                    placeholder={' Max Size'}
                />
                <FormValidationMessage>{this.state.errorMaxSize}</FormValidationMessage>
                <Button
                    title={'Create'}
                    onPress={this.handleCreate}
                />
                <Button
                    title={'Cancel'}
                    onPress={this.handleCancel}
                />
            </ScrollView>
        );
    }
}

CreateGroup.propTypes = {

};

export default CreateGroup;