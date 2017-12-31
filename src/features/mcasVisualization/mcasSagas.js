import { call, put, takeEvery } from 'redux-saga/effects'
import { mcasActionTypes } from './mcasActions';

const myHeaders = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const createQueryStringWithSchoolCode = (schoolCode) => {
  return (JSON.stringify({query: `{
    school(subject: "MATH", schoolCode: ${schoolCode})
      {
        subject
        schoolName
        schoolCode
        exceededPercent
        metPercent
        partiallyMetPercent
        notMetPercent
      }
  }`}))
}

const fetchSchoolArray = (schoolCode) => {
  const queryString = createQueryStringWithSchoolCode(schoolCode);
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: myHeaders,
    body: queryString
  })
    .then((response) => {
      return response.json();
    })
    .catch(error => {
      console.log('Request failed', error);
    })
}

// worker Saga: will be fired on ADD_SCHOOL_REQUESTED actions
function* fetchSchoolMcasData(action) {
   try {
      const schoolData = yield call(fetchSchoolArray, action.payload.schoolCode);
      yield put({type: mcasActionTypes.ADD_SCHOOL_SUCCEEDED, payload: { schoolData: schoolData.data.school }});
   } catch (e) {
      yield put({type: mcasActionTypes.ADD_SCHOOL_FAILED, message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* fetchSchoolMcasDataSaga() {
  yield takeEvery("ADD_SCHOOL_REQUESTED", fetchSchoolMcasData);
}

export { fetchSchoolMcasDataSaga };
