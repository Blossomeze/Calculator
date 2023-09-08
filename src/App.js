import { useState } from 'react';
import './App.css';

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      try {
        // Using try-catch to handle potential errors with eval
        setResult(eval(calc + value).toString());
      } catch (error) {
        setResult('Error');
      }
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    try {
      // Using try-catch to handle potential errors with eval
      setCalc(eval(calc).toString());
    } catch (error) {
      setCalc('Error');
    }
  };

  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  const clearAll = () => {
    // Clear both calc and result
    setCalc('');
    setResult('');
  };

  return (
    <div className="app">
      <div className='wrap'>
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''} {calc || '0'}&nbsp;
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
          <button onClick={clearAll}>CLEAR</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
        </div>
      </div>
        <footer>Developed by Blossom Eze</footer>
    </div>
  );
}

export default App;
