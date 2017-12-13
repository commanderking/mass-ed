// flow
import React from 'react';
import { connect } from 'react-redux';

import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import { addSchoolAction, selectSchoolAction } from './mcasActions';
import { mcasData } from './mcasData';
import VirtualizedSelect from 'react-virtualized-select';

// This only needs to be done once; probably during bootstrapping process.
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'


const categories = ['Exceeding', 'Meeting', 'Partially Meeting', 'Not Meeting'];

const mapCategoriesToRawDataValue = {
  [categories[0]] : 'E %',
  [categories[1]] : 'M %',
  [categories[2]] : 'PM %',
  [categories[3]] : 'NM %'
};

const formatDataForChart = school => {
  console.log(school);
  return categories.map(category => {
    return { x: category, y: school[mapCategoriesToRawDataValue[category]]}
  })
}

const parseSchoolName = (schoolNameWithDistrict) => {
  console.log(schoolNameWithDistrict);
  return schoolNameWithDistrict.split('-')[1].trim()
}

const getSchoolNames = () => {
  const data = mcasData.map((school, index) => {
    return {
      value: school['School Name'],
      label: school['School Name'],
      index: index
    }
  });

  console.log(data);
  return data;
}

const UnwrappedMcasContainer = ({ selectedSchoolIndexes, dropdownSchoolIndex, addSchoolClick, selectSchool }) => (
  <div>
    <div className="schoolSelectWrapper">
      <VirtualizedSelect
        options={getSchoolNames()}
        onChange={(selectValue) => {
          console.log(selectValue);
          selectSchool(selectValue.index);
        }}
        value={mcasData[dropdownSchoolIndex]['School Name']}
      />
      <button onClick={ () => {
        addSchoolClick(dropdownSchoolIndex);
      }}>Add School</button>
    </div>
    {selectedSchoolIndexes.map((schoolIndex) => {
      const schoolData = mcasData[schoolIndex];
      console.log('selectSchools map school', schoolData);
      console.log('school name', schoolData['School Name']);
      return (
        <div key={schoolData['School Name']} className='chartWrapper'>
          <VictoryChart domainPadding={40} >
            <VictoryLabel
              text={parseSchoolName(schoolData['School Name'])}
              textAnchor="middle"
              x={225}
              y={20}
            />
            <VictoryBar
              data={formatDataForChart(schoolData)}
              categories={{ x: categories}}
              labels={(d) => `${d.y}%`}
              style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }}}
              />
            <VictoryAxis
              style={{
                axisLabel: { padding: 30 }
              }}
            />
            <VictoryAxis dependentAxis
              label="% Students"
              style={{
                axisLabel: { padding: 40 }
              }}
              tickFormat={(t) => `${Math.round(t)}%`}
            />
          </VictoryChart>
          <span>x</span>
        </div>
      )
    })}

  </div>
);

const mapStateToProps = state => {
  const { selectedSchoolIndexes, dropdownSchoolIndex } = state;
  console.log(selectedSchoolIndexes);
  return {
    selectedSchoolIndexes,
    dropdownSchoolIndex
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addSchoolClick: schoolData => {
      dispatch(addSchoolAction(schoolData));
    },
    selectSchool: schoolIndex => {
      dispatch(selectSchoolAction(schoolIndex))
    }
  }
}

const McasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnwrappedMcasContainer);

export { McasContainer };
