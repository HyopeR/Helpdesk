import {SELECT_PRODUCT, DESELECT_PRODUCT } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.payload

    case DESELECT_PRODUCT:
      return {}

    default:
      return state;
  }
}
