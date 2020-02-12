export const FETCH_CONNECTION_TYPE = 'fetch_connection_type';
export const SELECT_CONNECTION_TYPE = 'select_connection_type';
export const DESELECT_CONNECTION_TYPE = 'deselect_connection_type';
export const ERROR_CONNECTION_TYPE = 'error_connection_type';

export const fetchConnectionType = () => {
  const url = 'http://192.168.1.105:8080/api/typeconnections';
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_CONNECTION_TYPE,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_CONNECTION_TYPE,
          payload: responseJson
        })
      }
    } catch(error){
        console.error(error);
    }
  }
}

export const selectConnectionType = (connectionType) => {
  return {
    type: SELECT_CONNECTION_TYPE,
    payload: connectionType
  }
}

export const deselectConnectionType = () => {
  return {
    type: DESELECT_CONNECTION_TYPE,
    payload: {}
  }
}
