import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './css/MyProfile.css';
import {
  Row,
  Col,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Glyphicon
} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

import Auth from '../util/AuthService';

const MyProfile = observer(class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      editedFirstName: Auth.user.firstName,
      editedLastName: Auth.user.lastName,
      loading: false,
      done: false,
      fail: false
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // render component
  render() {
    return (
      <div className="MyProfile">
        <Row>
          <Col md={2} className="profilePic">
            <img src="/img/sample-profile-pic.jpg" alt=""/>
          </Col>
          <Col md={10} className="aboutUser">
            <Row>
              <Col>
                <h2>{Auth.user.firstName} {Auth.user.lastName}</h2>
                <hr />
                <strong>E-post:</strong> { Auth.user.email }
                <a className="btn btn-default pull-right" onClick={this.handleShowModal}><Glyphicon glyph="pencil" /> Redigera profil</a>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="modal-container" style={{ height: 200 }}>
          <Modal
            show={this.state.showEditModal}
            onHide={this.handleCloseModal}
            container={this}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Redigera profil
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <FieldGroup
                  id="editedFirstName"
                  name="editedFirstName"
                  type="text"
                  label="Förnamn"
                  placeholder={Auth.user.firstName}
                  value={this.state.editedFirstName}
                  onChange={this.handleChange}
                  />
                <FieldGroup
                  id="editedLastName"
                  name="editedLastName"
                  type="text"
                  label="Förnamn"
                  placeholder={Auth.user.lastName}
                  value={this.state.editedLastName}
                  onChange={this.handleChange}
                  />
              </Modal.Body>
              <Modal.Footer>
                <div className="btn-toolbar">
                  <Button onClick={this.handleCloseModal}>
                    Avbryt
                  </Button>
                  <Button className="btn btn-primary"
                          onClick={this.handleSubmit}>
                    Spara
                  </Button>                  
                </div>
                <LoadingSpinner
                  className="pull-left"
                  show={this.state.loading}
                  done={this.state.done}
                  fail={this.state.fail}
                  name="three-bounce"/>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    );
  }

  handleShowModal() {
    this.setState({
      showEditModal: true
    });
  }

  handleCloseModal() {
    this.setState({
      showEditModal: false,
      loading: false,
      done: false,
      fail: false
    });

  }

  async handleChange({ target }) {
    await this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  }  

  async handleSubmit() {
    // show loading icon
    this.setState({
      loading: true,
      done: false,
      fail: false
    });

    // update user
    const result = await Auth.update(this.state.editedFirstName,
                                     this.state.editedLastName);
    if (result) {
      this.setState({ done: true });
    } else {
      this.setState({ fail: true });
    }
  }
});

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

export default MyProfile;
