import {SELECT_CUSTOMER, DESELECT_CUSTOMER } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return action.payload

    case DESELECT_CUSTOMER:
      return {}

    default:
      return state;
  }
}
