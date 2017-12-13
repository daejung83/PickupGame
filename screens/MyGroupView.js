import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import axios from 'axios';

import config from '../config/config';

let newNav;

class MyGroupView extends Component {

    constructor(){
        super();

        this.state = {
            isLoading: true,
            userList: [],
        }
    }

    componentWillMount(){
        console.log(this.props.navigation.state.params);
        let data = this.props.navigation.state.params.data;
        let promises = [];
        newNav = this.props.navigation.navigate;
        this.state.isLoading = true;
        for (let i = 0; i < data.users.length; i++){
            if(data.users[i] !== this.props.navigation.state.params.user._id)
                promises.push(axios.get(config.base_url + 'users/' + data.users[i]));
            //check if you are same and skip if you are
        }
        //add host to the promises
        if(this.props.navigation.state.params.user._id !== data.host)
            promises.push(axios.get(config.base_url + 'users/' + data.host));

        axios.all(promises)
            .then(axios.spread((...args) => {
                for(let i = 0; i < args.length; i++){
                    console.log(args[i].data);
                    this.state.userList.push(args[i].data);
                }
                this.state.isLoading = false;
                this.setState({isLoading: false});
            }))
    }

    handleBack = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        if(this.state.isLoading){
            return <Text>isLoading....</Text>
        } else {
            return (
                <ScrollView>
                    <List>
                        {/* need list of users in a list and rate them */}
                        {
                            this.state.userList.map((user, i) => 
                                <ListItem
                                    key={i}
                                    title={user.name}
                                    subtitle={user.rating}
                                    onPress={function(){
                                        newNav('RatePage', {
                                            user,
                                        })
                                    }}
                                />
                            )
                        }
                    </List>
                    <Button
                        title={'back'}
                        onPress={this.handleBack}
                    />
                </ScrollView>
            );
        }
    }
}

MyGroupView.propTypes = {

};

export default MyGroupView;