import React, { useState } from 'react';
import ModuleList from './components/ModuleList';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);

  const addModule = (name) => {
    setModules([...modules, { id: Date.now(), name, resources: [] }]);
  };

  return (
    <div className="App">
      <h1>Course Builder</h1>
      <ModuleList modules={modules} setModules={setModules} />
      <button onClick={() => {
        const moduleName = prompt('Module name:');
        if (moduleName) addModule(moduleName);
      }}>
        Add Module
      </button>
    </div>
  );
};

export default App;
