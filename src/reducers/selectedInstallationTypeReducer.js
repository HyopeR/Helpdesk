import {SELECT_INSTALLATION_TYPE, DESELECT_INSTALLATION_TYPE } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_INSTALLATION_TYPE:
      return action.payload

    case DESELECT_INSTALLATION_TYPE:
      return {}

    default:
      return state;
  }
}
