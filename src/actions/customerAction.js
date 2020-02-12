import { Actions } from 'react-native-router-flux';
export const FETCH_CUSTOMER = 'fetch_customer';
export const SELECT_CUSTOMER = 'select_customer';
export const DESELECT_CUSTOMER = 'deselect_customer';
export const ERROR_CUSTOMER = 'error_customer';

export const fetchCustomer = (customerName) => {
  const url = customerName === 'nullString'
  ? 'http://192.168.1.105:8080/api/customers'
  : 'http://192.168.1.105:8080/api/customer/search/' + customerName;
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_CUSTOMER,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_CUSTOMER,
          payload: responseJson
        })
      }

    } catch(error){
        console.error(error);
    }
  }
}

export const selectCustomer = (customer) => {
  return {
    type: SELECT_CUSTOMER,
    payload: customer
  }
}

export const deselectCustomer = () => {
  return {
    type: DESELECT_CUSTOMER,
    payload: {}
  }
}
