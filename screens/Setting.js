import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';

const Sports = ['Basketball', 'Football', 'Soccer', 'Tennis', 'Badminton', 'Volleyball'];

class Setting extends Component {

    handleSignout = () => {
        this.props.navigation.state.params.logout('Login');
    }

    render() {
        return (
            <View>
                <Text>Setting Page</Text>
                <ButtonGroup
                    buttons={Sports}
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