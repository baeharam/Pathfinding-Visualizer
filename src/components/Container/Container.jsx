import React from 'react';
import Header from '../Header/Header';
import Board from '../Board/Board';
import { Provider } from 'Provider';

const Container = () => {

  return (
    <Provider>
      <Header />
      <Board />
    </Provider>
  );
};

export default Container;