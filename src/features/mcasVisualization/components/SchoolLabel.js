// @flow
import React from "react";
import { Button } from "reactstrap";
import { graphColors } from "../mcasConstants";

type Props = {
  name: string,
  code: number,
  deleteSchool: any, // function
  index: number
};

export const SchoolLabel = ({ name, code, deleteSchool, index }: Props) => {
  return (
    <div className="schoolLabelWrapper">
      <div>
        <Button
          id={`DeleteSchoolDistrict-${code}-button`}
          className="deleteSchoolDistrictButton"
          onClick={() => {
            deleteSchool(code);
          }}
          color="danger"
          size="sm"
        >
          X
        </Button>
        <div
          className="selectedSchoolsIcon"
          style={{ backgroundColor: graphColors[index] }}
        />
        <span>{name}</span>
      </div>
    </div>
  );
};
