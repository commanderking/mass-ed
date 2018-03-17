import {
  mcas,
  mcasReducerPath
} from "./features/mcasVisualization/mcasReducer";
import { combineReducers } from "redux";

const mcasVisualizationData = combineReducers({
  [mcasReducerPath]: mcas
});

export { mcasVisualizationData };
