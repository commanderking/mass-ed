import React from 'react';

export const SchoolLabel = ({ schoolName, schoolIndex, deleteSchool }) => {
  return (
    <div className='schooLabelWrapper'>
      <span>{schoolName}</span>
      <button
        className="closeGraphButton"
        onClick={() => {
          deleteSchool(schoolIndex);
        }}
      >
        X
      </button>
    </div>
  )
};
