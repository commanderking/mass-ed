import React from "react";

const AddSchoolButton = ({ onClick, disabled }) => (
  <button disabled={disabled} onClick={onClick}>
    Add School
  </button>
);

export { AddSchoolButton };
