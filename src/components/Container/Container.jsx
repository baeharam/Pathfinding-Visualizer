// @flow

import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-modal';
import Header from '../Header/Header';
import Board from '../Board/Board';
import { Context, type ContextType } from 'Provider';
import './Container.scss';

Modal.setAppElement('#root');

const Container = () => {

  const context = useContext(Context);
  const { 
    isPathExist, clear, 
    moveEndPoints, setMoveEndPoints 
  } : ContextType = context;
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (!isPathExist) {
      clear();
      setIsErrorOpen(true);
    }
  }, [isPathExist, clear]);

  useEffect(() => {
    if (moveEndPoints) {
      setMoveEndPoints(false);
      setIsInfoOpen(true);
    }
  }, [moveEndPoints,setMoveEndPoints])

  const onErrorClose = () => { setIsErrorOpen(false); };
  const onInfoClose = () => { setIsInfoOpen(false); };

  return (
    <>
      <header className="header">
        <h1 className="header__title">Pathfinding Visualizer</h1>
      </header>
      <Modal
        className="modal"
        isOpen={isErrorOpen}
        contentLabel="Example Modal"
        onRequestClose={onErrorClose}
      >
        <h1 className="modal__title">Error!</h1>
        <p className="modal__content">Cannot find path to the goal</p>
        <button onClick={onErrorClose} className="modal__close">X</button>
      </Modal>
      <Modal
        className="modal--info"
        isOpen={isInfoOpen}
        contentLabel="Example Modal"
        onRequestClose={onInfoClose}
      >
        <h1 className="modal__title--info">Info!</h1>
        <p className="modal__content">
          <span>Move begin endpoint</span><br/><br/>
          control key + mouse
        </p><br/><br/>
        <p className="modal__content">
          <span>Move end endpoint</span><br/><br/>
          alt key + mouse
        </p>
        <button onClick={onInfoClose} className="modal__close">X</button>
      </Modal>
      <Header />
      <Board />
      <footer className="footer">
        <p className="footer__author">Made by Haram Bae</p>
      </footer>
    </>
  );
};

export default Container;