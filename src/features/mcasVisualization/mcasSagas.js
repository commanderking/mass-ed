import { call, put, select, takeEvery } from "redux-saga/effects";
import { mcasActionTypes } from "./mcasActions";
import { selectSelectedSchools } from "./mcasReducer";
import { subjectsConstants } from "./mcasConstants";
import {
  fetchSchoolArray,
  fetchAllSchools,
  fetchAllSelectedSchools
} from "./mcasDataRequests";
const {
  ADD_SCHOOL_SUCCEEDED,
  ADD_SCHOOL_FAILED,
  LOAD_ALL_SCHOOLS_SUCCEEDED,
  LOAD_ALL_SCHOOLS_FAILED
} = mcasActionTypes;

// TODO: Should be able to refactors this with fetchSelectedSchoolsForSubjectSwitch
function* fetchSchoolMcasData(action) {
  try {
    const schoolData = yield call(fetchSchoolArray, action.payload.schoolCode);
    yield put({
      type: ADD_SCHOOL_SUCCEEDED,
      payload: { schoolData: schoolData.data.school }
    });
  } catch (e) {
    yield put({ type: ADD_SCHOOL_FAILED, message: e.message });
  }
}

function* fetchSelectedSchoolsForSubjectSwitch(action) {
  try {
    const selectedSchools = yield select(selectSelectedSchools);
    // TODO: SetSubject should not fire graphql request if subject is the same
    // const selectedSubject = yield select(selectSelectedSubject);
    const schoolCodes = selectedSchools.map(school => school.schoolCode);
    const subject = subjectsConstants[action.payload.subject];
    // TODO: This toUpperCase is needed for graphQL call - should make ENUM to make graphql and this consistent
    const selectedSchoolsData = yield call(fetchAllSelectedSchools, {
      subject,
      schoolCodes
    });
    yield put({
      type: mcasActionTypes.SET_SUBJECT_SUCCEEDED,
      payload: { selectedSchoolsData }
    });
  } catch (e) {
    yield put({
      type: mcasActionTypes.SET_SUBJECT_FAILED,
      message: e.message
    });
  }
}

function* fetchAllSchoolData(action) {
  try {
    const allSchoolsData = yield call(fetchAllSchools);
    yield put({
      type: LOAD_ALL_SCHOOLS_SUCCEEDED,
      payload: { allSchoolData: allSchoolsData.data.allSchools }
    });
  } catch (e) {
    yield put({
      type: LOAD_ALL_SCHOOLS_FAILED,
      message: e.message
    });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* fetchSchoolMcasDataSaga() {
  yield takeEvery("ADD_SCHOOL_REQUESTED", fetchSchoolMcasData);
  yield takeEvery("LOAD_ALL_SCHOOLS_REQUESTED", fetchAllSchoolData);
  yield takeEvery("SET_SUBJECT", fetchSelectedSchoolsForSubjectSwitch);
}

export { fetchSchoolMcasDataSaga };
