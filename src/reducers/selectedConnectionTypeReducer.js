import {SELECT_CONNECTION_TYPE, DESELECT_CONNECTION_TYPE } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CONNECTION_TYPE:
      return action.payload

    case DESELECT_CONNECTION_TYPE:
      return {}

    default:
      return state;
  }
}
