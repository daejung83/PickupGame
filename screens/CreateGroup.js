import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements';
import axios from 'axios';
import isodate from '@segment/isodate';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'

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
            minDay: '',
            maxDay: '',
            startDate: moment().format('YYYY-MM-DD'),
            startTime: moment().format('HH:mm'),
            endDate: moment().add(1, 'hours').format('YYYY-MM-DD'),
            endTime: moment().add(1, 'hours').format('HH:mm'),
        }
    }

    componentWillMount(){
        let today = new Date();
        this.state.minDay = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        this.state.maxDay = (today.getFullYear() + 1) + '-' + today.getMonth() + '-' + today.getDate();
    }

    handleCancel = () => {
        this.props.navigation.goBack(null);
    }

    handleCreate = async () => {
         // name, sport, lon, lat, maxSize, start, end
         const body = {
            name: this.state.name,
            maxSize: this.state.maxSize,
            start: this.state.startDate + 'T' + this.state.startTime + ':00.000Z',
            end: this.state.endDate + 'T' + this.state.endTime + ':00.000Z',
            lat: this.props.navigation.state.params.coordinate.latitude,
            lon: this.props.navigation.state.params.coordinate.longitude,
            sport: config.sportList[this.state.sportListIndex],
        };
        console.log(JSON.stringify(body));
        axios.post(config.base_url + 'groups', body)
            .then((res) => {
                console.log(this.props.navigation.state.params.updateData);
                console.log(res.data);
                
            }).catch((e) => {
                console.log(JSON.stringify(e));
            })

            this.props.navigation.state.params.updateData();
            this.props.navigation.state.params.clearTemp();
            this.props.navigation.goBack(null);
    }

    handleGroup = (sportListIndex) => {
        this.setState({sportListIndex});
    }

    render() {
        return (
            <ScrollView>
                <Text>{this.state.startDate} {this.state.startTime} {this.state.endDate} {this.state.endTime}</Text>
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
                <Text>Start Date and Time</Text>
                <DatePicker
                    mode={'date'}
                    style={{width: 400}}
                    customStyles={{
                        dateInput: {
                            marginLeft: 15,
                        }
                    }}
                    cancelBtnText={'Cancel'}
                    confirmBtnText={'Confirm'}
                    date={this.state.startDate}
                    onDateChange={(startDate) => {this.setState({startDate})}}
                    iconComponent={
                        <Icon
                            type={'font-awesome'}
                            name={'calendar'}
                            iconStyle={{margin: 9}}
                        />
                    }
                />
                <DatePicker
                    mode={'time'}
                    style={{width: 400}}
                    customStyles={{
                        dateInput: {
                            marginLeft: 15,
                        }
                    }}
                    cancelBtnText={'Cancel'}
                    confirmBtnText={'Confirm'}
                    date={this.state.startTime}
                    onDateChange={(startTime) => {this.setState({startTime})}}
                    iconComponent={
                        <Icon
                            type={'font-awesome'}
                            name={'clock-o'}
                            iconStyle={{margin: 10}}
                        />
                    }
                />
                <Text>End Date and Time</Text>
                <DatePicker
                    mode={'date'}
                    style={{width: 400}}
                    customStyles={{
                        dateInput: {
                            marginLeft: 15,
                        }
                    }}
                    cancelBtnText={'Cancel'}
                    confirmBtnText={'Confirm'}
                    date={this.state.endDate}
                    onDateChange={(endDate) => {this.setState({endDate})}}
                    iconComponent={
                        <Icon
                            type={'font-awesome'}
                            name={'calendar'}
                            iconStyle={{margin: 9}}
                        />
                    }
                />
                <DatePicker
                    mode={'time'}
                    style={{width: 400}}
                    customStyles={{
                        dateInput: {
                            marginLeft: 15,
                        }
                    }}
                    cancelBtnText={'Cancel'}
                    confirmBtnText={'Confirm'}
                    date={this.state.endTime}
                    onDateChange={(endTime) => {this.setState({endTime})}}
                    iconComponent={
                        <Icon
                            type={'font-awesome'}
                            name={'clock-o'}
                            iconStyle={{margin: 10}}
                        />
                    }
                />
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