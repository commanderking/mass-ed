import React from 'react';

export const SchoolLabel = ({ schoolName, schoolCode, deleteSchool }) => {
  return (
    <div className='schooLabelWrapper'>
      <span>{schoolName}</span>
      <button
        className="closeGraphButton"
        onClick={() => {
          deleteSchool(schoolCode);
        }}
      >
        X
      </button>
    </div>
  )
};
