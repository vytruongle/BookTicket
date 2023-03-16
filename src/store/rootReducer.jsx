import { combineReducers } from "redux";
import { getInfoReducer } from "../actions/getInfoTicket";
import { seatReducer } from "../MovieSeat/reducer";

const rootReducer = combineReducers({
  seatReducer: seatReducer,
  getInfoReducer: getInfoReducer,
});

export { rootReducer };
