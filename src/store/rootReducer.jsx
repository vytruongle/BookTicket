import { combineReducers } from "redux";
import { getInfoReducer } from "../actions/getInfoTicket";

const rootReducer = combineReducers({
  getInfoReducer: getInfoReducer,
});

export { rootReducer };
