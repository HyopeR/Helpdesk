import { FETCH_CONNECTION_TYPE, ERROR_CONNECTION_TYPE } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_CONNECTION_TYPE:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_CONNECTION_TYPE:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
