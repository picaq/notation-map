import React, { useState, useEffect, useRef } from 'react';
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
  const [inputNote, setInputNote] = useState('');
  const [displayNote, setDisplayNote] = useState('C4');
  const [index, setIndex] = useState(28);
  const [accidental, setAccidental] = useState(0);

  const clear = () => {
    document.querySelector('#output').innerText = '';
  };
  
  const updateSvg = (n) => {
    if (!!n.match(/^[A-Ga-g]{1}[b,#]{0,1}\d{1}$/)) { 
      clear();
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
  }

  const factory = new Factory({
    renderer: { elementId: "output", width: 175, height: 375 },
  });

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

  document.querySelector('#output svg').setAttribute("viewBox", "0 -120 175 375");
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = ({ key }) => {
      if (key === 'Escape' ) {
        inputRef.current.focus();
        setInputNote('');
      }
      if (key === 'r' ) {
        setInputNote(randomNote());
      }
    }
    window.addEventListener('keydown', handler);
    return () => {
      // This is the cleanup function
      window.removeEventListener('keydown', handler);
    };
  }, []);

  useEffect(() => {
    updateSvg(inputNote);
  }, [inputNote]);

  const randomNote = () => matrix[Math.floor(3*Math.random())][Math.floor(70*Math.random())];


  return (
    <>

    <h1>Notation Map</h1>
    <h2>Current&nbsp;note: <span> {displayNote} </span></h2>
    <label
      // onClick={inputRef.current.focus()}
    >Note:&nbsp;
      <input
      style={{ display:'inline-block', maxWidth:'5.5em', textAlign:'center'}} 
      ref={inputRef}
      placeholder={randomNote()}
      onChange={(e) => {
        setInputNote(e.target.value.replace(/[^a-gA-G#\d]/, '').slice(0, 3));
      }}
      value={inputNote}
    >
      
    </input>
    </label>

    <form action="">
      <button 
        type="submit"
        value="random"
        onClick={ e=> {
        e.preventDefault();
        setInputNote(randomNote());}
      }
      >
        <span className="underline">r</span>andom
      </button>
    </form>

    <form action="">
      <button 
        type="button"

        >
          ♭
      </button>

    </form>
    
    </>
  );
}

export default App;
