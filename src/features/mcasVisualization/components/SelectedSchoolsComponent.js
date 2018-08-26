import React from "react";
import { parseSchoolNameFromCompleteName } from "../../../common/utils/formatUtils";
import { SchoolLabel } from "./SchoolLabel";

const SelectedSchoolsComponent = ({ selectedSchools, deleteSchool }) => (
  <div id="SelectedSchoolsComponent" className="schoolLabelsWrapper">
    <h3>Selected Schools</h3>
    {selectedSchools.map((school, index) => {
      const { name, code } = school;
      return (
        <SchoolLabel
          key={name}
          index={index}
          name={parseSchoolNameFromCompleteName(name)}
          code={code}
          deleteSchool={deleteSchool}
        />
      );
    })}
  </div>
);

export { SelectedSchoolsComponent };
