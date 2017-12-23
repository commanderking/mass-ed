// flow
import React from 'react';
import { connect } from 'react-redux';

import { VictoryChart, VictoryBar, VictoryLabel, VictoryGroup } from 'victory';
import { addSchoolAction, selectSchoolAction, deleteSchoolAction } from './mcasActions';
import { mcasData } from './mcasData';
import { SchoolLabel } from './components/SchoolLabel';
import VirtualizedSelect from 'react-virtualized-select';

// This only needs to be done once; probably during bootstrapping process.
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const categories = ['Exceeding', 'Meeting', 'Partially Meeting', 'Not Meeting'];

const mcasDataConstants = {
  SCHOOL_NAME: 'School Name'
}

/**
  * #aec6cf - pastel blue
  * #b19cd9 - pastel purple
  * #77dd77 - pastel green
  * #ff6961 - pastel red
  */
const colors = [
  "#aec6cf",
  "#b19cd9",
  "#77dd77",
  "#ff6961"
];

export const graphConstants = {
  DOMAIN_PADDING: 40,
  TITLE_X: 225,
  TITLE_Y: 20,
  X_AXIS_LABEL_PADDING: 30,
  Y_AXIS_LABEL_PADDING: 40,
  Y_AXIS_TEXT: '% Students',
  BAR_FILL: '#c43a31',
  BAR_STROKE: 'black',
  BAR_STROKE_WIDTH: 2
}

const mapCategoriesToRawDataValue = {
  [categories[0]] : 'E %',
  [categories[1]] : 'M %',
  [categories[2]] : 'PM %',
  [categories[3]] : 'NM %'
};

const parseSchoolNameFromCompleteName = schoolName => {
  const splitSchoolName = schoolName.split(' - ');
  const districtNameWords = splitSchoolName[0].split(' ');
  const schoolNameWords = splitSchoolName[1].split(' ');
  if (districtNameWords[0] === schoolNameWords[0]) {
    return splitSchoolName[1];
  }
  return schoolName;
}

const formatDataForChart = (school, index) => {
  return categories.map(category => {
    return {
      x: category,
      y: school[mapCategoriesToRawDataValue[category]],
      fill: colors[index]
    }
  });
}

const getSchoolNames = (allSchools) => {
  const data = allSchools.map((school, index) => {
    const schoolName = parseSchoolNameFromCompleteName(school[mcasDataConstants.SCHOOL_NAME]);
    return {
      value: schoolName,
      label: schoolName,
      index: index
    }
  });
  return data;
}

export const UnwrappedMcasContainer = ({ allSchools, selectedSchoolIndexes, dropdownSchoolIndex, addSchoolClick, selectSchool, deleteSchool }) => {
  const selectedSchoolName = parseSchoolNameFromCompleteName(allSchools[dropdownSchoolIndex][mcasDataConstants.SCHOOL_NAME]);
  return (
    <div>
      <div className="schoolSelectWrapper">
        <VirtualizedSelect
          options={getSchoolNames(allSchools)}
          optionHeight={50}
          onChange={(selectValue) => {
            if (selectValue) {
              selectSchool(selectValue.index);
            }
          }}
          value={selectedSchoolName}
        />
        <button onClick={ () => {
          addSchoolClick(dropdownSchoolIndex);
        }}>Add School</button>
      </div>
      <div className='schoolLabelsWrapper'>
        <h3>Selected Schools</h3>
        { selectedSchoolIndexes.map((schoolIndex, index) => {
          const schoolData = allSchools[schoolIndex];
          const schoolName = parseSchoolNameFromCompleteName(schoolData[mcasDataConstants.SCHOOL_NAME]);
          return (
            <SchoolLabel
              key={schoolName}
              schoolName={schoolName}
              schoolIndex={schoolIndex}
              deleteSchool={deleteSchool}
            />
          )
        })}
      </div>
      <div className='mcasChartWrapper'>
        <VictoryChart
          domainPadding={graphConstants.DOMAIN_PADDING}
        >
          <VictoryLabel
            text={'MCAS 2017 Scores'}
            textAnchor='middle'
            x={250}
            y={20}
          />
          <VictoryGroup
            offset={20}
            padding={-50}
            colorScale={"qualitative"}
            categories={{ x: categories}}
          >
            {selectedSchoolIndexes.map((schoolIndex, index) => {
              return (
                <VictoryBar
                  labels={(d) => `${d.y}%`}
                  style={{
                    data: {
                      width: 18,
                      padding: 5
                    },
                    labels: {
                      fontSize: 10
                    }
                  }}
                  data={formatDataForChart(allSchools[schoolIndex], index)}
                />
              )
            })}
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  const { selectedSchoolIndexes, dropdownSchoolIndex } = state;
  return {
    allSchools: mcasData, // Hard coded for now, move to entity eventually
    selectedSchoolIndexes,
    dropdownSchoolIndex
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addSchoolClick: schoolData => {
      console.log('in addSchoolClick');
      dispatch(addSchoolAction(schoolData));
    },
    selectSchool: schoolIndex => {
      dispatch(selectSchoolAction(schoolIndex))
    },
    deleteSchool: schoolIndex => {
      dispatch(deleteSchoolAction(schoolIndex))
    }
  }
}

const McasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnwrappedMcasContainer);

export { McasContainer };
