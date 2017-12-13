import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { Button, List, ListItem, Card } from 'react-native-elements';
import { NavigationAction, NavigationActions } from 'react-navigation';

import axios from 'axios';
import config from '../config/config';

let user,
    newNav;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            grouplist: [],
            isLoading: true,
        }
    }

    componentWillMount () {
        
        console.log(user);
        let action = NavigationActions.setParams({
            params: {
                updateHomeList: this.updateHomeList,
            },
            key: 'Map',
        });
        this.props.navigation.dispatch(action);

        this.updateHomeList();
    }

    updateHomeList = async () => {
        this.state.grouplist = [];
        let promises = [];
        user = this.props.navigation.state.params.data.user;
        newNav = this.props.navigation.navigate;

        this.state.isLoading = true;
        this.setState({isLoading: true});
        for (let i = 0; i < user.groups.length; i++){
            promises.push(axios.get(config.base_url + 'groups/' + user.groups[i]))
        }

        Promise.all(promises)
        .then(axios.spread((...args) => {
            for(let i = 0; i < args.length; i++){
                console.log(args[i].data);
                this.state.grouplist.push(args[i].data);
            }
            this.state.isLoading = false;
            this.setState({isLoading: false});
        }))
    }

    render() {
        if(this.state.isLoading){
            return <Text>isLoading...</Text>
        } else {
            return (
                <ScrollView>
                    <Card
                        title={user.name}
                        image={{ uri: 'http://bized.aacsb.edu/-/media/bized2017/images/issue-article-images/2017/november/small-nudges.ashx?h=355&la=en&mw=1000&w=715&hash=021EFA91193448B99E5DE5A114DD37A33A1F6537' }}
                        featuredTitle={user.preferredSport}
                        //featuredSubtitle={<Text>{user.rating}</Text>}
                    >
                        <Text>Rating: {user.rating}</Text>
                        <Text>email: {user.email}</Text>
                        <Text>additional data....</Text>
                    </Card>

                    <List>
                        {this.state.grouplist.map((dynamicData, key) =>
                                <ListItem
                                    key={key}
                                    rightTitle={dynamicData.currentSize + "/" + dynamicData.maxSize}
                                    title={dynamicData.name}
                                    subtitle={dynamicData.sport}
                                    onPress={function(){
                                        newNav('MyGroupView', {
                                            data: dynamicData,
                                            user: user,
                                        })
                                    }}
                                />
                        )}
                    </List>
                </ScrollView>
            );
        }
    }
}

Home.propTypes = {

};

export default Home;