import { CREATE_OFFERING, GET_ALL_OFFERING, GET_OFFER, OFFERING_ERROR, GET_ALL_OFFER, UPDATE_OFFERING } from "../actions/types";

const initialState = {
  offering: [],
  status: [],
  error: null
};

const offeringReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OFFER:
      return {
        ...state,
        offering: action.offering,
        status: action.status,
      };
    case GET_ALL_OFFERING:
      return {
        ...state,
        offering: action.offering,
        status: action.status,
      };
    case CREATE_OFFERING:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_OFFERING:
        return {
          ...state,
          status: action.status,
        };
    case GET_OFFER:
      return {
        ...state,
        offering: action.detailoffer,
      };
    case OFFERING_ERROR:
      return {
        ...state,
        error: action.payload,
        status: "FAIL",
      };
    default:
      return state;
  }
};

export default offeringReducer;
