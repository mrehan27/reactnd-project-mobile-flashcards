import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
    NAVIGATION_PATH_DECK_HOME,
    NAVIGATION_PATH_DECK_ADD,
    NAVIGATION_PATH_DECK_SUMMARY,
    NAVIGATION_PATH_QUESTION_ADD,
    NAVIGATION_PATH_DECK_QUIZ,
} from '../../utils/constants';
import {
    bottomBarBackgroundColor,
    iconColorInctive,
    iconColorActive,
} from '../../utils/colors';
import List from './List';
import AddDeck from './AddDeck';
import Summary from './Summary';
import AddQuestionCard from './AddQuestionCard';
import Quiz from './Quiz';

const BottomNavigationIconSize = 24;

const BottomNavigation = createMaterialBottomTabNavigator({
    [NAVIGATION_PATH_DECK_HOME]: {
        screen: List,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) =>
                <MaterialCommunityIcons
                    name='cards'
                    color={tintColor}
                    size={BottomNavigationIconSize}
                />,
        },
    },
    [NAVIGATION_PATH_DECK_ADD]: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) =>
                <MaterialIcons
                    name='add-box'
                    color={tintColor}
                    size={BottomNavigationIconSize}
                />,
        },
    },
}, {
        initialRouteName: NAVIGATION_PATH_DECK_HOME,
        activeColor: iconColorActive,
        inactiveColor: iconColorInctive,
        barStyle: {
            backgroundColor: bottomBarBackgroundColor,
        },
    }
);

const ListNavigation = createStackNavigator({
    [NAVIGATION_PATH_DECK_HOME]: {
        screen: BottomNavigation,
        navigationOptions: {
            header: null,
        },
    },
    [NAVIGATION_PATH_DECK_SUMMARY]: {
        screen: Summary,
    },
    [NAVIGATION_PATH_QUESTION_ADD]: {
        screen: AddQuestionCard,
    },
    [NAVIGATION_PATH_DECK_QUIZ]: {
        screen: Quiz,
    },
}, {
        initialRouteName: NAVIGATION_PATH_DECK_HOME,
    }
);

const NavigationContainer = createAppContainer(ListNavigation);

function Dashboard() {
    return (
        <NavigationContainer />
    );
}

export default Dashboard;
