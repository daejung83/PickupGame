import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { List, ListItem } from 'react-native-elements';
import { NavigationAction, NavigationActions } from 'react-navigation';

import config from '../config/config';

let user,
    newNav;

class ListView extends Component {

    constructor() {
        super();
        this.state = {
            grouplist: [],
        }
    }

    componentWillMount () {
        let action = NavigationActions.setParams({
            params: {
                updateListView: this.updateListView,
            },
            key: 'Map',
        })
        this.props.navigation.dispatch(action);
        this.updateListView()
    }

    updateListView = () => {
        user = this.props.navigation.state.params.data.user;
        newNav = this.props.navigation.navigate;
        console.log(user);
        axios.get(config.base_url + 'groups')
            .then((res) => {
                this.setState({ grouplist: res.data });
            }).catch((e) => {
                console.log(e);
            })
    }

    render() {
        return (
            <ScrollView>
                <Text>ListView</Text>
                <List>
                    {this.state.grouplist.map((dynamicData, key) =>
                            <ListItem
                                key={key}
                                rightTitle={dynamicData.currentSize + "/" + dynamicData.maxSize}
                                title={dynamicData.name}
                                subtitle={dynamicData.sport}
                                onPress={function(){
                                    newNav('GroupView', {
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

ListView.propTypes = {

};

export default ListView;