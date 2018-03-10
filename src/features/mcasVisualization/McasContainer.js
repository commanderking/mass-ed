// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addSchoolAction,
  selectSchoolAction,
  deleteSchoolAction,
  addAllSchoolsAction
} from "./mcasActions";
import { SchoolLabel } from "./components/SchoolLabel";
import { McasChart } from "./McasChart";

import "rc-select/assets/index.css";
import Select, { Option } from "rc-select";

import type { schoolMcasType } from "./mcas.flow.js";

const parseSchoolNameFromCompleteName = (schoolName: string): string => {
  const splitSchoolName = schoolName.split(" - ");
  const districtNameWords = splitSchoolName[0].split(" ");
  const schoolNameWords = splitSchoolName[1].split(" ");
  if (districtNameWords[0] === schoolNameWords[0]) {
    return splitSchoolName[1];
  }
  return schoolName;
};

type Props = {
  selectedSchools: Array<schoolMcasType>,
  dropdownSchoolIndex: number,
  // TODO: Need to figure out how to handle functions
  addSchoolClick: any,
  selectSchool: any,
  deleteSchool: any
};

type State = {
  loading: boolean
};

class UnwrappedMcasContainer extends Component<Props, State> {
  mcasData: Array<*>;
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.props.addAllSchools();
  }
  render() {
    const {
      allSchools,
      selectedSchools,
      dropdownSchoolIndex,
      addSchoolClick,
      selectSchool,
      deleteSchool
    } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="schoolSelectWrapper">
          <div style={{ width: 300 }}>
            <Select
              style={{ width: 500 }}
              onSelect={(selectValue, option) => {
                if (selectValue) {
                  console.log("selectValue", option.props.index);
                  selectSchool(option.props.index);
                }
              }}
              dropdownStyle={{
                height: "300px",
                overflow: "scroll"
              }}
              allowClear
              combobox
              backfill
            >
              {allSchools.map((school, index) => {
                const schoolName = parseSchoolNameFromCompleteName(
                  school.schoolName
                );
                return (
                  <Option
                    key={index.toString()}
                    value={schoolName}
                    index={index}
                  >
                    {schoolName}
                  </Option>
                );
              })}
            </Select>
          </div>
          <button
            onClick={() => {
              if (dropdownSchoolIndex) {
                addSchoolClick(allSchools[dropdownSchoolIndex].schoolCode);
              }
            }}
          >
            Add School
          </button>
        </div>
        <McasChart selectedSchools={selectedSchools} />
        <div className="schoolLabelsWrapper">
          <h3>Selected Schools</h3>
          {selectedSchools.map((school, index) => {
            const { schoolName, schoolCode } = school;
            return (
              <SchoolLabel
                key={schoolName}
                index={index}
                schoolName={parseSchoolNameFromCompleteName(schoolName)}
                schoolCode={schoolCode}
                deleteSchool={deleteSchool}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { allSchools, selectedSchools, dropdownSchoolIndex } = state;
  return {
    allSchools,
    selectedSchools,
    dropdownSchoolIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAllSchools: () => {
      dispatch(addAllSchoolsAction());
    },
    addSchoolClick: schoolCode => {
      dispatch(addSchoolAction(schoolCode));
    },
    selectSchool: schoolIndex => {
      dispatch(selectSchoolAction(schoolIndex));
    },
    deleteSchool: schoolIndex => {
      dispatch(deleteSchoolAction(schoolIndex));
    }
  };
};

const McasContainer = connect(mapStateToProps, mapDispatchToProps)(
  UnwrappedMcasContainer
);

export { McasContainer };
