import React from "react";
import { parseSchoolNameFromCompleteName } from "../../../common/utils/formatUtils";
import { SchoolLabel } from "./SchoolLabel";

const SelectedSchoolsComponent = ({ selectedSchools, deleteSchool }) => (
  <div className="schoolLabelsWrapper">
    <h3>Selected Schools</h3>
    {selectedSchools.map((school, index) => {
      const { schoolName, schoolCode } = school;
      return (
        <SchoolLabel
          key={schoolName}
          index={index}
          schoolName={parseSchoolNameFromCompleteName(schoolName)}
          schoolCode={schoolCode}
          deleteSchool={deleteSchool}
        />
      );
    })}
  </div>
);

export { SelectedSchoolsComponent };
