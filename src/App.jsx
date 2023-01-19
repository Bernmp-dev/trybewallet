import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login';
import Carteira from './pages/Carteira';

function App() {
  return (
    <div>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Carteira } />
        </Switch>
      </Provider>

    </div>
  );
}

export default App;
