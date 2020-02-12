import {SELECT_INSTALLATION, DESELECT_INSTALLATION } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_INSTALLATION:
      return action.payload

    case DESELECT_INSTALLATION:
      return {}

    default:
      return state;
  }
}
