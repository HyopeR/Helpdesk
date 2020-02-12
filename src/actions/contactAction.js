import { Actions } from 'react-native-router-flux';
export const FETCH_CONTACT = 'fetch_contact';
export const SELECT_CONTACT = 'select_contact';
export const DESELECT_CONTACT = 'deselect_contact';
export const ERROR_CONTACT = 'error_contact';

export const fetchContact = (customerId) => {
  const url = customerId == null
  ? 'http://192.168.1.105:8080/api/contacts'
  : 'http://192.168.1.105:8080/api/contact/customer/' + customerId;
  console.log(url);
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_CONTACT,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_CONTACT,
          payload: responseJson
        })
      }
    } catch(error){
        console.error(error);
    }
  }
}

export const selectContact = (contact) => {
  return {
    type: SELECT_CONTACT,
    payload: contact
  }
}

export const deselectContact = () => {
  return {
    type: DESELECT_CONTACT,
    payload: {}
  }
}
