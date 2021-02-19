import React from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";
import { useAppContext } from "../libs/context";

const Home: React.FC = () => {
	
	const { userHasAuthenticated } = useAppContext();
	const history = useHistory();

	function handleLogout() {
  		localStorage.removeItem('user_token')
  		userHasAuthenticated(false);
  		history.push("/login");
	}

  	return (
    	<div className="Home">
      		<div className="lander">
    			<h1>Scratch</h1>
        		<p className="text-muted">A simple note taking app</p>
      		</div>
    	</div>
  	);
}

export default Home;