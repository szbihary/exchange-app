import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";

function SuccessDialog(props) {
  const { message, show, handleClose } = props;
  return (
    <Modal show={show} onClose={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          <Check color="green" size={40} />
          <span>Success</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessDialog;
