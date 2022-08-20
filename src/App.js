// import logo from './logo.svg';
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

//Functional Component
import React, {useState, useEffect} from "react";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

let navaGrahas = [
  "Sun (Surya)",
  "Moon (Chandra)",
  "Mars (Mangala)",
  "Mercury (Budha)",
  "Jupiter (Brihaspati)",
  "Venus (Shukra)",
  "Saturn (Shani)",
  "Rahu (north node of the moon)",
  "Ketu (south node of the moon)",
];

function App() {
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [birthTotal, setBirthTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [difference, setDifference] = useState(0);
  const [graha, setGraha] = useState("");
  const [extraGraha, setExtraGraha] = useState("");
  useEffect(() => {
    console.log("difference", difference);
    if (difference > 0 && difference <= 9) {
      console.log("yeha aayo difference is less than 10");
      setGraha(navaGrahas[difference - 1]);
      setExtraGraha("");
    } else if (difference > 9) {
      console.log("yeha aayo difference is greater than 9");
      let abc = difference.toString().split("").map(Number);
      setGraha(navaGrahas[abc[0] - 1]);
      setExtraGraha(navaGrahas[abc[1] - 1]);
    }
  }, [difference]);

  const handleDate = ({bsDate, adDate}) => {
    setDate({date: bsDate});
    console.log(bsDate, adDate);
    let kk = bsDate.toString().replace("-", "");
    console.log("digits", kk);
    let digits = kk.replace("-", "").split("");
    let realDigits = digits.map(Number);
    console.log("realDigits", realDigits, realDigits.length);
    let i = 0;

    do {
      realDigits.push(realDigits[i]);
      i = i + 1;
      console.log("realDigits pushed", realDigits);
    } while (realDigits.length < 12);
    let sum = realDigits.reduce((a, b) => a + b);
    setBirthTotal(sum);
    console.log("total", total);
    setDifference(Math.abs(sum - total));
  };

  const handleToday = ({bsDate, adDate}) => {
    setToday({date: bsDate});
    console.log(bsDate, adDate);
    let kk = bsDate.toString().replace("-", "");
    console.log("digits", kk);
    let digits = kk.replace("-", "").split("");
    let realDigits = digits.map(Number);
    console.log("realDigits", realDigits, realDigits.length);
    let i = 0;

    do {
      realDigits.push(realDigits[i]);
      i = i + 1;
      console.log("realDigits pushed", realDigits);
    } while (realDigits.length < 12);
    let sum = realDigits.reduce((a, b) => a + b);
    setTotal(sum);
  };
  return (
    <>
      <div>
        <h1>Birth Date</h1>
        <Calendar onChange={handleDate} dateFormat="YYYY-M-D" language="en" />
      </div>

      <div>
        <Calendar
          onChange={handleToday}
          dateFormat="YYYY-M-D"
          language="en"
          className="hidden"
        />
      </div>
      {Math.abs(total - birthTotal) > 0 ? (
        <div>
          <h1>
            Difference {total} - {birthTotal} ={difference}
          </h1>
          <h1>{graha !== "" ? graha : ""}</h1>
          <h1>{extraGraha !== "" ? extraGraha : ""}</h1>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
