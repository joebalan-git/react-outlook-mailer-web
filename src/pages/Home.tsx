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
    	<div className="HomeContainer">
      		<div className="NavBarWrapper">
      			<div className="NavBarItem">
    				<button type="button" className="">NEW : {  }</button>
      			</div>
      			<div className="NavBarItem">
    				<button type="button" className="">ARCHIVED : {  }</button>
      			</div>
      			<div className="NavBarItem">
    				<button type="button" className="">TOTAL : {  }</button>
      			</div>
      			<div className="NavBarItem">
    				<button type="button" className="">New : {  }</button>
      			</div>
      		</div>
    	</div>
  	);
}

export default Home;