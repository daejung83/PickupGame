import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from 'geolocation';
import { NavigationAction, NavigationActions } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import axios from 'axios';
import keygen from 'keygenerator';

import config from '../config/config';

class MapPage extends Component {

    constructor(){
        super();
        this.state = {
            lats: 0,
            long: 0,
            newLats: 0,
            newLong: 0,
            markers: [],
            markerList: [],
            newMarkers: [],
            newMarkerCord: {}
            // isLoading: true,
        }
    }

    componentWillMount = async () =>{
        console.log(this.props.navigation.state.params.cord.latitude);
        console.log(this.props.navigation.state.params.cord.longitude);
        this.state.lats = this.props.navigation.state.params.cord.latitude;
        this.state.long = this.props.navigation.state.params.cord.longitude;
        // this.state.isLoading = false;

        await axios.get(config.base_url + 'groups')
            .then((res) => {
                // console.log(res.data);
                this.setState({markers: res.data});
                res.data.map((ele, i) => {
                    this.state.markerList.push(this.addMarker(ele.latitude, ele.longitude, ele.name, i, this.handleGroupView));
                })
                // console.log(markerList);
            }).catch((e) => {
                console.log(e);
            })
        this.setState({
            lats: this.props.navigation.state.params.cord.latitude,
            long: this.props.navigation.state.params.cord.longitude,
        })
        
        // this.state.isLoading = true;
        
    }

    addMarker = (lat, long, title, key, callback) => {
        return (
            <MapView.Marker
                coordinate={{latitude: lat, longitude: long}}
                title={title}
                key={key}
                onPress={callback}
            />
        );
    }

    updateData = () => {
        console.log('UPDATING');
        this.setState({markerList: [], isLoading: true})

        axios.get(config.base_url + 'groups')
        .then((res) => {
            // console.log(res.data);
            this.setState({markers: res.data});
            res.data.map((ele, i) => {
                this.state.markerList.push(this.addMarker(ele.latitude, ele.longitude, ele.name, i, this.handleGroupView));
            })
            this.setState({isLoading: false})
            // console.log(markerList);
        }).catch((e) => {
            console.log(e);
        })
    }

    clearTemp = () => {
        // this.state.newMarkers = [];
        console.log('CLEARING');
        this.setState({newMarkers: []});
    }

    CreateGroup = (e) => {
        // console.log('checking data: ', this.props.navigation.state.params.data);
        this.props.navigation.state.params.logout('CreateGroup', {
            updateData: this.updateData,
            clearTemp: this.clearTemp,
            coordinate: this.state.newMarkerCord,
            id: this.props.navigation.state.params.data.user._id,
        });
    }

    handleGroupView = () => {
        this.props.navigation.state.params.logout('GroupView');
    }

    handleNewGroup = (e) => {
        // this.updateData();
        console.log(e.nativeEvent);
        this.setState({
            newMarkers:
                <MapView.Marker
                    draggable
                    coordinate={e.nativeEvent.coordinate}
                    onPress={this.CreateGroup}
                />,
            newMarkerCord: e.nativeEvent.coordinate,
        })
    }

    render() {
        if(this.state.isLoading){
            return (
                <Text>Loading....</Text>
            );
        } else {
            return (
                <View style={styles.containor}>
                    <MapView
                        showsUserLocation={true}
                        style={styles.mapView}
                        initialRegion={{
                            latitude: this.state.lats,
                            longitude: this.state.long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onLongPress={this.handleNewGroup}
                    >
                    
                        {this.state.markerList}
                        {this.state.newMarkers}
                    </MapView>
                </View>
            );
        }
    }
}

MapPage.propTypes = {

};

const styles = StyleSheet.create({
    containor: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    mapView: {
        flex: 1,
        
    }
})

export default MapPage;