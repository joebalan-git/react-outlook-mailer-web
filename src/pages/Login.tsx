import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { useAppContext } from "../libs/context";

const Login: React.FC = () => {
	
	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	
  	const defaultAlertBox = {type: '', message: ''};
  	const [alertBox, setAlertBox] = useState(defaultAlertBox);

  	const { userHasAuthenticated } = useAppContext();
  	const history = useHistory();

	async function handleSubmit(event: any) {
		event.preventDefault();

		setAlertBox(defaultAlertBox)

		try {
		    let response = await axios.post('/login', { email, password });
		    localStorage.setItem('user_token', JSON.stringify(response.data));
		    userHasAuthenticated(true);
		    setAlertBox({type: 'success', message: 'Login success'})
		    setTimeout(() => {
		    	history.push("/");
		    }, 100);
	  	} catch (e) {
		    setAlertBox({type: 'error', message: 'Invalid credentials'})
	  	}
	}

	return (
		<div className="wrapper">
	      	<form onSubmit={handleSubmit}>
	        	<div className="container">
	          		<input type="email" className="full-width-field" placeholder="Login" name="uname" required value={email} onChange={(e) => setEmail(e.target.value)} />
	          		<input type="password" className="full-width-field" placeholder="Password" name="psw" required value={password} onChange={(e) => setPassword(e.target.value)} />
	          		<div className="text-center">
	            		<button type="submit">Enter</button>
			        	<p className={alertBox.type}>{alertBox.message}</p>
	          		</div>
	        	</div>
	      	</form>
	    </div>
	)
}

export default Login;
