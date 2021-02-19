import React, { useState } from 'react';
import axios from 'axios';

import { useAppContext } from "../libs/context";

const Login: React.FC = () => {
	
	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	
  	const defaultAlertBox = {type: '', message: ''};
  	const [alertBox, setAlertBox] = useState(defaultAlertBox);

  	const { userHasAuthenticated } = useAppContext();

	async function handleSubmit(event: any) {
		event.preventDefault();

		setAlertBox(defaultAlertBox)

		try {
		    await axios.post('/login', { email, password });
		    userHasAuthenticated(true);
		    setAlertBox({type: 'success', message: 'Login success'})
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
