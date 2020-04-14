import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Label, Input } from 'reactstrap';
import Slide from '@material-ui/core/Slide';
import { Container, Form, Button, FormGroup} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import './ProjectPrototype.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class ProjectPrototype extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: this.props.location.state.projectName,
            userData: this.props.location.state.userData || this.props.userData,
            prototypeName: '',
            prototypeDescription: '',
            files: []
        }
    }

    componentDidMount = () => {
        console.log(this.props)
    }

    resetFields = () => {
        this.setState({
            prototypeName: '',
            prototypeDescription: '',
        })
    }

    handlePrototypeNameChange = (event) => {
        this.setState({
            prototypeName: event.target.value
        });
    }

    handlePrototypeDescriptionChange = (event) => {
        this.setState({
            prototypeDescription: event.target.value
        });
    }


    onDrop = (files) => {
        this.setState({ files: files });
    }



    submitPrototype = () => {
        let formData = new FormData();
        this.state.files.map(file => {
            formData.append('Files', file);
        });
        formData.append('prototypeName', this.state.prototypeName);
        formData.append('prototypeDescription', this.state.prototypeDescription);
        formData.append('projectUid', this.state.projectName.uid);
        axios.post('/api/prototype',
            formData,
            {
            headers: {
                Authorization: 'Bearer ' + this.state.userData.token,
                'Content-Type': 'multipart/form-data'

            }
        }).then().catch(() => {
          console.log("Failure");
          });
        }


    nextPage = () => {
        this.props.history.push({
            pathname: '/home',
            state: this.state  // need this for moving to different component
        });
    }


    render() {
        return (

            <div id="prototype-container">

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

                <div id="prototype-main-content">
                    <div>
                        <h3 id="subtitle">Prototypes</h3>
                        <hr style={{ width: "30%" }} id="hr-1" />
                    </div>
                
                            <div className='project-definition-holder'>
                            <TextField
                                value={this.state.prototypetName}
                                onChange={this.handlePrototypeNameChange}
                                label="Name"
                                margin="normal"
                                placeholder="Enter Name..."
                                variant="outlined">
                            </TextField>
                            </div>
                        <div className='project-definition-holder'>
                            <TextField
                                value={this.state.prototypeDescription}
                                onChange={this.handlePrototypeDescriptionChange}
                                label="Description"
                                margin="normal"
                                rows="4"
                                multiline
                                placeholder="Enter Description..."
                                 variant="outlined">
                                    </TextField>
                                </div>
                        <h4>Upload your files</h4>
                        <div className = "zone">
                            <Dropzone onDrop={this.onDrop} multiple>
                                {({ getRootProps, getInputProps, isDragActive, acceptedFiles}) => (
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
                            <Button variant="primary" type="submit" onClick={this.submitPrototype}>Upload</Button>
                </div>
            </div>
        );
    }
}
