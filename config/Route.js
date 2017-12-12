import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import MapPage from '../screens/MapPage';
import FacebookLogin from '../screens/FacebookLogin';
import Setting from '../screens/Setting';
import CreateGroup from '../screens/CreateGroup';
import GroupView from '../screens/GroupView';
import ListView from '../screens/ListView';

export const TabStack = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            showIcon: true,
            tabBarIcon: ({tintColor}) => {
                return (<Icon
                    type={'font-awesome'}
                    name={'home'}
                    color={tintColor}
                />);
            }
        }
    },
    Map: {
        screen: MapPage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return (<Icon
                    type={'font-awesome'}
                    name={'map'}
                    color={tintColor}
                />);
            }
        }
    },
    List: {
        screen: ListView,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return (
                    <Icon
                        type={'font-awesome'}
                        name={'list'}
                        color={tintColor}
                    />
                );
            }
        }
    },
    Setting: {
        screen: Setting,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return (<Icon
                    type={'font-awesome'}
                    name={'cogs'}
                    color={tintColor}
                />);
            }
        }
    }
},{
    animationEnabled: true,
})

export const LoginStack = StackNavigator({
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    FacebookLogin: {
        screen: FacebookLogin,
    },
    TabStack: {
        screen: TabStack,
    },
    CreateGroup: {
        screen: CreateGroup,
    },
    GroupView: {
        screen: GroupView,
    }
},{
    headerMode: 'none',
})

class Route extends Component {

    render() {
            return (
                <View style={styles.container}>
                    <LoginStack />
                </View>
            );
    }
}

Route.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff',
    }
})

export default Route;