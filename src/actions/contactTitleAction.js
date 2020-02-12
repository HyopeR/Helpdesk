export const FETCH_CONTACT_TITLE = 'fetch_contact_title';
export const SELECT_CONTACT_TITLE = 'select_contact_title';
export const DESELECT_CONTACT_TITLE = 'deselect_contact_title';
export const ERROR_CONTACT_TITLE = 'error_contact_title';

export const fetchContactTitle = () => {
  const url = 'http://192.168.1.105:8080/api/titles';
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_CONTACT_TITLE,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_CONTACT_TITLE,
          payload: responseJson
        })
      }
    } catch(error){
        console.error(error);
    }
  }
}

export const selectContactTitle = (contactTitle) => {
  return {
    type: SELECT_CONTACT_TITLE,
    payload: contactTitle
  }
}

export const deselectContactTitle = () => {
  return {
    type: DESELECT_CONTACT_TITLE,
    payload: {}
  }
}
