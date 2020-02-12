import { FETCH_INSTALLATION_STATUS, ERROR_INSTALLATION_STATUS } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_INSTALLATION_STATUS:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_INSTALLATION_STATUS:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
