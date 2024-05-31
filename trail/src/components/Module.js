// components/Module.js

import React, { useState } from 'react';
import Resource from './Resource';
import ResourceForm from './ResourceForm';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

const Module = ({ module, modules, setModules, index }) => {
  const [showForm, setShowForm] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MODULE,
    item: { id: module.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleRename = () => {
    if (moduleName.trim() !== "") {
      const updatedModules = modules.map(mod =>
        mod.id === module.id ? { ...mod, name: moduleName } : mod
      );
      setModules(updatedModules);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedModules = modules.filter(mod => mod.id !== module.id);
    setModules(updatedModules);
  };

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid #000', margin: '10px', padding: '10px' }}>
      {isEditing ? (
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{module.name}</h2>
      )}
      <button onClick={handleDelete}>Delete Module</button>
      {module.resources.map(resource => (
        <Resource key={resource.id} resource={resource} moduleId={module.id} modules={modules} setModules={setModules} />
      ))}
      {showForm ? (
        <ResourceForm addResource={(name, type, fileOrUrl) => {
          const newResource = { id: Date.now(), name, type, [type === 'file' ? 'file' : 'url']: fileOrUrl };
          const updatedModule = { ...module, resources: [...module.resources, newResource] };
          const updatedModules = modules.map(mod => mod.id === module.id ? updatedModule : mod);
          setModules(updatedModules);
          setShowForm(false);
        }} />
      ) : (
        <button onClick={() => setShowForm(true)}>Add Resource</button>
        
      )}
    </div>
  );
};

export default Module;
