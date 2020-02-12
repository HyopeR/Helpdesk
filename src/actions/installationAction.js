import { Actions } from 'react-native-router-flux';
export const FETCH_INSTALLATION = 'fetch_installation';
export const SELECT_INSTALLATION = 'select_installation';
export const DESELECT_INSTALLATION = 'deselect_installation';
export const ERROR_INSTALLATION = 'error_installation';

export const fetchInstallation = (customerId) => {
  const url = customerId == null
  ? 'http://192.168.1.105:8080/api/installations'
  : 'http://192.168.1.105:8080/api/installation/customer/' + customerId;
  console.log(url);
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_INSTALLATION,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_INSTALLATION,
          payload: responseJson
        })
      }

    } catch(error){
        console.error(error);
    }
  }
}

export const searchInstallation = (statusId) => {
  const url = statusId == parseInt(statusId)
  ? 'http://192.168.1.105:8080/api/installation/search/' + statusId
  : 'http://192.168.1.105:8080/api/installation/search/name/' + statusId;
  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: FETCH_INSTALLATION,
          payload: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export const selectInstallation = (installation) => {
  return {
    type: SELECT_INSTALLATION,
    payload: installation
  }
}

export const deselectInstallation = () => {
  return {
    type: DESELECT_INSTALLATION,
    payload: {}
  }
}
