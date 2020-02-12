import { FETCH_PRODUCT, ERROR_PRODUCT } from "../actions";

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_PRODUCT:
      return { ...state, loading: true, dataset: action.payload}

    case ERROR_PRODUCT:
      return { ...state, loading: false, error: action.payload}

    default:
      return state;
  }
}
