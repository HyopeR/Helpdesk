import {SELECT_CONTACT, DESELECT_CONTACT } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CONTACT:
      return action.payload

    case DESELECT_CONTACT:
      return {}

    default:
      return state;
  }
}
