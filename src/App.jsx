import React, { useState } from 'react';
import './App.css';
import { Vex, Stave, StaveNote, Formatter, Flow, Factory, EasyScore} from "vexflow";

// import { JSDOM } from "jsdom";
// import { jsPDF } from "jspdf";
// import "svg2pdf.js";

console.log(Vex.Flow.BUILD);
console.log("VexFlow Build:", Vex.Flow.BUILD);

const letters = ["C", "D", "E", "F", "G", "A", "B"];

const diatonic = [], sharps = [], flats = [];
for (let i = 0; i <= 9 ; i++) {
  diatonic.push(...letters.map( a => a + i ));
  sharps.push(...letters.map( a => a + '#' + i ));
  flats.push(...letters.map( a => a + 'b' + i ));
}

const matrix = [flats, diatonic, sharps];

function App() {
  const [note, setNote] = useState('C4');
  const [inputNote, setInputNote] = useState('C4');
  const [displayNote, setDisplayNote] = useState('C4');
  const [index, setIndex] = useState(28);
  const [accidental, setAccidental] = useState(0);

  const clear = () => {
    document.querySelector('#output').innerText = '';
  };
  const factory = new Factory({
    renderer: { elementId: "output", width: 175, height: 255 },
  });
  
  const updateSvg = (n) => {
    clear();
    if (!!n.match(/^[A-Ga-g]{1}[b,#]{0,1}\d{1}$/)) { 
      setNote(n);
      if (!!n.match('b')) {
        setIndex(flats.indexOf(n));
        setAccidental(-1);
      } else if (!!n.match('#')) {
        setIndex(sharps.indexOf(n));
        setAccidental(1);
      } else {
        setIndex(diatonic.indexOf(n));
        setAccidental(0);
      }
      setIndex(diatonic.indexOf(n))
      setDisplayNote((n.replace(/(?<=[a-gA-G])b(?=\d{1})/, '♭').replace('#', '♯')));
    }
    document.querySelector('#output svg')?.remove();
  }

  const score = factory.EasyScore();
  factory
      .System()
      .addStave({
          voices: [
            score.voice(score.notes(`C${accidental === 0 ? '#' : ''}5/q, ${note}/q, C#5/h`)), 
          ],
      })
      .addClef("treble")
  factory.draw();

  document.querySelector('#output .vf-stavenote:nth-of-type(even)').draggable = true;

  return (
    <>

    <h1>Notation Map</h1>
    <h2>Current note: <span> {displayNote} </span></h2>
    <label>Note:&nbsp;
      <input
      style={{ display:'inline-block', minWidth:'2em'}} 
      onChange={(e) => {
        setInputNote(e.target.value.replace(/[^a-gA-G#\d]/, '').slice(0, 3));
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
