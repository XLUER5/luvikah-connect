import { Modal } from "react-bootstrap";
import React from "react";
import { Uploader } from "../Uploader";
import "../../assets/css/Uploader.css";

export const UploadModal = ({ handleClose, show, getGaleria }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      id="loginModal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title></Modal.Title>
        <button
          type="button"
          onClick={handleClose}
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3 className="titleModal">SUBE TU FOTOGRAFIA</h3>
        </div>
        <Uploader getGaleria={getGaleria} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};
