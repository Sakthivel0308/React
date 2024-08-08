import { useState } from 'react'
import './App.css'

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const CalculateBmi = () => {
    const isValidWeight = /^\d+$/.test(weight);
    const isValidHeight = /^\d+$/.test(height);
    if( isValidHeight && isValidWeight){
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(2));
        if(bmiValue < 18.5){
          setBmiStatus("Underweight");
        }else if(bmiValue >= 18.5 && bmiValue < 24.9){
          setBmiStatus("Normal");
        }else if(bmiValue >= 24.9 && bmiValue < 29.9){
          setBmiStatus("OverWeight");
        }else{
          setBmiStatus("Obese")
        }
        setErrorMessage("");
    }else{
      setBmi(null);
      setBmiStatus("");
      setErrorMessage("Please enter valid numeric value for height and weight");
    }
  }

  const clearAll = () => {
    setBmi(null);
    setBmiStatus("");
    setHeight("");
    setWeight("");
    setErrorMessage("");
  }


  return (
    <>
      <div className="bmi-calculator">
        <div className="box"></div>
        <div className="data">
          <h1>BIM CALCULATOR</h1>
          <p className='error'>{errorMessage}</p>
          <div className="input-container">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <button onClick={CalculateBmi}>Calculate BMI</button>
          <button onClick={clearAll}>Clear All</button>
          {bmi !== null && (
            <div className="result">
              <p>Your BMI is: {bmi}</p>
              <p>Status: {bmiStatus}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App
