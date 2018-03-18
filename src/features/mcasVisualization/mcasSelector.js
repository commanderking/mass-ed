import { createSelector } from "reselect";

import {
  selectAllSchools,
  selectSelectedSubject,
  selectSelectedSchools
} from "./mcasReducer";

const hasAlreadySelectedSchool = (schoolCodes, school) =>
  schoolCodes.includes(school.schoolCode);

export const selectAllSchoolsBySubject = createSelector(
  selectAllSchools,
  selectSelectedSubject,
  selectSelectedSchools,
  (allSchools, subject, selectedSchools) => {
    const selectedSchoolCodes = selectedSchools.map(
      school => school.schoolCode
    );
    return allSchools.filter(school => {
      return (
        school.subject === subject &&
        !hasAlreadySelectedSchool(selectedSchoolCodes, school)
      );
    });
  }
);
