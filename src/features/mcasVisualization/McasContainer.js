// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addSchoolAction,
  selectSchoolAction,
  deleteSchoolAction
} from "./mcasActions";
import { SchoolLabel } from "./components/SchoolLabel";
import { McasChart } from "./McasChart";

import "rc-select/assets/index.css";

import type { schoolMcasType } from "./mcas.flow.js";

import Select, { Option } from "rc-select";

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
      loading: true
    };
  }
  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    });

    const queryString = JSON.stringify({
      query: `{
        schools(subject: "MATH")
          {
            subject
            schoolName
            schoolCode
          }
      }`
    });

    const fetchAllSchoolsArray = () => {
      return fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: myHeaders,
        body: queryString
      }).then(response => {
        response
          .json()
          .then(data => {
            this.mcasData = data.data.schools;
            this.setState({ loading: false });
          })
          .catch(error => {
            console.log("Request failed", error);
          });
      });
    };

    fetchAllSchoolsArray();
  }
  render() {
    const {
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

    console.log(dropdownSchoolIndex);
    const selectedSchoolName = parseSchoolNameFromCompleteName(
      this.mcasData[dropdownSchoolIndex].schoolName
    );
    return (
      <div>
        <div className="schoolSelectWrapper">
          <div style={{ width: 300 }}>
            <Select
              style={{ width: 500 }}
              onSelect={(selectValue, option) => {
                console.log("selectValue", selectValue);
                console.log("props", option.props);
                if (selectValue) {
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
              {this.mcasData.map((school, index) => {
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
              addSchoolClick(this.mcasData[dropdownSchoolIndex].schoolCode);
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
  const { selectedSchools, dropdownSchoolIndex } = state;
  return {
    selectedSchools,
    dropdownSchoolIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
