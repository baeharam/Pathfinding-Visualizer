import React from 'react';
import { Provider } from 'Provider';
import Container from 'components/Container/Container';
import 'reset-css';
import './App.scss';

const App = () => {
  return (
    <Provider>
      <Container />
    </Provider>
  );
};

export default App;
