export const FETCH_INSTALLATION_STATUS = 'fetch_installation_status';
export const SELECT_INSTALLATION_STATUS = 'select_installation_status';
export const DESELECT_INSTALLATION_STATUS = 'deselect_installation_status';
export const ERROR_INSTALLATION_STATUS = 'error_installation_status';

export const fetchInstallationStatus = () => {
  const url = 'http://192.168.1.105:8080/api/status/installations';
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_INSTALLATION_STATUS,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_INSTALLATION_STATUS,
          payload: responseJson
        })
      }
    } catch(error){
        console.error(error);
    }
  }
}

export const selectInstallationStatus = (installationStatus) => {
  return {
    type: SELECT_INSTALLATION_STATUS,
    payload: installationStatus
  }
}

export const deselectInstallationStatus = () => {
  return {
    type: DESELECT_INSTALLATION_STATUS,
    payload: {}
  }
}
