import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import './App.css';
import Routes from "./Routes";
import { AppContext } from "./libs/context";
import './mocks/handlers';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      if(localStorage.getItem('user_token')){
        userHasAuthenticated(true);
        history.push("/")
      }
    }
    catch(e) {}

    setIsAuthenticating(false);
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Routes />
    </AppContext.Provider>
  );
}

export default App;
