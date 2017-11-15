import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class Setting extends Component {

    handleSignout = () => {
        this.props.navigation.state.params.logout('Login');
    }

    render() {
        return (
            <View>
                <Text>Setting Page</Text>
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