import React from 'react';
import Container from './components/Container/Container';
import { Provider } from 'Provider';
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
