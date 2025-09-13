
import React, { useState } from 'react';
import './BMICalculator.css';

function calculateBMI({ feet, inches, kg }) {
  if (!feet || !inches || !kg) return '';
  const heightInches = Number(feet) * 12 + Number(inches);
  const heightMeters = heightInches * 0.0254;
  return (kg / (heightMeters * heightMeters)).toFixed(1);
}


export default function BMI() {
  const [inputs, setInputs] = useState({ feet: '', inches: '', kg: '' });
  const [bmi, setBmi] = useState('');

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleCalculate() {
    setBmi(calculateBMI(inputs));
  }

  return (
    <div className="bmi-container">
      <div className="bmi-calculator">
        <div className="inputs-row">
          <div className="input-group">
            <label>Height</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                placeholder="Feet"
                name="feet"
                value={inputs.feet}
                onChange={handleChange}
                min="0"
                style={{ width: '80px' }}
              />
              <input
                type="number"
                placeholder="Inches"
                name="inches"
                value={inputs.inches}
                onChange={handleChange}
                min="0"
                style={{ width: '80px' }}
              />
            </div>
          </div>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Kilograms"
              name="kg"
              value={inputs.kg}
              onChange={handleChange}
              min="0"
              style={{ width: '120px' }}
            />
          </div>
        </div>
        <button className="calc-btn" onClick={handleCalculate}>Calculate Your BMI</button>
        {bmi && (
          <>
            <div className="result">Your BMI: <strong>{bmi}</strong></div>
            <div className="bmi-category-message">
              {(() => {
                const val = parseFloat(bmi);
                if (val < 18.5) return 'You are in the Underweight category.';
                if (val >= 18.5 && val < 25) return 'You are in the Healthy category.';
                if (val >= 25 && val < 30) return 'You are in the Overweight category.';
                if (val >= 30) return 'You are in the Obesity category.';
                return '';
              })()}
            </div>
          </>
        )}
      </div>
      <div className="bmi-categories">
        <h3>BMI Categories</h3>
        <table>
          <thead>
            <tr>
              <th>BMI Category</th>
              <th>BMI Range</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Underweight</td><td>Below 18.5</td></tr>
            <tr><td>Healthy</td><td>18.5 – 24.9</td></tr>
            <tr><td>Overweight</td><td>25.0 – 29.9</td></tr>
            <tr><td>Obesity</td><td>30.0 or above</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
