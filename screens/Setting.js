import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import config from '../config/config';
import axios from 'axios';

// const Sports = ['Basketball', 'Football', 'Soccer', 'Tennis', 'Badminton', 'Volleyball'];

class Setting extends Component {

    handleSignout = () => {

        axios.post(config.base_url + 'logout')
            .then((res) => {
                this.props.navigation.state.params.logout('Login');
            }).catch((e) => {
                console.error(e);
            })
    }

    render() {
        return (
            <View>
                <Text>Setting Page</Text>
                <ButtonGroup
                    buttons={config.sportList}
                />

          

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