import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';

class GroupView extends Component {

    constructor(props) {
        super(props);

        this.state ={
            data:this.props.data
        }
    }

    componentDidMount(){
        // console.log(this.state);
        console.log(this.props.navigation.state.params);
    }

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