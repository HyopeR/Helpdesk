import {SELECT_CONNECTION, DESELECT_CONNECTION } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CONNECTION:
      return action.payload

    case DESELECT_CONNECTION:
      return {}

    default:
      return state;
  }
}
