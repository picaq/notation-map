import React, { useState } from 'react';
import './App.css';
import { Vex, Stave, StaveNote, Formatter, Flow, Factory, EasyScore} from "vexflow";

// import { JSDOM } from "jsdom";
// import { jsPDF } from "jspdf";
// import "svg2pdf.js";

console.log(Vex.Flow.BUILD);
console.log("VexFlow Build:", Vex.Flow.BUILD);


function App() {
  const [note, setNote] = useState('C4');
  const [inputNote, setInputNote] = useState('C4');
  const [displayNote, setDisplayNote] = useState('C4');

  const clear = () => {
    document.querySelector('#output').innerText = '';
  };
  const factory = new Factory({
    renderer: { elementId: "output", maxWidth: 500, height: 400 },
  });
  
  const updateSvg = (n) => {
    clear();
    if (!!n.match(/^[A-Ga-g]{1}[b,#]{0,1}\d{1}$/)) { 
      setNote(n);
      setDisplayNote((n.replace(/(?<=[a-gA-G])b(?=\d{1})/, '♭').replace('#', '♯')));
    }
    document.querySelector('#output svg')?.remove();
  }

  const score = factory.EasyScore();
  factory
      .System()
      .addStave({
          voices: [
            score.voice(score.notes(`${note}/h, ${note}/q, ${note}/q`)), 
          ],
      })
      .addClef("treble")
  factory.draw();

  return (
    <>

    <h1>Notation Map</h1>
    <h2>Current note: <span> {displayNote} </span></h2>
    <label>Note:&nbsp;
      <input
      style={{ display:'inline-block', minWidth:'2em'}} 
      onChange={(e) => {
        setInputNote(e.target.value);
        updateSvg(e.target.value);
      }}
      value={inputNote}
    >
      
    </input>
    </label>
    
    </>
  );
}


export default App;
