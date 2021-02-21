import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import axios from 'axios';
import debounce from 'lodash.debounce';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';

import "./Home.css";
import avatar from "../assets/avatar.png";
import { useAppContext } from "../libs/context";
import { FaSignOutAlt } from "react-icons/fa";
import { MailProtocol } from '../mocks/data/mails';

const Home: React.FC = () => {
	
	const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const history = useHistory();

	const [mails, setMails] = useState<MailProtocol[]>([]);
	const [mailDetail, setMailDetail] = useState<MailProtocol | null>(null);

  	const [newTotal, setNewTotal] = useState(0);
  	const [archivedTotal, setArchivedTotal] = useState(0);
  	const [total, setTotal] = useState(0);

	const [isReplyEnabled, setReplyEnabled] = useState(false);
  	
  	const [isLoading, setIsLoading] = useState(true);
  	const [refreshData, setRefreshData] = useState(false);


  	const [mailFilterType, setMailFilterType] = useState("TOTAL");
  	const [mailFilterSearch, setMailFilterSearch] = useState("");
  	const [markdown, setMarkdown] = useState('');

  	useEffect(() => {
		async function onLoad() {
		    if (!isAuthenticated) {
		      return;
		    }

		    try {
		      const response: any = await loadMails();
		      setMails(response.data.data);
		      setNewTotal(response.data.newTotal);
		      setArchivedTotal(response.data.archivedTotal);
		      setTotal(response.data.total);
		    } catch (e) {
		      alert(e);
		    }

		    setIsLoading(false);
		    setRefreshData(false);
	  	}
	  	
	  	onLoad();
	  	// eslint-disable-next-line
	}, [isAuthenticated, refreshData, mailFilterType, mailFilterSearch]);

	useEffect(() => {
		renderMailList()
		renderMailDetail()
		// eslint-disable-next-line
	}, [ mails ]);

	// eslint-disable-next-line
	const debouncedSave = useCallback(
		debounce(newValue => setMailFilterSearch(newValue), 300),
		[], // will be created only once initially
	);
	function setFilterSearch(e: React.ChangeEvent<HTMLInputElement>){
		debouncedSave(e.target.value);
	}

	function applyMailFilter(filter: string){
		setMailDetail(null);
		setMailFilterType(filter);
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
		    	<Card key={index} onClick={() => openMailHandler(id)}>
				  <Card.Body className="pt-10">
				    <Card.Title>{title}</Card.Title>
				    <Card.Text>{description}</Card.Text>
				  </Card.Body>
				</Card>
	    	))
	    );
	}

	function renderMailDetail(){
		return (
			mailDetail ?

				<Row className="p-t-10">
					{ isReplyEnabled ? 
						(
							<>
								<Col md={6} className="">
									<Card.Title className="m-t-10">{'Reply - ' + mailDetail.title}</Card.Title>
								</Col>
								<Col md={6} className="text-right">
									<Button type="button" className="LoaderButton btn-success font-weight-bold m-r-10" onClick={sendReplyHandler}>SEND</Button>
									<Button type="button" className="LoaderButton btn-secondary font-weight-bold m-0" onClick={cancelReplyHandler}>CANCEL</Button>
								</Col>
								<Col md={12}>
									<MarkdownEditor
									  height={200}
								      value=""
								      onChange={(editor, data, value) => setMarkdown(value)}
								    />
								</Col>

								<hr style={{ height: '4px', width: '100%' }}/>
							</>
						)
					:
						(
							<>
								<Col md={6} className="">
									<Card.Title className="m-t-10">{mailDetail.title}</Card.Title>
								</Col>
								<Col md={6} className="text-right">
									<Button type="button" className="LoaderButton btn-success font-weight-bold m-r-10" onClick={replyHandler}>REPLY</Button>
									<Button type="button" className="LoaderButton btn-danger font-weight-bold m-r-10" onClick={() => deleteHandler(mailDetail.id)}>DELETE</Button>
									{ mailDetail.isArchived && <Button type="button" className="LoaderButton btn-default font-weight-bold m-0" onClick={() => archiveHandler(mailDetail.id, false)}>ROLLBACK</Button> }
									{ !mailDetail.isArchived && <Button type="button" className="LoaderButton btn-default font-weight-bold m-0" onClick={() => archiveHandler(mailDetail.id, true)}>ARCHIVE</Button>}
								</Col>
							</>
						)
					}
					<Col md={12} className="p-t-10">
						<MarkdownPreview source={mailDetail.rawDescription} />
					</Col>
				</Row>
			:
			<></>

		)
	}

	async function openMailHandler(id: number){
		setReplyEnabled(false);

		let response = await fetchMailDetails(id);
		if(response.status){
			setMailDetail(response.data.data);
			setNewTotal(response.data.newTotal);
	      setArchivedTotal(response.data.archivedTotal);
	      setTotal(response.data.total);
		} else {
			alert(response.data.message);
		}
	}

	function replyHandler(){
		setMarkdown('');
		setReplyEnabled(true);
	}

	async function deleteHandler(id: number){
		await axios.delete('/mail?id=' + id)
		setMailDetail(null)
		setRefreshData(true);
	}

	function fetchMailDetails(id: number){
		return axios.get('/mail/detail?id=' + id)
	}

	async function archiveHandler(id: number, isArchived: boolean){
		await axios.post('/mail/setArchived', { id, isArchived })
		setMailDetail(null)
		setRefreshData(true);
	}

	function sendReplyHandler(){
		setReplyEnabled(false);
		console.log(markdown)
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
				          <button type="button" className={"font-weight-bold m-0 w-160 filter_button " + (mailFilterType === "NEW" ? "selected" : "")} onClick={() => applyMailFilter('NEW')}>NEW : { newTotal }</button>
				          <button type="button" className={"font-weight-bold m-0 w-160 filter_button " + (mailFilterType === "ARCHIVED" ? "selected" : "")} onClick={() => applyMailFilter('ARCHIVED')}>ARCHIVED : { archivedTotal }</button>
				          <button type="button" className={"font-weight-bold m-0 w-160 filter_button " + (mailFilterType === "TOTAL" ? "selected" : "")} onClick={() => applyMailFilter('TOTAL')}>TOTAL : { total }</button>
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