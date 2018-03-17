import { call, put, takeEvery } from "redux-saga/effects";
import { mcasActionTypes } from "./mcasActions";
import { fetchSchoolArray, fetchAllSchools } from "./mcasDataRequests";
const {
  ADD_SCHOOL_SUCCEEDED,
  ADD_SCHOOL_FAILED,
  LOAD_ALL_SCHOOLS_SUCCEEDED,
  LOAD_ALL_SCHOOLS_FAILED
} = mcasActionTypes;
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
}

export { fetchSchoolMcasDataSaga };
