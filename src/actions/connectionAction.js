import { Actions } from 'react-native-router-flux';
export const FETCH_CONNECTION = 'fetch_connection';
export const SELECT_CONNECTION = 'select_connection';
export const DESELECT_CONNECTION = 'deselect_connection';
export const ERROR_CONNECTION = 'error_connection';

export const fetchConnection = (customerId) => {
  const url = customerId == null
  ? 'http://192.168.1.105:8080/api/connections'
  : 'http://192.168.1.105:8080/api/connection/customer/' + customerId;
  console.log(url);
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_CONNECTION,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_CONNECTION,
          payload: responseJson
        })
      }

    } catch(error){
        console.error(error);
    }
  }
}

export const selectConnection = (connection) => {
  return {
    type: SELECT_CONNECTION,
    payload: connection
  }
}

export const deselectConnection = () => {
  return {
    type: DESELECT_CONNECTION,
    payload: {}
  }
}
