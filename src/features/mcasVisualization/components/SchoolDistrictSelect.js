import React from "react";
import "rc-select/assets/index.css";
import Select, { Option } from "rc-select";
import { parseSchoolNameFromCompleteName } from "../../../common/utils/formatUtils";
import type { SchoolMcasType } from "./mcas.flow.js";

type Props = {
  selectSchool: SchoolCodeType => void,
  allSchools: Array<SchoolMcasType>,
  disabled: boolean
};

const SchoolDistrictSelect = ({
  selectSchool,
  allSchools,
  disabled
}: Props) => {
  return (
    <div style={{ width: 300 }}>
      <Select
        id="SchoolDistrictSelect"
        style={{ width: 500 }}
        onSelect={(selectValue, option) => {
          if (selectValue) {
            selectSchool(option.props.code);
          }
        }}
        dropdownStyle={{
          height: "300px",
          overflow: "scroll"
        }}
        disabled={disabled}
        allowClear
        combobox
      >
        {allSchools.map((school, index) => {
          // TODO: Selector should really handle any parsing before we get into the component
          const name = parseSchoolNameFromCompleteName(school.name);
          // TEMPORARY - schoolCode is from returned school data, school.code is for district right now
          const code = school.schoolCode || school.code;
          return (
            <Option
              id={`SchoolDistrictOption-${code}`}
              key={index.toString()}
              value={name}
              index={index}
              code={code}
            >
              {name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export { SchoolDistrictSelect };
