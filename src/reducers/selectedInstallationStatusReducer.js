import {SELECT_INSTALLATION_STATUS, DESELECT_INSTALLATION_STATUS } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_INSTALLATION_STATUS:
      return action.payload

    case DESELECT_INSTALLATION_STATUS:
      return {}

    default:
      return state;
  }
}
