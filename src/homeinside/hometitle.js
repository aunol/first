import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

const HomeTitle = () => {
  const [title, setTitle] = useState('Hello MyHome');
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setTempTitle(e.target.value);
  };

  const handleTitleSave = () => {
    setTitle(tempTitle);
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(title);
    setIsEditing(false);
  };

  return (
    
        <CardTitle tag="h4" className="title">
          {isEditing ? (
            <div>
              <input 
                type="text" 
                value={tempTitle} 
                onChange={handleTitleChange} 
              />
              <button onClick={handleTitleSave}>Save</button>
              <button onClick={handleTitleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              {title} 
              <a 
                style={{ cursor: 'pointer' }} 
                onClick={handleEditClick}
              > + </a>
            </div>
          )}
        </CardTitle>
     
  );
};

export default HomeTitle;
