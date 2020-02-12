import { FETCH_CUSTOMER, ERROR_CUSTOMER } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_CUSTOMER:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_CUSTOMER:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
