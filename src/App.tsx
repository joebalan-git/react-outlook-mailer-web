import React from 'react';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <form method="post">
        <div className="container">
          <label htmlFor="uname"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="uname" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <div className="text-center">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
