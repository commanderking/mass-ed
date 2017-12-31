import React from 'react';
import { graphColors } from '../mcasConstants';

export const SchoolLabel = ({ schoolName, schoolCode, deleteSchool, index }) => {
  return (
    <div className='schoolLabelWrapper'>
      <div className='selectedSchoolsIcon' style={{ backgroundColor: graphColors[index] }}></div>
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
