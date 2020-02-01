// @flow

import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-modal';
import { FaGithub } from 'react-icons/fa';
import Header from 'components/Header/Header';
import Board from 'components/Board/Board';
import ModalInfo from 'components/ModalInfo/ModalInfo';
import ModalError from 'components/ModalError/ModalError';
import { Context, type ContextType } from 'Provider';
import Helmet from 'react-helmet';
import './Container.scss';

Modal.setAppElement('#root');

const Container = () => {
  const context = useContext(Context);
  const { isPathExist, clear, isHelped, setIsHelped }: ContextType = context;
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    if (!isPathExist) {
      clear();
      setIsErrorOpen(true);
    }
  }, [isPathExist, clear]);

  const onErrorClose = () => {
    setIsErrorOpen(false);
  };
  const onHelpClose = () => {
    setIsHelped(false);
  };

  return (
    <>
      <Helmet>
        <title>Pathfinding Visualizer</title>
      </Helmet>
      <header className="header">
        <h1 className="header__title">Pathfinding Visualizer</h1>
      </header>
      <ModalError isErrorOpen={isErrorOpen} onErrorClose={onErrorClose} />
      <ModalInfo isHelped={isHelped} onHelpClose={onHelpClose} />
      <Header />
      <Board />
      <footer className="footer">
        <p className="footer__author">Made by Haram Bae</p>
        <a
          href="https://github.com/baeharam/Pathfinding-Visualizer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footer__github" />
        </a>
      </footer>
    </>
  );
};

export default Container;
