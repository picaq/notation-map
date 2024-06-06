import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setNote(matrix[accidental+1][index]);
    setDisplayNote((matrix[accidental+1][index]?.replace(/(?<=[a-gA-G])b(?=\d{1})/, '♭')?.replace('#', '♯')));
  }, [accidental, index]);


  useEffect(() => {
    setDisplayNote(note?.replace(/(?<=[a-gA-G])b(?=\d{1})/, '♭')?.replace('#', '♯'));
    const factory = new Factory({
      renderer: { elementId: "output", width: 175, height: 255 },
    });
    
    const score = factory.EasyScore();
    factory
        .System()
        .addStave({
            voices: [
              score.voice(score.notes(`C#5/q, ${!!note ? note : 'C4'}/q, C#5/h`)), 
            ],
        })
        .addClef("treble")
    factory.draw();
  }, [note]);

  const clear = () => {
    document.querySelector('#output').innerText = '';
    document.querySelectorAll('#output svg')?.forEach(s => s.remove());
  };

  const updateSvg = (n) => {
    if (!!n?.match(/^[A-Ga-g]{1}[b,#]{0,1}\d{1}$/)) { 
      clear();
      setNote(n);
      if (!!n?.match(/([a-gA-G])b(\d{1})/)) {
        setIndex(flats.indexOf(n));
        setAccidental(-1);
      } else if (!!n.match('#')) {
        setIndex(sharps.indexOf(n));
        setAccidental(1);
      } else {
        setIndex(diatonic.indexOf(n));
        setAccidental(0);
      }
    }
  }
  
  const changeNote = (key) => {
    if (!!key.match(/^Arrow/)) {
      if (key === "ArrowUp") {
        if (index < 69) { 
          clear();
          setIndex(index + 1); 
        }
      } else if (key === "ArrowDown") {
        if (index > 0) { 
          clear();
          setIndex(index - 1); 
        }
      } else if (key === "ArrowLeft") {
        if (accidental > -1) { 
          clear();
          setAccidental(accidental - 1); 
        }
      } else if (key === "ArrowRight") {
        if (accidental < 1) { 
          clear();
          setAccidental(accidental + 1); 
        }
      } else {
        updateSvg(inputNote);
      }
      setNote(matrix[accidental+1][index]);
      // updateSvg(matrix[accidental+1][index]);
      console.log({accidental});
      console.log({index});
      console.log({note});
    }
  }
  useEffect(() => {
    updateSvg(inputNote);
  }, [inputNote]);

  return (
    <>

    <h1>Notation Map</h1>
    <h2>Current note: <span> {displayNote} </span></h2>
    <label>Note:&nbsp;
      <input
      pattern="^[A-Ga-g]{1}[b,#]{0,1}\d{1}$"
      maxLength={3}
      style={{ display:'inline-block', maxWidth:'5em', textAlign:'center'}} 
      onChange={(e) => {
        setInputNote(e.target.value.replace(/[^a-gA-G#\d]/, '').slice(0, 3));
      }}
      onKeyDown={ e => changeNote(e.key) }
      onKeyUp={ e => !note && updateSvg(e.target.value) }
      value={inputNote}
    >
      
    </input>
    </label>
    <button type="submit"
      onClick={e => {e.preventDefault()} }
    >submit</button>
    
    </>
  );
}


export default App;
