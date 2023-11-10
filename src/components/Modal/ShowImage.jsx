import { Modal } from "react-bootstrap";

export const ShowImage = ({ handleClose, show, imageURL }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        id="showImage"
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
            <img src={imageURL} className="show-image" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};