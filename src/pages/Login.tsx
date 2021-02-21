import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from 'axios';

import "./Login.css";
import LoaderButton from "../components/LoaderButton";

import { useAppContext } from "../libs/context";

const Login: React.FC = () => {
	
	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	
  	const defaultAlertBox = {type: '', message: ''};
  	const [alertBox, setAlertBox] = useState(defaultAlertBox);

  	const { userHasAuthenticated } = useAppContext();
  	const history = useHistory();

  	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(event: any) {
		event.preventDefault();

		setIsLoading(true);
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
		    setIsLoading(false);
	  	}
	}

	return (
		<div className="Login">
	      <Form onSubmit={handleSubmit}>
	        <Form.Group controlId="email">
	          <Form.Label>Email</Form.Label>
	          <Form.Control
	            autoFocus
	            type="email"
	            value={email}
	            onChange={(e) => setEmail(e.target.value)}
	          />
	        </Form.Group>
	        <Form.Group controlId="password">
	          <Form.Label>Password</Form.Label>
	          <Form.Control
	            type="password"
	            value={password}
	            onChange={(e) => setPassword(e.target.value)}
	          />
	        </Form.Group>
	        <div className="text-center">
		        <LoaderButton isLoading={isLoading}>Enter</LoaderButton>
	        	<p className={alertBox.type}>{alertBox.message}</p>
	        </div>
	      </Form>
	    </div>
	)
}

export default Login;
