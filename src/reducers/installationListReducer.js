import { FETCH_INSTALLATION, ERROR_INSTALLATION } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_INSTALLATION:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_INSTALLATION:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
