import React, { useState } from 'react';

interface Props {
  // onSubmit: () => void;
}

const Login: React.FC<Props> = () => {
	
	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	
  	const defaultAlertBox = {type: '', message: ''};
  	const [alertBox, setAlertBox] = useState(defaultAlertBox);

	function handleSubmit(event: any) {
		event.preventDefault();

		setAlertBox(defaultAlertBox)

		try {
		    //await Auth.signIn(email, password);
		    setAlertBox({type: 'success', message: 'Login success'})
	  	} catch (e) {
		    setAlertBox({type: 'error', message: 'Invalid credentials'})
	  	}
	}

	return (
		<div className="wrapper">
	      	<form onSubmit={handleSubmit}>
	        	<div className="p-16">
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