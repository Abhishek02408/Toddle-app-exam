// components/ModuleList.js

import React from 'react';
import Module from './Module';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

const ModuleList = ({ modules, setModules }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.MODULE,
    drop(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = modules.length;
      if (dragIndex === hoverIndex) {
        return;
      }
      setModules((prevModules) => {
        const newModules = [...prevModules];
        const draggedModule = newModules[dragIndex];
        newModules.splice(dragIndex, 1);
        newModules.splice(hoverIndex, 0, draggedModule);
        return newModules;
      });
      item.index = hoverIndex;
    }
  });

  return (
    <div ref={drop}>
      {modules.map((module, index) => (
        <Module key={module.id} module={module} modules={modules} setModules={setModules} index={index} />
      ))}
    </div>
  );
};

export default ModuleList;
