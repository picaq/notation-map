import React from 'react';
import './App.css';

import { Score } from 'react-vexflow';

function App() {
  return (
    <>
    <h1>Notation Map</h1>
    <h2>Note:&nbsp;
      <span
      contentEditable
      style={{ display:'inline-block', minWidth:'2em'}}
      
    >

    </span>
    </h2>
    
    <Score
    staves={[
      ['g3', 'd4', 'e4', 'd4'],
      ['a4', 'd4', 'e4', 'd4'],
      ['a4', 'a4', 'b4', 'a4'],
      ['d4', 'e4', ['g3', 2]],
    ]}
    />


    </>
  );
}

export default App;
