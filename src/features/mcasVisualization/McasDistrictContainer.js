// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  selectDistrictAction,
  deleteDistrictAction,
  loadAllDistrictsAction,
  setSubjectAction,
  loadDistrictMcas
} from "./mcasActions";
import { McasChart } from "./components/McasChart";
import { SchoolDistrictSelect } from "./components/SchoolDistrictSelect";
import { AddSchoolButton } from "./components/AddSchoolButton";
import { SelectedSchoolsComponent } from "./components/SelectedSchoolsComponent";
import type { SchoolMcasType, SchoolCodeType } from "./mcas.flow.js";

import {
  selectSelectedSubject,
  selectDropdownDistrictIndex,
  selectAllDistricts,
  selectSelectedDistricts
} from "./mcasReducer";

type Props = {
  selectedDistricts: Array<SchoolMcasType>,
  dropdownCode: number,
  // TODO: Need to figure out how to handle functions
  allDistricts: Array<SchoolMcasType>,
  addDistrict: SchoolCodeType => void,
  addSchoolClick: SchoolCodeType => void,
  selectDistrict: SchoolCodeType => void,
  deleteDistrict: SchoolCodeType => void,
  fetchAllDistricts: () => void
};

type State = {
  loading: boolean
};

class UnwrappedMcasDistrictContainer extends Component<Props, State> {
  mcasData: Array<*>;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.props.fetchAllDistricts();
  }
  render() {
    const {
      allDistricts,
      dropdownCode,
      selectDistrict,
      addDistrict,
      selectedDistricts,
      deleteDistrict
    } = this.props;
    const { loading } = this.state;
    const hasReachedMaxSchools = selectedDistricts.length >= 4;

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <SchoolDistrictSelect
          selectSchool={selectDistrict}
          allSchools={allDistricts}
          disabled={hasReachedMaxSchools}
        />
        <AddSchoolButton
          schoolGroup="DISTRICT"
          disabled={hasReachedMaxSchools}
          onClick={() => {
            if (dropdownCode || dropdownCode === 0) {
              addDistrict(dropdownCode);
            }
          }}
        />
        {selectedDistricts.length ? (
          <div>
            <McasChart
              selectedSchools={selectedDistricts}
              setSubject={() => {}}
              selectedSubject="MATH"
            />
            <SelectedSchoolsComponent
              selectedSchools={selectedDistricts}
              deleteSchool={deleteDistrict}
            />
          </div>
        ) : (
          <div>No Chart</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedSubject: selectSelectedSubject(state),
    selectedDistricts: selectSelectedDistricts(state),
    allDistricts: selectAllDistricts(state),
    dropdownCode: selectDropdownDistrictIndex(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDistricts: () => {
      dispatch(loadAllDistrictsAction());
    },
    setSubject: subject => {
      dispatch(setSubjectAction(subject));
    },
    selectDistrict: index => {
      dispatch(selectDistrictAction(index));
    },
    addDistrict: code => {
      dispatch(loadDistrictMcas(code));
    },
    deleteDistrict: code => {
      dispatch(deleteDistrictAction(code));
    }
  };
};

const McasDistrictContainer = connect(mapStateToProps, mapDispatchToProps)(
  UnwrappedMcasDistrictContainer
);

export { McasDistrictContainer, UnwrappedMcasDistrictContainer };
