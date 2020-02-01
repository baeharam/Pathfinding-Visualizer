// @flow

import React from 'react';
import Modal from 'react-modal';
import './ModalError.scss';

type ModalErrorPropTypes = {
  isErrorOpen: boolean,
  onErrorClose: any => void,
};

const ModalError = ({ isErrorOpen, onErrorClose }: ModalErrorPropTypes) => {
  return (
    <Modal
      className="modal-error"
      isOpen={isErrorOpen}
      contentLabel="Example Modal"
      onRequestClose={onErrorClose}
    >
      <h1 className="modal-error__title">Error!</h1>
      <p className="modal-error__content">Cannot find path to the goal</p>
      <button
        onClick={onErrorClose}
        className="modal-error__close"
        type="button"
      >
        X
      </button>
    </Modal>
  );
};

export default ModalError;
