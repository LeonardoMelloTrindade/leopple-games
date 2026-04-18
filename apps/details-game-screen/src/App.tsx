import type { Component } from 'solid-js';
import { Button } from '@leopple-games/styles/bootstrap/solid-bootstrap';
import '@leopple-games/styles/normalize';

const App: Component = () => {
  return (
    <>
      <h1>Hello world!!!!</h1>
      <Button variant="primary">Botão do Solid Bootstrap</Button>
    </>
  );
};

export default App;
