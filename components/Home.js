import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/index';
import { scheduleLocalNotifications, isStoreInLoadingState } from '../utils/helpers';
import { backgroundColor } from '../utils/colors';
import AppStatusBar from './core/AppStatusBar';
import ActivityIndicatorOverlay from './core/ActivityIndicatorOverlay';
import DecksDashboard from './deck/Dashboard';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
        scheduleLocalNotifications();
    }

    render() {
        const { initialDataLoaded, loading } = this.props;
        return (
            <View style={styles.container}>
                <AppStatusBar />
                {initialDataLoaded && <DecksDashboard />}
                <ActivityIndicatorOverlay loading={loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
});

function mapStateToProps({ loadingState, loadingBar }) {
    return {
        initialDataLoaded: loadingState.decks,
        loading: isStoreInLoadingState(loadingBar),
    };
}

export default connect(mapStateToProps)(Home);
