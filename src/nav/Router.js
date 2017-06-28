import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlayerScreen from '../screens/PlayerScreen';

const ListStack = StackNavigator(
    {
        ListScreen: {
            screen: ListScreen
        },
        PlayerScreen: {
            screen: PlayerScreen
        }
    },
    {
        initialRouteName: "ListScreen",
        mode: "card",
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
            tabBarLabel: "List",
            tabBarIcon: ({ tintColor }) =>
                <Icon
                    name="playlist-play"
                    type="material-community"
                    color={tintColor}
                    size={30}
                />
        }
    }
);

const FavoritesStack = StackNavigator(
    {
        FavoritesScreen: {
            screen: FavoritesScreen
        },
        PlayerScreen: {
            screen: PlayerScreen
        }
    },
    {
        initialRouteName: "FavoritesScreen",
        mode: "card",
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
            tabBarLabel: "Favorites",
            tabBarIcon: ({ tintColor }) =>
                <Icon
                    name="bookmarks"
                    type="entypo"
                    color={tintColor}
                    size={25}
                />
        }
    }
);

const TabsNavigator = TabNavigator(
    {
        List: {
            screen: ListStack,
        },
        Favorites: {
            screen: FavoritesStack,
        },
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null,
                tabBarLabel: "Settings",
                tabBarIcon: ({ tintColor }) => 
                    <Icon
                        name="md-settings"
                        type="ionicon"
                        color={tintColor}
                        size={30}
                    />
            }
        }
    },
    {
        initialRouteName: "List",
        tabBarPosition: "bottom",
        lazy: true
    }
);

export const Routes = {
    LoginScreen: {
        screen: LoginScreen,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    },
    Tabs: {
        screen: TabsNavigator,
    }
}