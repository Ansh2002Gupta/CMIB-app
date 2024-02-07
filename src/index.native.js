import React from 'react';
import {SafeAreaView} from 'react-native';

import App from './App';
import GlobalProvider from './globalContext';

function AppRenderer() {
  return (
    <SafeAreaView style={{flex:1}}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </SafeAreaView>
  );
}

export default AppRenderer;
