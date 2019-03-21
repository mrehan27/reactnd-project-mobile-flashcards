import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider as ReactReduxProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import reducer from './reducers';
import middleware from './middleware';
import { colorPrimary, colorPrimaryDark, colorAccent, backgroundColor, textColor } from './utils/colors';
import Home from './components/Home';

const store = createStore(reducer, middleware);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colorPrimary,
    primaryDark: colorPrimaryDark,
    accent: colorAccent,
    background: backgroundColor,
    text: textColor,
  }
};

class App extends Component {
  render() {
    return (
      <ReactReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <Home />
        </PaperProvider>
      </ReactReduxProvider>
    );
  }
}

export default App;
