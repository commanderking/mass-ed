// flow
import React from 'react';
import { connect } from 'react-redux';

import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryGroup, VictoryLegend, VictoryTheme } from 'victory';
import { addSchoolAction, selectSchoolAction, deleteSchoolAction } from './mcasActions';
import { mcasData } from './mcasData';
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

const formatDataForChart = (school, index) => {
  console.log(colors[index]);
  return categories.map(category => {
    return { x: category, y: school[mapCategoriesToRawDataValue[category]], fill: colors[index]}
  })
}

const formatDataForLegend = (allSchools, selectedSchoolIndexes) => {
  return selectedSchoolIndexes.map((schoolIndex, index) => {
    return {
      name: allSchools[schoolIndex][mcasDataConstants.SCHOOL_NAME].split(' - ')[1],
      symbol: {
        fill: colors[index],
        type: 'star'
      }
    }
  });
}

const parseSchoolName = (schoolNameWithDistrict) => {
  return schoolNameWithDistrict.split('-')[1].trim()
}

const getSchoolNames = (allSchools) => {
  const data = allSchools.map((school, index) => {
    return {
      value: school[mcasDataConstants.SCHOOL_NAME],
      label: school[mcasDataConstants.SCHOOL_NAME],
      index: index
    }
  });
  return data;
}

export const UnwrappedMcasContainer = ({ allSchools, selectedSchoolIndexes, dropdownSchoolIndex, addSchoolClick, selectSchool, deleteSchool }) => {
  const showLegend = selectedSchoolIndexes.length === 0 ? false : true;
  return (
    <div>
      <div className="schoolSelectWrapper">
        <VirtualizedSelect
          options={getSchoolNames(allSchools)}
          onChange={(selectValue) => {
            if (selectValue) {
              selectSchool(selectValue.index);
            }
          }}
          value={allSchools[dropdownSchoolIndex][mcasDataConstants.SCHOOL_NAME]}
        />
        <button onClick={ () => {
          addSchoolClick(dropdownSchoolIndex);
        }}>Add School</button>
      </div>
      <div className='mcasChartWrapper'>
        <VictoryChart
          domainPadding={graphConstants.DOMAIN_PADDING}
        >
          { showLegend &&
            <VictoryLegend x={125} y={10}
              orientation="horizontal"
              gutter={20}
              padding={0}
              rowGutter={-10}
              itemsPerRow={1}
              x={0}
              y={0}
              style={{ labels: { fontSize: 10 }}}

              data={formatDataForLegend(allSchools, selectedSchoolIndexes)}
            />
          }

          <VictoryGroup offset={20}
            padding={0}
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
      {selectedSchoolIndexes.map((schoolIndex, index) => {
        const schoolData = allSchools[schoolIndex];
        return (
          <div key={schoolData[mcasDataConstants.SCHOOL_NAME]} className='chartWrapper'>
            <VictoryChart domainPadding={graphConstants.DOMAIN_PADDING} >
              <VictoryLabel
                text={parseSchoolName(schoolData[mcasDataConstants.SCHOOL_NAME])}
                textAnchor="middle"
                x={graphConstants.TITLE_X}
                y={graphConstants.TITLE_Y}
              />
              <VictoryBar
                data={formatDataForChart(schoolData, index)}
                categories={{ x: categories}}
                labels={(d) => `${d.y}%`}
                style={{
                  data: {
                    fill: graphConstants.BAR_FILL,
                    stroke: graphConstants.BAR_STROKE,
                    strokeWidth: graphConstants.BAR_STROKE_WIDTH
                  }
                }}
                />
              <VictoryAxis
                style={{
                  axisLabel: { padding: graphConstants.X_AXIS_LABEL_PADDING }
                }}
              />
              <VictoryAxis dependentAxis
                label={graphConstants.Y_AXIS_TEXT}
                style={{
                  axisLabel: { padding: graphConstants.Y_AXIS_LABEL_PADDING }
                }}
                tickFormat={(t) => `${Math.round(t)}%`}
              />
            </VictoryChart>
            <button
              className="closeGraphButton"
              onClick={() => {
                deleteSchool(schoolIndex);
              }}
            >
              X
            </button>
          </div>
        )
      })}
    </div>
  );
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
