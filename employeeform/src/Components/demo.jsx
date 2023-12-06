import React, { useState } from 'react';

function App() {
  const [inputBoxes, setInputBoxes] = useState([]);

  const handleButtonClick = () => {
    setInputBoxes([...inputBoxes, <input type="text" key={inputBoxes.length} />]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button id="showInput" onClick={handleButtonClick}>
        Show Input Box
      </button>
      <div>
        {inputBoxes.map((inputBox, index) => (
          <div key={index}>{inputBox}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
