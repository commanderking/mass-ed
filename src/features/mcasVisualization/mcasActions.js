export const mcasActionTypes = {
  ADD_SCHOOL: 'ADD_SCHOOL',
  SELECT_SCHOOL: 'SELECT_SCHOOL'
};

export const addSchoolAction = schoolIndex => {
  console.log('action fired');
  console.log(schoolIndex);
  return {
    type: mcasActionTypes.ADD_SCHOOL,
    schoolIndex
  }
}

export const selectSchoolAction = schoolIndex => {
  console.log('select school action fired');
  console.log(schoolIndex);
  return {
    type: mcasActionTypes.SELECT_SCHOOL,
    schoolIndex
  }
}
