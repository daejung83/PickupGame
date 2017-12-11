import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';

class GroupView extends Component {

    handleCancel = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <ScrollView>
                <Text>GroupView</Text>
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