import { combineReducers } from "redux";

import authReducer from "./authReducer";
import productReducer from "./productReducer";
import offeringReducer from "./offeringReducer";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  offering: offeringReducer,
});
