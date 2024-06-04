import React from 'react';
import './App.css';
import { Vex, Stave, StaveNote, Formatter, Flow, Factory, EasyScore} from "vexflow";
// import { JSDOM } from "jsdom";
// import { jsPDF } from "jspdf";
// import "svg2pdf.js";

console.log(Vex.Flow.BUILD);
console.log("VexFlow Build:", Vex.Flow.BUILD);

const factory = new Factory({
  renderer: { elementId: "output", width: 500, height: 200 },
});


const score = factory.EasyScore();
factory
    .System()
    .addStave({
        voices: [score.voice(score.notes("C#5/q, B4, A4, G#4", { stem: "up" })), score.voice(score.notes("C#4/h, C#4", { stem: "down" }))],
    })
    .addClef("treble")
    .addTimeSignature("4/4");
factory.draw();

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

    <a href="http://">test link</a>

    <section id="output">
      
    </section>

    
    </>
  );
}


export default App;
