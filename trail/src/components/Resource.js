// components/Resource.js

import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

const Resource = ({ resource, moduleId, modules, setModules }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.RESOURCE,
    item: { id: resource.id, moduleId },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleDeleteResource = () => {
    const updatedModules = modules.map(mod =>
      mod.id === moduleId ? { ...mod, resources: mod.resources.filter(res => res.id !== resource.id) } : mod
    );
    setModules(updatedModules);
  };

  const handleRenameResource = (newName) => {
    const updatedModules = modules.map(mod =>
      mod.id === moduleId ? {
        ...mod,
        resources: mod.resources.map(res =>
          res.id === resource.id ? { ...res, name: newName } : res
        )
      } : mod
    );
    setModules(updatedModules);
  };

  const openResource = () => {
    if (resource.type === 'file') {
      // For file type, check if it's an image or PDF
      if (resource.file && resource.file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(resource.file);
        window.open(imageUrl);
      } else if (resource.file && resource.file.type === 'application/pdf') {
        const pdfUrl = URL.createObjectURL(resource.file);
        window.open(pdfUrl);
      } else {
        // Handle other file types (e.g., provide a download link)
        console.log('Unsupported file type');
      }
    } else if (resource.type === 'link') {
      // For link type, open the URL in a new tab
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p>{resource.name}</p>
      <button onClick={handleDeleteResource}>Delete</button>
      <button onClick={() => {
        const newName = prompt('Enter new name:', resource.name);
        if (newName) {
          handleRenameResource(newName);
        }
      }}>Rename</button>
      <button onClick={openResource}>Open</button>
    </div>
  );
};

export default Resource;
