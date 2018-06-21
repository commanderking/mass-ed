import React from "react";
import { Button } from "reactstrap";
import { Route, Link } from "react-router-dom";
import { McasContainer } from "mcasVisualization/McasContainer";
import { McasDistrictContainer } from "mcasVisualization/McasDistrictContainer";
import { McasSchoolGroupOptions } from "mcasVisualization/McasSchoolGroupOptions";
const McasButton = () => (
  <Link to="/mcas">
    <Button data-id="McasDataButton">Mcas Data</Button>
  </Link>
);

const RouterContainer = () => (
  <div>
    <Route exact path="/" component={McasButton} />
    <Route exact path="/mcas" component={McasSchoolGroupOptions} />
    <Route exact path="/mcas/district" component={McasDistrictContainer} />
    <Route exact path="/mcas/school" component={McasContainer} />
  </div>
);

export { RouterContainer };
