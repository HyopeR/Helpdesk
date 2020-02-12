import { FETCH_CONNECTION, ERROR_CONNECTION } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: 'null',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_CONNECTION:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_CONNECTION:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
