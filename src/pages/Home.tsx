import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Row, Col, Image, Card } from "react-bootstrap";
import axios from 'axios';

import "./Home.css";
import avatar from "../assets/avatar.png";
import { useAppContext } from "../libs/context";
import { FaSignOutAlt } from "react-icons/fa";
import { MailProtocol } from '../mocks/data/mails';

const Home: React.FC = () => {
	
	const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const history = useHistory();

	const [mails, setMails] = useState<MailProtocol[]>([]);
  	const [newTotal, setNewTotal] = useState(0);
  	const [archivedTotal, setArchivedTotal] = useState(0);
  	const [total, setTotal] = useState(0);

  	const [isLoading, setIsLoading] = useState(true);


  	const [mailFilterType, setMailFilterType] = useState("");
  	const [mailFilterSearch, setMailFilterSearch] = useState("");

  	useEffect(() => {
	  async function onLoad() {
	    if (!isAuthenticated) {
	      return;
	    }

	    try {
	      const mails: any = await loadMails();
	      setMails(mails.data.data);
	      setNewTotal(mails.data.newTotal);
	      setArchivedTotal(mails.data.archivedTotal);
	      setTotal(mails.data.total);
	    } catch (e) {
	      alert(e);
	    }

	    setIsLoading(false);
	  }

	  onLoad();
	}, [isAuthenticated, mailFilterType, mailFilterSearch]);

	function setFilterSearch(e: React.ChangeEvent<HTMLInputElement>){
		setMailFilterSearch(e.target.value)
	}

	function loadMails() {
		return axios.post('/mails', {
		  	mailFilterType,
		  	mailFilterSearch
	  	});
	}

	function handleLogout() {
  		localStorage.removeItem('user_token')
  		userHasAuthenticated(false);
  		history.push("/login");
	}

	function renderMailList() {
	    return (
	    	mails.map(({ title, description, isNew, isArchived }, index) => (
		    	<Card key={index}>
				  <Card.Body>
				    <Card.Title>{title}</Card.Title>
				    <Card.Text>{description}</Card.Text>
				  </Card.Body>
				</Card>
	    	))
	    );
	}

  	return (
		<div className="App container py-3">
	      <Container>
      		  <Row>
			    <Col md={8}>
			    	<Navbar collapseOnSelect expand="md">
				          <button type="button" className="font-weight-bold m-0 w-160" onClick={() => setMailFilterType('NEW')}>NEW : { newTotal }</button>
				          <button type="button" className="font-weight-bold m-0 w-160" onClick={() => setMailFilterType('ARCHIVED')}>ARCHIVED : { archivedTotal }</button>
				          <button type="button" className="font-weight-bold m-0 w-160" onClick={() => setMailFilterType('')}>TOTAL : { total }</button>
				          <div>
				          	<input type="text" placeholder="Search" onChange={setFilterSearch}className="search" />
				          </div>
				    </Navbar>
			    </Col>
			    <Col md={4} className="text-right">
			    	<Image className="avatar" src={avatar} />
		          	<button type="button" className="font-weight-bold m-0" onClick={handleLogout}>EXIT <FaSignOutAlt /></button>
			    </Col>
			  </Row>
			  <Row style={{ height: '400px', overflow: 'auto' }}>
			    <Col md={3}>
			    	<>
			      		{ !isLoading && renderMailList() }
	    			</>
			    </Col>
			    <Col md={9}>
			      
			    </Col>
			  </Row>
		  </Container>
	    </div>

  	);
}

export default Home;