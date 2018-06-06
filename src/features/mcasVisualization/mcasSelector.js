import { createSelector } from "reselect";
import { schoolGroupConstants } from "./mcasConstants";
import _ from "lodash";

import {
  selectAllSchools,
  selectAllDistricts,
  selectSchoolGroup,
  selectSelectedSubject,
  selectSelectedSchools
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
      return (
        school.subject === subject &&
        !hasAlreadySelectedSchool(selectedSchoolCodes, school)
      );
    });
  }
);

export const selectAllDistrictsBySubject = createSelector(
  selectAllDistricts,
  allDistricts => {
    return allDistricts;
  }
);

export const selectAllDistrictsOrSchools = createSelector(
  selectAllSchoolsBySubject,
  selectAllDistricts,
  selectSchoolGroup,
  (allSchools, allDistricts, schoolGroup) => {
    return schoolGroup === schoolGroupConstants.DISTRICT
      ? allDistricts
      : allSchools;
  }
);
