import { createSelector } from "reselect";

import { selectAllSchools, selectSelectedSubject } from "./mcasReducer";

export const selectAllSchoolsBySubject = createSelector(
  selectAllSchools,
  selectSelectedSubject,
  (schools, subject) => {
    return schools.filter(school => {
      return school.subject === "ELA";
    });
  }
);
