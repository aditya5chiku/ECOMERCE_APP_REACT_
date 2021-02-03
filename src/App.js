import React from 'react';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import Routes from './Routes'
import setAuthToken from './utils/setAuthToken';


if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
}

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
