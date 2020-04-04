import axios from 'axios';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Portal from '@material-ui/core/Portal';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import './ConceptView.css';
import { textAlign } from '@material-ui/system';
import noProjectImage from "../../../../static/NoProjectsFound.png";
import addProject from "../../../../static/addProject.jpg";
import City from "../../../../static/City.jpg";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function getIndex(array, value) {
    console.log(array);
    for (var i = 0; i < array.length; i+=1)
    {
      if (array[i].qid == value)
      {
        console.log(i)
        return i;
      }
    }
    console.log("Search failed")
    return -1;
}

export default class ConceptView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: this.props.location.state.projectName,
            userData: this.props.location.state.userData || this.props.userData,
            concepts: this.props.location.state.concepts,
            questionModal: false,
            oldQuestionModal: false,
            learnModal: false,
            conceptUid: '',
            conceptName: '',
            newsHeadline: '',
            customer: '',
            customerProblem: '',
            benefitPromise: '',
            proof: '',
            price: '',
            passion: '',
            deathThreats: '',
            questions: [],
            answers: [],
            newAnswers: [],
            updatedAnswers: [],
            answerQueue: '',
            combinedAnswered: [],
            unansweredQuestions: [],
            openSuccessSnackBar: false,
            openErrorSnackBar : false,
            completedConcept: false,
            //imageLinks : [require("../../../../static/Beach.jpg"), require(City), require("../../../../static/Coast.jpg"),
              //              require("../../../../static/Field.jpg"), require("../../../../static/Mountain.jpg"), require("../../../../static/Underwater.jpg")]
        }
    }

    componentDidMount = () => {
        this.getQuestions();
        console.log(this.props);
    }

    getQuestions = async () => {
        const response = await axios.get('/api/project/questions', {
            headers: {
                Authorization: 'Bearer ' + this.state.userData.token //the token is a variable which holds the token
            }
        }).then(response => {
            response = response.data;
            this.setState({
                questions: response,
                test: response.length
            });
        });
    }


    getAnswers = async (uid) => {
        if (uid != null) {
            console.log(uid);
            const response = await axios.get(`/api/project/${uid}/answers`, {
                headers: {
                    Authorization: 'Bearer ' + this.state.userData.token //the token is a variable which holds the token
                }
            }).then(response => {
                response = response.data;
                this.setState({
                    answers: response
                }, () => (console.log(this.state.answers)));
            });
        };
    }

    handleCloseErrorModal = () => {
      this.setState({
          errorModal: false,
          learnModal: false,
          questionModal: false,
          oldQuestionModal: false,
      });
    }

    openErrorModal = () => {
      this.setState({
          errorModal: true
      });
    }

    handleCloseSuccessModal = () => {
      this.setState({
          successModal: false
      });
    }

    openSuccessModal = () => {
      this.setState({
          successModal: true
      });
    }

    handleOpenLearnModal = (concept) => {
        this.setState({
            learnModal: true,
            conceptUid: concept.uid,
            conceptName: concept.conceptName,
            newsHeadline: concept.newsHeadline,
            customer: concept.customer,
            customerProblem: concept.customerProblem,
            benefitPromise: concept.promise,
            proof: concept.proof,
            price: concept.price,
            passion: concept.passion,
            deathThreats: concept.deathThreats,
            completedConcept: true
          }, () => {
          this.getAnswers(concept.uid);
        });
      }

    handleOpenQuestionModal = async (concept) => {
        console.log(this.state.answers);
        this.computeArrays();
        this.setState({
            learnModal: false,
            questionModal: true,
        });
    }

    handleCloseLearnModal = () => {
        this.setState({
            learnModal: false,
            completedConcept: false
        });
    }

    handleOpenOldQuestionModal = () => {
        this.setState({
            oldQuestionModal: true,
            questionModal: false
        });
    }

    handleCloseOldQuestionModal = () => {
        this.setState({
            oldQuestionModal: false,
        });
    }


    handleCloseQuestionModal = () => {
        this.setState({
            questionModal: false
        });
    }

    resetFields = () => {
        this.setState({
            conceptName: '',
            newsHeadline: '',
            customer: '',
            customerProblem: '',
            benefitPromise: '',
            proof: '',
            price: '',
            passion: '',
            deathThreats: '',
        })
    }

    handleConceptNameChange = (event) => {
        this.setState({
            conceptName: event.target.value
        });
    }
    handleNewsHeadlineChange = (event) => {
        this.setState({
            newsHeadline: event.target.value
        });
    }
    handleCustomerChange = (event) => {
        this.setState({
            customer: event.target.value
        });
    }
    handleCustomerProblemChange = (event) => {
        this.setState({
            customerProblem: event.target.value
        });
    }
    handleBenefitPromiseChange = (event) => {
        this.setState({
            benefitPromise: event.target.value
        });
    }
    handleProofChange = (event) => {
        this.setState({
            proof: event.target.value
        });
    }
    handlePriceChange = (event) => {
        this.setState({
            price: event.target.value
        });
    }
    handlePassionChange = (event) => {
        this.setState({
            passion: event.target.value
        });
    }
    handleDeathThreatsChange = (event) => {
        this.setState({
            deathThreats: event.target.value
        });
    }

    handleAnswer = (event, i) => {
        console.log(event.target.value)
        const newAnswers = this.state.newAnswers;
        newAnswers[i] = event.target.value;
        this.setState({ newAnswers });
    }

    handleUpdatedAnswer = (event, i) => {
        const answers = this.state.answers;
        console.log(answers);
        var el = getIndex(answers, i);
        console.log(el);
        answers[el].answer = event.target.value;
        this.setState({ answers });
        console.log(this.state.answers);
    }

    computeArrays = () => {
        var ids = [];
        var answered = [];
        var unanswered = [];
        this.state.answers.forEach(answer => ids.push(answer.qid))
        console.log(ids);
        this.state.questions.forEach(function(question) {
          if (ids.includes(question.id))
          {
            console.log("Found: " + question.id + " in answered questions.");
            answered.push(question);
          }
          else
          {
            console.log("Didn't find: " + question.id + " in answered questions.");
            unanswered.push(question);
          }
        });
        console.log(answered);
        console.log(unanswered);

        var ansQns = this.state.answers.map ( function(x, i){
          return {"answer": x, "question": answered[i]}
        }.bind(this));

        this.setAnswered(ansQns, unanswered);
    }

    setAnswered = (ans, unans) =>
    {
        this.setState({
          combinedAnswered: ans,
          unansweredQuestions: unans
        }, () =>
        console.log(this.state.unansweredQuestions));
    }


    updateConcept = async () => {
        console.log(this.state.conceptUid)

        axios.put(`/api/project/${this.state.conceptUid}/update-concept`,
            {
                'conceptName': this.state.conceptName,
                'newsHeadline': this.state.newsHeadline,
                'customer': this.state.customer,
                'customerProblem': this.state.customerProblem,
                'promise': this.state.benefitPromise,
                'proof': this.state.proof,
                'price': this.state.price,
                'passion': this.state.passion,
                'deathThreats': this.state.deathThreats,
                'projectUid': this.state.projectName.uid,
                'answerList': [],
            },
          {
          headers: {
            Authorization: 'Bearer ' + this.state.userData.token
          }
        }
      ).then(this.handleOpenQuestionModal).catch(() => {
        this.openErrorModal();
        this.setState({
          errorMessage: 'Error: Concept could not be updated!'
        });
      });
    }


    submitAnswers = async () => {
        axios.post(`/api/project/post-answer`,
              {
                  'cuid': this.state.conceptUid,
                  'answerList': this.state.newAnswers,
              },
            {
            headers: {
              Authorization: 'Bearer ' + this.state.userData.token
            }
          }
        ).then(this.handleOpenOldQuestionModal).catch(() => {
          this.openErrorModal();
          this.setState({
            errorMessage: 'Error: Concept could not be updated!'
          });
        });
      }

      updateAnswers = () => {
        try {
            const answers = this.state.answers;
            answers.forEach(answer =>
            (
              axios.put(`/api/project/update-answer`,
                  {
                      'uid': answer.uid,
                      'answer': answer.answer,
                  },
                {
                headers: {
                  Authorization: 'Bearer ' + this.state.userData.token
                }
              }
            )
          ));
          this.handleCloseOldQuestionModal();
          this.openSuccessModal();
          this.setState({
            successMessage: 'Concept ' + this.state.conceptName + ' and your questions have successfully been updated!'
          });
        }
        catch (e) {
          this.openErrorModal();
          this.setState({
            errorMessage: 'Error: Concept could not be created!'
          });
        }
      }


    copyToClipboard = () => {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
    }

    addConcept = () => {
            this.props.history.push({
                pathname: '/concept',
                state: this.state  // need this for moving to different component
            });
          }

    render() {


        return (
            <div className='dashboard-container'>

                <SideNav
                    onSelect={(selected) => {
                        // Add your code here
                    }}
                >

                 <SideNav.Toggle />

                    <SideNav.Nav defaultSelected="">


                        <NavItem role="menuitem" eventKey="home">
                            <NavIcon>
                                    <FontAwesomeIcon icon="home" id="dash-icon" style={{ fontSize: '1.75em' }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{paddingTop: 13, paddingRight: 32, fontSize: 18}}>
                                Home
                            </NavText>

                        </NavItem>

                        <NavItem eventKey="charts">
                            <NavIcon>
                                    <FontAwesomeIcon icon="plus" id="dash-icon" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText style={{ paddingTop: 13, paddingRight: 32, fontSize: 18 }}>
                                Add Project
                            </NavText>
                            <NavItem eventKey="charts/linechart">
                                <NavText>
                                    Line Chart
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="charts/barchart">
                                <NavText>
                                    Bar Chart
                                </NavText>
                            </NavItem>
                        </NavItem>

                        <NavItem role="menuitem" eventKey="settings">
                            <NavIcon>
                                <FontAwesomeIcon icon="cogs" id="dash-icon" style={{ fontSize: '1.75em' }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 13, paddingRight: 32, fontSize: 18 }}>
                                Settings
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="info">
                            <NavIcon>
                                <FontAwesomeIcon icon="info-circle" id="dash-icon" style={{ fontSize: '1.75em' }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 13, paddingRight: 32, fontSize: 18 }}>
                                About
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="help">
                            <NavIcon>
                                <FontAwesomeIcon icon="question" id="dash-icon" style={{ fontSize: '1.75em' }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 13, paddingRight: 32, fontSize: 18 }}>
                                Help
                            </NavText>

                        </NavItem>

                        <NavItem role="menuitem" eventKey="logout">
                            <NavIcon>
                                <FontAwesomeIcon icon="sign-out-alt" id="dash-icon" style={{ fontSize: '1.75em' }} />
                            </NavIcon>

                            <NavText id="nav-text" style={{ paddingTop: 13, paddingRight: 32, fontSize: 18 }}>
                                Logout
                            </NavText>

                        </NavItem>


                    </SideNav.Nav>

               </SideNav>




                <div class="row" id="background-concepts">
                        <h3 id="page-title">Concepts for {this.state.projectName.title}</h3>
                        <div className='concept-board-body'>
                            {this.state.concepts.map((concept, index) => {
                                return (
                                    <div class='concept-paper-holder'>
                                        <Card style={{ height: 200 }}>
                                            <Paper className='concept-paper'>
                                                <CardActionArea onClick={() => this.handleOpenLearnModal(concept)}>
                                                    <CardContent id='concept-card-content'>

                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {concept.conceptName}
                                                        </Typography>
                                                        <Typography id="description-logo" variant="body2" color="textSecondary" component="p">
                                                            <FontAwesomeIcon id='font-awesome-space-right' icon="stream" style={{ fontSize: '1.4em' }}/>
                                                            <strong>News Headline</strong> {concept.newsHeadline.slice(0, 58)}...
                                                        </Typography>
                                                        <Typography id="description-logo" variant="body2" color="textSecondary" component="p">
                                                            <FontAwesomeIcon id='font-awesome-space-right' icon="project-diagram" style={{ fontSize: '1.1em' }}/>
                                                                <strong>ID:</strong> #{concept.uid}
                                                        </Typography>
                                                        <Typography id="description-logo" variant="body2" color="textSecondary" component="p">
                                                            <FontAwesomeIcon id='font-awesome-space-right' icon="heart" style={{ fontSize: '1.4em' }}/>
                                                            <strong>Promise </strong>{concept.promise}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <div id='share-learn-container'>
                                                        <Button id='learn-button' size="small" color="info">
                                                            Edit
                                                         <FontAwesomeIcon id='font-awesome-space' icon="info-circle" />
                                                        </Button>
                                                    </div>
                                                </CardActions>
                                            </Paper>
                                        </Card>
                                    </div>
                                );
                            })
                            }
                                <div className='concept-paper-holder'>
                                    <Card>
                                        <Paper className='concept-paper' onClick={this.addConcept}>
                                            <CardActionArea>
                                                <CardMedia
                                                    style={{ height: 0, paddingTop: '56.25%' }}
                                                    image={addProject}
                                                    title="Add Concept"
                                                />

                                                <CardContent>

                                                    <Typography variant="h5" component="h2">
                                                        <center>
                                                            Add Concept +
                                        </center>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>

                                        </Paper>
                                    </Card>
                                </div>
                            </div>

                            <div>
                                <Dialog id="learn-dialog"
                                    open={this.state.learnModal}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    maxWidth='xl'
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle >
                                        {"Manage Concept"}
                                    </DialogTitle>
                                    <DialogContent dividers>
                                        <Container id='tainer'>
                                        <div className='concept-name-holder'>
                                              <TextField id="concept-name-field"
                                                value={this.state.conceptName}
                                                onChange={this.handleConceptNameChange}
                                                label="Name"
                                                multiline
                                                margin="dense"
                                                placeholder="Enter Concept Name..."
                                                variant="outlined">
                                               </TextField>
                                          </div>
                                          <Row id='r-and-d-col'>
                                              <Col>
                                                  <TextField id="full-concept-field"
                                                      value={this.state.newsHeadline}
                                                      onChange={this.handleNewsHeadlineChange}
                                                      label="News Headline"
                                                      placeholder="Enter the big idea for this concept..."
                                                      multiline
                                                      rows="2"
                                                      margin="normal"
                                                      variant="outlined">
                                                  </TextField>
                                              </Col>
                                          </Row>
                                          <Row>
                                              <Col md={{ span: 6, offset: 0 }} >
                                                  <TextField id="concept-field"
                                                      value={this.state.customer}
                                                      onChange={this.handleCustomerChange}
                                                      label="Customer"
                                                      placeholder="Enter your customer for this concept..."
                                                      multiline
                                                      rows="2"
                                                      margin="normal"
                                                      variant="outlined">
                                                  </TextField>
                                              </Col>
                                              <Col md={{ span: 5, offset: 0 }} >
                                                  <TextField id="concept-field"
                                                      value={this.state.customerProblem}
                                                      onChange={this.handleCustomerProblemChange}
                                                      label="Customer Problem"
                                                      placeholder="Enter the customer problem you're trying to solve..."
                                                      multiline
                                                      rows="2"
                                                      margin="normal"
                                                      variant="outlined">
                                                  </TextField>
                                              </Col>
                                          </Row>
                                          <Row>
                                              <Col md={{ span: 6, offset: 0 }} >
                                                  <TextField id="concept-field"
                                                      value={this.state.benefitPromise}
                                                      onChange={this.handleBenefitPromiseChange}
                                                      label="Benefit Promise"
                                                      placeholder="Enter what you're promising as a benefit to your customer..."
                                                      multiline
                                                      rows="2"
                                                      margin="normal"
                                                      variant="outlined">
                                                  </TextField>
                                              </Col>
                                              <Col md={{ span: 5, offset: 0 }} >
                                                <TextField id="concept-field"
                                                    value={this.state.proof}
                                                    onChange={this.handleProofChange}
                                                    label="Proof"
                                                    multiline
                                                    rows="3"
                                                    margin="normal"
                                                    placeholder="Enter proof that your concept can work..."
                                                    variant="outlined">
                                                </TextField>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md={{ span: 6, offset: 0 }} >
                                                <TextField id="concept-field"
                                                    value={this.state.price}
                                                    onChange={this.handlePriceChange}
                                                    label="Price"
                                                    placeholder="Enter your price for this concept..."
                                                    multiline
                                                    rows="2"
                                                    margin="normal"
                                                    variant="outlined">
                                                </TextField>
                                              </Col>
                                            <Col md={{ span: 5, offset: 0 }} >
                                              <TextField id="concept-field"
                                                  value={this.state.passion}
                                                  onChange={this.handlePassionChange}
                                                  label="Passion"
                                                  multiline
                                                  rows="3"
                                                  margin="normal"
                                                  placeholder="Enter your passion for this concept..."
                                                  variant="outlined">
                                              </TextField>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col md={{ span: 6, offset: 0 }} >
                                              <TextField id="concept-field"
                                                  value={this.state.deathThreats}
                                                  onChange={this.handleDeathThreatsChange}
                                                  label="Death Threats"
                                                  multiline
                                                  rows="3"
                                                  margin="normal"
                                                  placeholder="Enter any potential threats to the success of this project..."
                                                  variant="outlined">
                                                </TextField>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>

                                            </Col>
                                          </Row>
                                        </Container>
                                    </DialogContent>


                                    <DialogActions>
                                        <Button color="danger" onClick={this.handleCloseLearnModal}>Don't Save</Button>
                                        <Button color="primary" disabled={this.state.conceptName.length <= 0} onClick={() => { this.updateConcept() }}>Save & Continue</Button>
                                    </DialogActions>
                                </Dialog>
                        </div>

                        <div>
                          <Dialog id="questions-dialog"
                              open={this.state.questionModal}
                              TransitionComponent={Transition}
                              keepMounted
                              maxWidth='xl'
                              aria-labelledby="alert-dialog-slide-title"
                              aria-describedby="alert-dialog-slide-description">
                          <DialogContent>
                            <Container>
                                <h4>Answer all that may apply.</h4>
                                <div>
                                {
                                      this.state.unansweredQuestions.map(qsn => (
                                      <div>
                                              <div key={`qText${qsn.id}`}>{qsn.text}</div>
                                              <TextField key={`qsn${qsn.id}`}
                                                  onChange={(event) => this.handleAnswer(event, `${qsn.id}`)}
                                                  multiline
                                                  rows="3"
                                                  fullWidth
                                                  variant="outlined">
                                              </TextField>
                                              <p></p>
                                      </div>
                                  ))
                                }
                                </div>
                            </Container>
                          </DialogContent>
                          <DialogActions>
                              <Button color="danger" onClick={this.handleCloseQuestionModal}>Don't Save</Button>
                              <Button color="primary" disabled={this.state.conceptName.length <= 0} onClick={() => { this.submitAnswers() }}>Save & Continue</Button>
                          </DialogActions>
                      </Dialog>
                  </div>

                  <div>
                    <Dialog id="old-questions-dialog"
                        open={this.state.oldQuestionModal}
                        TransitionComponent={Transition}
                        keepMounted
                        maxWidth='xl'
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                    <DialogContent>
                      <Container>
                          <h4>Answer all that may apply.</h4>
                          <div>
                              {
                                  this.state.combinedAnswered.map(qsn => (
                                  <div>
                                          <div key={`qText${qsn.question.id}`}>{qsn.question.text}</div>
                                          <TextField key={`qsn${qsn.question.id}`}
                                              defaultValue={qsn.answer.answer}
                                              onChange={(event) => this.handleUpdatedAnswer(event, `${qsn.question.id}`)}
                                              multiline
                                              rows="3"
                                              fullWidth
                                              variant="outlined">
                                          </TextField>
                                          <p></p>
                                  </div>
                                ))
                              }
                          </div>
                      </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button color="danger" onClick={this.handleCloseOldQuestionModal}>Don't Save</Button>
                        <Button color="primary" disabled={this.state.conceptName.length <= 0} onClick={() => { this.updateAnswers() }}>Save & Finish</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
              <Dialog
                open={this.state.errorModal}
                TransitionComponent={Transition}
                keepMounted
                maxWidth='lg'
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="responsibe-alert-dialog-slide-title">
                  {this.state.errorMessage}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={this.handleCloseErrorModal} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div>

              <Dialog
                open={this.state.successModal}
                TransitionComponent={Transition}
                keepMounted
                maxWidth='lg'
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="responsibe-alert-dialog-slide-title">
                  {this.state.successMessage}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={this.handleCloseSuccessModal} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

              </div>
            </div>


        );
    }

}