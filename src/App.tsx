import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Index from './components/Index'
import GuestRoute from './utils/GuestRoute'
import PrivateRoute from './utils/PrivateRoute'

//redux stuff
import { Provider } from 'react-redux';
import store from './redux/store';
import { CheckAuthentication } from './utils/CheckAuthentication'

const App: React.FC = () => {
  useEffect(() => {
  CheckAuthentication();
}, []);

return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Index} />
            <GuestRoute exact path='/login' component={Login} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App;