export const FETCH_INSTALLATION_TYPE = 'fetch_installation_type';
export const SELECT_INSTALLATION_TYPE = 'select_installation_type';
export const DESELECT_INSTALLATION_TYPE = 'deselect_installation_type';
export const ERROR_INSTALLATION_TYPE = 'error_installation_type';

export const fetchInstallationType = () => {
  const url = 'http://192.168.1.105:8080/api/typeinstallations';
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_INSTALLATION_TYPE,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_INSTALLATION_TYPE,
          payload: responseJson
        })
      }
    } catch(error){
        console.error(error);
    }
  }
}

export const selectInstallationType = (installationType) => {
  return {
    type: SELECT_INSTALLATION_TYPE,
    payload: installationType
  }
}

export const deselectInstallationType = () => {
  return {
    type: DESELECT_INSTALLATION_TYPE,
    payload: {}
  }
}
