import React from 'react';
import Header from '../Header/Header';
import Board from '../Board/Board';
import { Provider } from 'Provider';
import './Container.scss';

const Container = () => {

  return (
    <>
      <header className="header">
        <h1 className="header__title">Pathfinding Visualizer</h1>
      </header>
      <Provider>
        <Header />
        <Board />
      </Provider>
      <footer className="footer">
        <p className="footer__author">Made by Haram Bae</p>
      </footer>
    </>
  );
};

export default Container;