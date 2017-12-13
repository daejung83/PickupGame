import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { Button, Card, Divider } from 'react-native-elements';
import axios from 'axios';
import isodate from '@segment/isodate';
import MapView from 'react-native-maps';

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
        console.log('GROUPVIEW');
        console.log(this.props.navigation.state.params.data.latitude);
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
            <View style={{flex:1}}>
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
                    title={'Join Game'}
                    onPress={this.handleJoin}
                />
                <Divider/>
                <Button
                    title={'Cancel'}
                    onPress={this.handleCancel}
                />
                <MapView
                    showsUserLocation={true}
                    style={{flex: 1, alignSelf: 'stretch'}}
                    initialRegion={{
                        latitude: this.props.navigation.state.params.data.latitude,
                        longitude: this.props.navigation.state.params.data.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    // ref={(c) => this._map = c}
                >
                    <MapView.Marker
                        coordinate={{latitude: this.state.data.latitude, longitude: this.state.data.longitude}}
                    />
                </MapView>
            </View>
        );
    }
}

GroupView.propTypes = {

};

export default GroupView;