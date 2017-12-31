import React from 'react';
import { VictoryChart, VictoryLabel, VictoryGroup, VictoryBar } from 'victory';
import { graphColors } from './mcasConstants';

const formatDataForChart = (school, index) => {
  return categories.map(category => {
    return {
      x: category,
      y: school[mapCategoriesToRawDataValue[category]],
      fill: graphColors[index]
    }
  });
}

const categories = ['Exceeding', 'Meeting', 'Partially Meeting', 'Not Meeting'];

const mapCategoriesToRawDataValue = {
  [categories[0]] : 'exceededPercent',
  [categories[1]] : 'metPercent',
  [categories[2]] : 'partiallyMetPercent',
  [categories[3]] : 'notMetPercent'
};

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

const McasChart = ({ selectedSchools }) => {
  return (
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
          {
            selectedSchools.map((school, index) => {
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
            })
          }
        </VictoryGroup>
      </VictoryChart>
    </div>
  )

}

export { McasChart };
