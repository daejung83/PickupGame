import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import axios from 'axios';

import config from '../config/config';

const rate = [1, 2, 3, 4, 5];

class RatePage extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            rateIndex: 0,
            user: {},
        }
    }

    componentWillMount(){
        console.log(this.props.navigation.state.params);
        this.setState({user: this.props.navigation.state.params.user._id});
    }

    handleBack = () => {
        this.props.navigation.goBack(null);
    }

    handleRate = () => {
        console.log(this.state.user);
        axios.post(config.base_url + 'users/' + this.state.user, {
            rating: rate[this.state.rateIndex],
        }).then((res) => {
            this.props.navigation.goBack(null);
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (
            <ScrollView>
                <ButtonGroup
                    buttons={rate}
                    selectedIndex={this.state.rateIndex}
                    onPress={(rateIndex) => this.setState({rateIndex})}
                />
                <Button
                    title={'Rate'}
                    onPress={this.handleRate}
                />
                <Button
                    title={'Cancel'}
                    onPress={this.handleBack}
                />
            </ScrollView>
        );
    }
}

RatePage.propTypes = {

};

export default RatePage;