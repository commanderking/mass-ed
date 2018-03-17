// @flow
import React from "react";
import { Button } from "reactstrap";
import { graphColors } from "../mcasConstants";

type Props = {
  schoolName: string,
  schoolCode: number,
  deleteSchool: any, // function
  index: number
};

export const SchoolLabel = ({
  schoolName,
  schoolCode,
  deleteSchool,
  index
}: Props) => {
  return (
    <div className="schoolLabelWrapper">
      <div
        className="selectedSchoolsIcon"
        style={{ backgroundColor: graphColors[index] }}
      />
      <span>{schoolName}</span>
      <Button
        className="closeGraphButton"
        onClick={() => {
          deleteSchool(schoolCode);
        }}
        color="danger"
        size="sm"
      >
        X
      </Button>
    </div>
  );
};
