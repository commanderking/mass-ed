import React from "react";
import "rc-select/assets/index.css";
import Select, { Option } from "rc-select";
import { parseSchoolNameFromCompleteName } from "../../../common/utils/formatUtils";

const SchoolSelect = ({ selectSchool, allSchools }) => {
  return (
    <div style={{ width: 300 }}>
      <Select
        style={{ width: 500 }}
        onSelect={(selectValue, option) => {
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
        {allSchools.map((school, index) => {
          const schoolName = parseSchoolNameFromCompleteName(school.schoolName);
          return (
            <Option key={index.toString()} value={schoolName} index={index}>
              {schoolName}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export { SchoolSelect };
