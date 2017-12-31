// flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { VictoryChart, VictoryBar, VictoryLabel, VictoryGroup } from 'victory';
import { addSchoolAction, selectSchoolAction, deleteSchoolAction } from './mcasActions';
import { SchoolLabel } from './components/SchoolLabel';
import VirtualizedSelect from 'react-virtualized-select';

// This only needs to be done once; probably during bootstrapping process.
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const categories = ['Exceeding', 'Meeting', 'Partially Meeting', 'Not Meeting'];

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
  [categories[0]] : 'exceededPercent',
  [categories[1]] : 'metPercent',
  [categories[2]] : 'partiallyMetPercent',
  [categories[3]] : 'notMetPercent'
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
    const schoolName = parseSchoolNameFromCompleteName(school.schoolName);
    return {
      value: schoolName,
      label: schoolName,
      index: index,
      schoolCode: school.schoolCode
    }
  });
  return data;
}

class UnwrappedMcasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
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
      return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: myHeaders,
        body: queryString
      })
        .then((response) => {
          response.json().then((data)=> {
              this.mcasData = data.data.schools;
              this.setState({ loading: false });
          })
        .catch(error => {
          console.log('Request failed', error);
        });
      });
    }

    fetchAllSchoolsArray();

  }
  render() {
    const { selectedSchoolIndexes, dropdownSchoolIndex, addSchoolClick, selectSchool, deleteSchool } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    const selectedSchoolName = parseSchoolNameFromCompleteName(this.mcasData[dropdownSchoolIndex].schoolName);
    return (
      <div>
        <div className="schoolSelectWrapper">
          <VirtualizedSelect
            options={getSchoolNames(this.mcasData)}
            optionHeight={50}
            onChange={(selectValue) => {
              if (selectValue) {
                selectSchool(selectValue.index);
              }
            }}
            value={selectedSchoolName}
          />
          <button onClick={ () => {
            addSchoolClick(this.mcasData[dropdownSchoolIndex].schoolCode);
          }}>Add School</button>
        </div>
        <div className='schoolLabelsWrapper'>
          <h3>Selected Schools</h3>
          { selectedSchoolIndexes.map((school, index) => {
            const { schoolName, schoolCode } = school;
            return (
              <SchoolLabel
                key={schoolName}
                schoolName={parseSchoolNameFromCompleteName(schoolName)}
                schoolCode={schoolCode}
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
              {selectedSchoolIndexes.map((school, index) => {
                return (
                  <VictoryBar
                    key={`${school.name}-${school.schoolCode}`}
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
                    data={formatDataForChart(school, index)}
                  />
                )
              })}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedSchoolIndexes, dropdownSchoolIndex } = state;
  return {
    selectedSchoolIndexes,
    dropdownSchoolIndex
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addSchoolClick: schoolCode => {
      dispatch(addSchoolAction(schoolCode));
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
