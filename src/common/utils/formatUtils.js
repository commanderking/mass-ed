// School names are prefixed by district and if so, we want to disregard the district - school names
// I.e. Agawam - Agawam Junior High --> Agawam Junior High
export const parseSchoolNameFromCompleteName = (name: string): string => {
  const splitSchoolName = name.split(" - ");
  if (splitSchoolName.length > 1) {
    const districtNameWords = splitSchoolName[0].split(" ");
    const schoolNameWords = splitSchoolName[1].split(" ");
    const hasRepeatedDistrictName = districtNameWords[0] === schoolNameWords[0];
    if (hasRepeatedDistrictName) {
      // Ignore first part, which contains district name since it's already repeated in the school name
      return splitSchoolName[1];
    }
  }
  return name;
};
