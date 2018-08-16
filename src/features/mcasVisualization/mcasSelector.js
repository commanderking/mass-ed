import { createSelector } from "reselect";
import _ from "lodash";

import {
  selectAllSchools,
  selectSelectedSubject,
  selectSelectedSchools,
  selectSelectedDistricts
} from "./mcasReducer";

const hasAlreadySelectedSchool = (schoolCodes, school) =>
  schoolCodes.includes(school.code);

export const selectAllSchoolsBySubject = createSelector(
  selectAllSchools,
  selectSelectedSubject,
  selectSelectedSchools,
  (allSchools, subject, selectedSchools) => {
    const selectedSchoolCodes = selectedSchools.map(school => school.code);
    return allSchools.filter(school => {
      return !hasAlreadySelectedSchool(selectedSchoolCodes, school);
    });
  }
);

export const selectSelectedDistrictsCodes = createSelector(
  selectSelectedDistricts,
  districts => {
    return districts.map(district => district.code);
  }
);
