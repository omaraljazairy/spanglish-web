import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';


const CustomModal = (props) => {
    const [show, setShow] = useState(props.isShow);
    const [name, setName] = useState(props.name)
    // const [code, setCode] = useState(props.code)


    const handleClose = () => {
      setShow(false);
      props.handleEdit()
    }
    const handleShow = () => setShow(true);
    const handleName = (newName) => {
      setName(newName)
      props.edit(newName)
      // console.log("name from state: ", name)
      // console.log("newName from state: ", newName)
    }
  
    return (
      <Container>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <Form.Control 
              required
              type="text" 
              // placeholder={props.placeholder}
              // onChange={(event) => this.setState({lanCode: event.target.value})}
              value={name}
              onChange={(event) => handleName(event.target.value)}
              // onChange={(event) => props.edit(event.target.value)}
              /> 
            <Form.Control 
              required
              type="text" 
              // placeholder={props.placeholder}
              // onChange={(event) => this.setState({lanCode: event.target.value})}
              value={name}
              onChange={(event) => handleName(event.target.value)}
              // onChange={(event) => props.edit(event.target.value)}
              /> 

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
      </Container>
    );
  }
  
  export default CustomModal;