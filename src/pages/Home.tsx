import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import axios from 'axios';
import debounce from 'lodash.debounce';

import "./Home.css";
import avatar from "../assets/avatar.png";
import { useAppContext } from "../libs/context";
import { FaSignOutAlt } from "react-icons/fa";
import { MailProtocol } from '../mocks/data/mails';

const Home: React.FC = () => {
	
	const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const history = useHistory();

	const [mails, setMails] = useState<MailProtocol[]>([]);
	const [mailDetailId, setMailDetailId] = useState<number>(0);

  	const [newTotal, setNewTotal] = useState(0);
  	const [archivedTotal, setArchivedTotal] = useState(0);
  	const [total, setTotal] = useState(0);

	const [isReplyEnabled, setReplyEnabled] = useState(false);
  	
  	const [isLoading, setIsLoading] = useState(true);


  	const [mailFilterType, setMailFilterType] = useState("TOTAL");
  	const [mailFilterSearch, setMailFilterSearch] = useState("");

  	useEffect(() => {
		async function onLoad() {
		    if (!isAuthenticated) {
		      return;
		    }

		    try {
		      setMailDetailId(0)

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

	useEffect(() => {
		renderMailDetail()
	}, [mails]);

	const debouncedSave = useCallback(
		debounce(newValue => setMailFilterSearch(newValue), 300),
		[], // will be created only once initially
	);
	function setFilterSearch(e: React.ChangeEvent<HTMLInputElement>){
		debouncedSave(e.target.value);
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
	    	mails.map(({ id, title, description, isNew, isArchived }, index) => (
		    	<Card key={index} onClick={() => setMailDetailId(id)}>
				  <Card.Body className="pt-10">
				    <Card.Title>{title}</Card.Title>
				    <Card.Text>{description}</Card.Text>
				  </Card.Body>
				</Card>
	    	))
	    );
	}

	function renderMailDetail(){
		let mailDetail = mails.find(m => m.id === mailDetailId);

		return (
			mailDetail ?

				<Row className="p-t-10">
					{ isReplyEnabled ? 
						(
							<Col md={12} className="text-right">
								<Button type="button" className="LoaderButton btn-success font-weight-bold m-r-10" onClick={sendReplyHandler}>SEND</Button>
								<Button type="button" className="LoaderButton btn-secondary font-weight-bold m-0" onClick={cancelReplyHandler}>CANCEL</Button>
							</Col>
						)
					:
						(
							<>
								<Col md={6} className="">
									<Card.Title className="m-t-10">{mailDetail.title}</Card.Title>
								</Col>
								<Col md={6} className="text-right">
									<Button type="button" className="LoaderButton btn-success font-weight-bold m-r-10" onClick={replyHandler}>REPLY</Button>
									<Button type="button" className="LoaderButton btn-danger font-weight-bold m-r-10" onClick={deleteHandler}>DELETE</Button>
									{ mailDetail.isArchived && <Button type="button" className="LoaderButton btn-default font-weight-bold m-0" onClick={() => archiveHandler(false)}>ROLLBACK</Button> }
									{ !mailDetail.isArchived && <Button type="button" className="LoaderButton btn-default font-weight-bold m-0" onClick={() => archiveHandler(false)}>ARCHIVE</Button>}
								</Col>
							</>
						)
					}
				</Row>
			:
			<></>

		)
	}

	function replyHandler(){
		setReplyEnabled(true);
	}

	function deleteHandler(){

	}

	function archiveHandler(flag: boolean){
		setMails(mails.map(m => {
			if(m.id === mailDetailId){
				m.isArchived = flag;
			}
			return m;
		}))
	}

	function sendReplyHandler(){
		setReplyEnabled(false);
	}

	function cancelReplyHandler(){
		setReplyEnabled(false);
	}

  	return (
		<div className="App container py-3">
	      <Container className="main-container">
      		  <Row className="b-b-1-solid p-b-10">
			    <Col md={8}>
			    	<Navbar collapseOnSelect expand="md">
				          <button type="button" className="font-weight-bold m-0 w-160" onClick={() => setMailFilterType('NEW')}>NEW : { newTotal }</button>
				          <button type="button" className="font-weight-bold m-0 w-160" onClick={() => setMailFilterType('ARCHIVED')}>ARCHIVED : { archivedTotal }</button>
				          <button type="button" className="font-weight-bold m-0 w-160" onClick={() => setMailFilterType('TOTAL')}>TOTAL : { total }</button>
				          <div>
				          	<input type="text" placeholder="Search" onChange={setFilterSearch}className="search" />
				          </div>
				    </Navbar>
			    </Col>
			    <Col md={4} className="text-right">
			    	<Image className="avatar" src={avatar} />
		          	<Button type="button" className="LoaderButton btn-danger font-weight-bold m-0" onClick={handleLogout}><FaSignOutAlt /> EXIT</Button>
			    </Col>
			  </Row>
			  <Row className="mails-container">
			    <Col md={3} className="m-0 p-0 b-r-1-solid">
			    	<div className="card-list-wrapper">
			      		{ !isLoading && renderMailList() }
	    			</div>
			    </Col>
			    <Col md={9}>
			      <>
			      	{ !isLoading && renderMailDetail() }
			      </>
			    </Col>
			  </Row>
		  </Container>
	    </div>

  	);
}

export default Home;