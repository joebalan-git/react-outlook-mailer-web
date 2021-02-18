import React from 'react';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <form method="post">
        <div className="container">
          <input type="email" className="full-width-field" placeholder="Login" name="uname" required />
          <input type="password" className="full-width-field" placeholder="Password" name="psw" required />
          <div className="text-center">
            <button type="submit">Enter</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
