// components/ResourceForm.js

import React, { useState } from 'react';

const ResourceForm = ({ addResource }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('file');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && (type === 'file' ? file : url)) {
      addResource(name, type, type === 'file' ? file : url);
      setName('');
      setType('file');
      setFile(null);
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Resource name"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="file">File</option>
        <option value="link">Link</option>
      </select>
      {type === 'file' ? (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      ) : (
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
      )}
      <button type="submit">Add</button>
    </form>
  );
};

export default ResourceForm;
