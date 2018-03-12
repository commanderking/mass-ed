export const parseSchoolNameFromCompleteName = (schoolName: string): string => {
  const splitSchoolName = schoolName.split(" - ");
  const districtNameWords = splitSchoolName[0].split(" ");
  const schoolNameWords = splitSchoolName[1].split(" ");
  if (districtNameWords[0] === schoolNameWords[0]) {
    return splitSchoolName[1];
  }
  return schoolName;
};
