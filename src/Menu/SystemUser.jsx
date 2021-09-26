/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component, setShow } from 'react';
import { Button, Modal } from 'react-bootstrap';

class AddUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.buttonclick = this.buttonclick.bind(this);
  }
  buttonclick() {
    var test = 'asdfasf';
    console.log(test);
  }

  handleClose = () => setShow(false);

  handleShow = () => setShow(true);
  render() {
    return (
      <Modal
        show={this.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button size="sm" variant="primary">
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default AddUser;
