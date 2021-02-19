import React from "react";
import "./Home.css";
import { useAppContext } from "../libs/context";

const Home: React.FC = () => {
	
	const { userHasAuthenticated } = useAppContext();

	function handleLogout() {
  		userHasAuthenticated(false);
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