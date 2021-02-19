import React, { useState } from 'react';
import './App.css';
import Routes from "./Routes";
import { AppContext } from "./libs/context";
import './mocks/handlers';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Routes />
    </AppContext.Provider>
  );
}

export default App;
