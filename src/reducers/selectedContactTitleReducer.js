import {SELECT_CONTACT_TITLE, DESELECT_CONTACT_TITLE } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CONTACT_TITLE:
      return action.payload

    case DESELECT_CONTACT_TITLE:
      return {}

    default:
      return state;
  }
}
