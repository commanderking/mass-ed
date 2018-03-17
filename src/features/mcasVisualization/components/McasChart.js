// @flow
import React from "react";
import { VictoryChart, VictoryLabel, VictoryGroup, VictoryBar } from "victory";
import { SubjectSelect } from "./SubjectSelect";
import { graphColors } from "../mcasConstants";

import type { SchoolMcasType } from "../mcas.flow";

type schoolDataForChart = {
  x: "Exceeding" | "Meeting" | "Partially Meeting" | "Not Meeting",
  y: number,
  fill: string
};

const formatDataForChart = (
  school: SchoolMcasType,
  index: number
): Array<schoolDataForChart> => {
  return categories.map(category => {
    return {
      x: category,
      y: school[mapCategoriesToRawDataValue[category]],
      fill: graphColors[index]
    };
  });
};

const categories = ["Exceeding", "Meeting", "Partially Meeting", "Not Meeting"];

const mapCategoriesToRawDataValue = {
  [categories[0]]: "exceededPercent",
  [categories[1]]: "metPercent",
  [categories[2]]: "partiallyMetPercent",
  [categories[3]]: "notMetPercent"
};

export const graphConstants = {
  DOMAIN_PADDING: 40
};

type Props = {
  selectedSchools: Array<SchoolMcasType>
};

const McasChart = ({ selectedSchools, setSubject, selectedSubject }: Props) => {
  return (
    <div className="mcasChartWrapper">
      <h3>MCAS 2017 Scores</h3>
      <SubjectSelect
        setSubject={setSubject}
        selectedSubject={selectedSubject}
      />
      <VictoryChart
        domainPadding={graphConstants.DOMAIN_PADDING}
        style={{
          parent: {
            border: "1px solid #ccc",
            marginTop: "-40px"
          }
        }}
      >
        <VictoryGroup
          offset={20}
          padding={-50}
          colorScale={"qualitative"}
          categories={{ x: categories }}
        >
          {selectedSchools.map((school, index) => {
            return (
              <VictoryBar
                key={`${school.schoolName}-${school.schoolCode}`}
                labels={d => `${d.y}%`}
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
            );
          })}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export { McasChart };
