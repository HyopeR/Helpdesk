import { FETCH_CONTACT, ERROR_CONTACT } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_CONTACT:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_CONTACT:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
