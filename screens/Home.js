import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { Button, List, ListItem, Card } from 'react-native-elements';

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

class Home extends Component {

    render() {
        return (
            <ScrollView>
                <Card
                    title={'NAME HERE'}
                    image={{uri: 'http://bized.aacsb.edu/-/media/bized2017/images/issue-article-images/2017/november/small-nudges.ashx?h=355&la=en&mw=1000&w=715&hash=021EFA91193448B99E5DE5A114DD37A33A1F6537'}}
                >
                </Card>

                <List>
                    {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                rightTitle={'3/4'}
                                title={l.name}
                                subtitle={l.sport}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}

Home.propTypes = {

};

export default Home;