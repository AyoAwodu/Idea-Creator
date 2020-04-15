import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Label } from 'reactstrap';
import Slide from '@material-ui/core/Slide';
import { Container, Row, Col, FormGroup, InputGroup, Form, Input} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import './ProjectResearch.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class ProjectResearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: this.props.location.state.projectName,
            projectNumber: this.props.location.state.projectNumber,
            userData: this.props.location.state.userData || this.props.userData,
            projectDefinition: this.props.location.state.projectDefinition, //project mission
            projectExclusions: this.props.location.state.projectExclusions,
            projectConstraints: this.props.location.state.projectConstraints,
            projectDescription: this.props.location.state.projectDescription,
            projectExplorationAreas: this.props.location.state.projectExplorationAreas,        
            projectResearch1: '',
            projectResearch2: '',
            projectResearch3: '',
            projectResearchLink3: '',
            projectResearchLink2: '',
            projectResearchLink1: '',
            projectNotes: '',
        }
    }

    componentDidMount = () => {
        console.log(this.props)
    }

    resetFields = () => {
        this.setState({
            projectResearch1: '',
            projectResearch2: '',
            projectResearch3: '',
            projectResearchLink3: '',
            projectResearchLink2: '',
            projectResearchLink1: '',
            projectNotes: '',
        })
    }

    handleProjectNameChange = (event) => {
        this.setState({
            projectName: event.target.value
        });
    }
    handleProjectResearch1Change = (event) => {
        this.setState({
            projectResearch1: event.target.value
        });
    }
    handleProjectResearch2Change = (event) => {
        this.setState({
            projectResearch2: event.target.value
        });
    }
    handleProjectResearch3Change = (event) => {
        this.setState({
            projectResearch3: event.target.value
        });
    }
    handleProjectResearchLink3Change = (event) => {
        this.setState({
            projectResearchLink3: event.target.value
        });
    }
    handleProjectResearchLink2Change = (event) => {
        this.setState({
            projectResearchLink2: event.target.value
        });
    }
    handleProjectResearchLink1Change = (event) => {
        this.setState({
            projectResearchLink1: event.target.value
        });
    }
    handleProjectDescriptionChange = (event) => {
        this.setState({
            projectDescription: event.target.value
        });
    }
    handleProjectDefinitionChange = (event) => {
        this.setState({
            projectDefinition: event.target.value
        });
    }

    handleProjectExclusionsChange = (event) => {
        this.setState({
            projectExclusions: event.target.value
        });
    }

    handleProjectNotesChange = (event) => {
        this.setState({
            projectNotes: event.target.value
        });
    }

    submitProject = () => {
        axios.post('/api/project', {
            headers: {
                Authorization: 'Bearer ' + this.state.userData.token //the token is a variable which holds the token
            },
            data: {
                'title': this.state.projectName,
                'description': this.state.projectDescription,
                'problemStatement': {
                    'title': this.state.projectName,
                    'description': this.state.projectDescription,
                    'link*': {
                        'href': this.state.projectResearchLink1,
                        'hrefName': this.state.projectResearchLink1
                    }
                },
                'exclusion': [{
                    'content': this.state.projectExclusions,
                    'link*': {
                        'href': this.state.projectResearchLink3,
                        'hrefName': this.state.projectResearchLink3
                    }
                }],
                'constraints': [{
                    'content': this.state.projectDefinition,
                    'link*': {
                        'href': this.state.projectResearchLink3,
                        'hrefName': this.state.projectResearchLink3
                    }
                }],
                'areasOfResearch': [{
                    'content': this.state.projectResearch1,
                    'link*': {
                        'href': this.state.projectResearchLink1,
                        'hrefName': this.state.projectResearchLink1
                    }
                }],
                'stimulus': []
            }
        });
    }


    nextPage = () => {
        this.props.history.push({
            pathname: '/project-stimuli',
            state: this.state  // need this for moving to different component
        });
    }

    state = { showing: true };

    render() {
       const { showing } = this.state;
        return (

            <div id="research-container">

                <SideNav expanded="true" style={{
                    backgroundColor: "#EBF2F2", marginTop: 60, borderRight: "solid", borderRightColor: "#028DCB"
                }}
                    onSelect={(selected) => {
                        // Add your code here
                    }}
                >



                    <SideNav.Nav defaultSelected="">


                        <NavItem style={{ marginTop: 40 }} role="menuitem" eventKey="home">
                            <NavIcon>
                                <FontAwesomeIcon icon="home" id="dash-icon" style={{ fontSize: '1.1em', color: "black" }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 15, paddingRight: 20, fontSize: 16 }}>
                                Home
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="project">
                            <NavIcon>
                                <FontAwesomeIcon icon="plus" id="dash-icon" style={{ fontSize: '1.1em', color: "black" }} />
                            </NavIcon>
                            <NavText id="nav-text" style={{ paddingTop: 15, paddingRight: 28, fontSize: 16 }}>
                                Add Project
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="settings">
                            <NavIcon>
                                <FontAwesomeIcon icon="cogs" id="dash-icon" style={{ fontSize: '1.1em', color: "black" }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 15, paddingRight: 28, fontSize: 16 }}>
                                Settings
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="info">
                            <NavIcon>
                                <FontAwesomeIcon icon="info-circle" id="dash-icon" style={{ fontSize: '1.1em', color: "black" }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 15, paddingRight: 28, fontSize: 16 }}>
                                About
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="help">
                            <NavIcon>
                                <FontAwesomeIcon icon="question" id="dash-icon" style={{ fontSize: '1.1em', color: "black" }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 15, paddingRight: 28, fontSize: 16 }}>
                                Help
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="logout">
                            <NavIcon>
                                <FontAwesomeIcon icon="sign-out-alt" id="dash-icon" style={{ fontSize: '1.1em', color: "black" }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 15, paddingRight: 28, fontSize: 16 }}>
                                Logout
                            </NavText>

                        </NavItem>


                    </SideNav.Nav>

                </SideNav>


                <div id='research-main-content'>
                    <div>
                        <h3 id="subtitle">Research</h3>
                        <hr style={{ width: "30%" }} id="hr-1" />
                    </div>
                   
                        <Row id='r-and-d-col'>
                            <Col md={{ span: 5, offset: 0 }}>
                                <Row>
                                    <TextField id="projectLink-input"
                                        value={this.state.projectResearch1}
                                        onChange={this.handleProjectResearch1Change}
                                        placeholder="Area of Research 1"
                                        multiline
                                        rows="1"
                                        label="Area of Research 1"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                                <Row>
                                    <TextField id="projectLink-input"
                                        value={this.state.projectResearchLink1}
                                        onChange={this.handleProjectResearchLink1Change}
                                        placeholder="Link"
                                        multiline
                                        rows="1"
                                        label="Link"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                            </Col>
                            <Col md={{ span: 6, offset: 0 }}>
                                <Row>
                                    <TextField id="projectDescription-input"
                                        value={this.state.projectNotes}
                                        onChange={this.handleProjectNotesChange}
                                        placeholder="Enter Research Notes"
                                        multiline
                                        rows="4"
                                        label="Notes"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                                </Col>
                        </Row>
                        <Row id='r-and-d-col'>
                            <Col md={{ span: 5, offset: 0 }}>
                                <Row>
                                    <TextField id="projectLink-input"
                                        value={this.state.projectResearch2}
                                        onChange={this.handleProjectResearch2Change}
                                        placeholder="Area of Research 2"
                                        multiline
                                        rows="1"
                                        label="Area of Research 2"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                                <Row>
                                    <TextField id="projectLink-input"
                                        value={this.state.projectResearchLink2}
                                        onChange={this.handleProjectResearchLink2Change}
                                        placeholder="Link"
                                        multiline
                                        rows="1"
                                        label="Link"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                            </Col>
                            <Col md={{ span: 6, offset: 0 }}>

                           </Col>
                        </Row>
                        <Row id='r-and-d-col'>
                            <Col md={{ span: 5, offset: 0 }}>
                                <Row>
                                    <TextField id="projectLink-input"
                                        value={this.state.projectResearch3}
                                        onChange={this.handleProjectResearch3Change}
                                        placeholder="Area of Research 3"
                                        multiline
                                        rows="1"
                                        label="Area of Research 3"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                                <Row>
                                    <TextField id="projectLink-input"
                                        value={this.state.projectResearchLink3}
                                        onChange={this.handleProjectResearchLink3Change}
                                        placeholder="Link"
                                        multiline
                                        rows="1"
                                        label="Link"
                                        margin="normal"
                                        variant="outlined">
                                    </TextField>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                         <div>
                            <Button color="success" onClick={() => this.setState({ showing: !showing })}><FontAwesomeIcon icon="upload"/>Upload Files</Button>                      {showing
                                ? <div className="zone">
                                    <Dropzone onDrop={this.onDrop} multiple>
                                        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => (
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                {isDragActive ? "Drop your file here" : 'Click or drag a file to upload'}
                                                <ul className="list-group mt-2">
                                                    {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                                                        <li className="list-group-item list-group-item-success">
                                                            {acceptedFile.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                                : null}
                            </div>
                        </Row>
                        <Row>
                            <Col md={{ span: 3, offset: 0 }}>
                                <div id='project-id-holder'>
                                    Project ID: <input type="text" disabled='true' class="form-control" id="projectId-input" value={'#' + this.state.projectNumber} />
                                </div>
                            </Col>
                            <Col md={{ span: 3, offset: 0 }}>
                                <div id='project-id-holder'>
                                    Project Owner: <input type="text" disabled='true' class="form-control" id="projectId-input" value={this.props.location.state.userData.firstName + ' ' + this.props.location.state.userData.lastName} />
                                </div>
                            </Col>
                            <Col md={{ span: 2, offset: 1 }}>
                                <div id='confirmation-button-holder'>
                                    <Button color='warning' id='reset-fields' onClick={this.resetFields}><FontAwesomeIcon icon="undo" /> Reset</Button>
                                    <Button color='primary' id='submit-project' disabled={this.state.projectName === ''} onClick={this.nextPage}><FontAwesomeIcon icon="check" /> Submit</Button>
                                </div>
                            </Col>
                        </Row>
                   
                </div>

            </div>
        );
    }
}
