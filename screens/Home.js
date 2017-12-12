import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { Button, List, ListItem, Card } from 'react-native-elements';

import axios from 'axios';
import config from '../config/config';

const list = [
    {
        name: 'blah blah',
        sport: 'Football',
    },
    {
        name: 'blah blah',
        sport: 'Basketball',
    },
    {
        name: 'blah blah',
        sport: 'Football',
    },
    {
        name: 'blah blah',
        sport: 'Baseball',
    },
    {
        name: 'blah blah',
        sport: 'Football',
    },
    {
        name: 'blah blah',
        sport: 'Tennis',
    },
    {
        name: 'blah blah',
        sport: 'Football',
    },
]

let user,
    newNav;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            grouplist: [],
        }
    }

    componentWillMount () {
        user = this.props.navigation.state.params.data;
        newNav = this.props.navigation.navigate;
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
                <Card
                    title={this.props.navigation.state.params.data.name}
                    image={{ uri: 'http://bized.aacsb.edu/-/media/bized2017/images/issue-article-images/2017/november/small-nudges.ashx?h=355&la=en&mw=1000&w=715&hash=021EFA91193448B99E5DE5A114DD37A33A1F6537' }}
                    featuredTitle={'temp'}
                    featuredSubtitle={'featured Sub Title'}
                >
                    <Text>Something Something</Text>
                    <Text>More Something</Text>
                </Card>

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

Home.propTypes = {

};

export default Home;