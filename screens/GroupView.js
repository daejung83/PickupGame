import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { Button, Card, Divider } from 'react-native-elements';
import axios from 'axios';
import isodate from '@segment/isodate';

import config from '../config/config';
import * as dateUtil from '../utility/date';

class GroupView extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state ={
            data:{},
            user:{},
            startTime: '',
        }
    }

    componentWillMount () {
        // console.log(this.state);
        console.log(this.props.navigation.state.params.data);
        this.setState({
            data: this.props.navigation.state.params.data,
            user: this.props.navigation.state.params.user,
        });
        this.state.startTime = isodate.parse(this.props.navigation.state.params.data.startTime);
        this.state.endTime = isodate.parse(this.props.navigation.state.params.data.endTime);
        // let date = isodate.parse(this.props.navigation.state.params.data.startTime);
        // console.log(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCDay());
        console.log(this.state.startTime);
    }

    handleCancel = () => {
        this.props.navigation.goBack(null);
    }

    handleJoin = () => {
        // console.log(this.props.navigation.state.params);
        // console.log(config.base_url + 'groups/' + this.state.data._id);
        axios.post(config.base_url + 'groups/' + this.state.data._id, {
            user: this.state.user,
        })
            .then((res) => {
                // this.props.navigation.state.params.updateData();
                this.props.navigation.goBack(null);
            }).catch((e) => {
                console.log(e);
            })
    }

    render() {
        return (
            <ScrollView>
                <Card
                    title={this.state.data.name}
                    image={{uri: config.image}}
                    featuredTitle={this.state.data.sport}
                    featuredSubtitle={this.state.data.currentSize + ' / ' + this.state.data.maxSize}
                >
                    <Text>Start Time: {dateUtil.isoToDate(this.state.startTime)}</Text>
                    <Text>End Time: {dateUtil.isoToDate(this.state.endTime)}</Text>
                </Card>

                <Button
                    title={'Join Group'}
                    onPress={this.handleJoin}
                />
                <Divider/>
                <Button
                    title={'Cancel'}
                    onPress={this.handleCancel}
                />
            </ScrollView>
        );
    }
}

GroupView.propTypes = {

};

export default GroupView;