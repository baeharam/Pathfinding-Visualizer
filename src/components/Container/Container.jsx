// @flow

import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-modal';
import Header from '../Header/Header';
import Board from '../Board/Board';
import { Context, type ContextType } from 'Provider';
import './Container.scss';
import ModalInfo from 'components/ModalInfo/ModalInfo';
import ModalError from 'components/ModalError/ModalError';

Modal.setAppElement('#root');

const Container = () => {

  const context = useContext(Context);
  const { 
    isPathExist, clear, 
    isHelped, setIsHelped
  } : ContextType = context;
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    if (!isPathExist) {
      clear();
      setIsErrorOpen(true);
    }
  }, [isPathExist, clear]);

  const onErrorClose = () => { setIsErrorOpen(false); };
  const onHelpClose = () => { setIsHelped(false); };

  return (
    <>
      <header className="header">
        <h1 className="header__title">Pathfinding Visualizer</h1>
      </header>
      <ModalError isErrorOpen={isErrorOpen} onErrorClose={onErrorClose} />
      <ModalInfo isHelped={isHelped} onHelpClose={onHelpClose} />
      <Header />
      <Board />
      <footer className="footer">
        <p className="footer__author">Made by Haram Bae</p>
      </footer>
    </>
  );
};

export default Container;