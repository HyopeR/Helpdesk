import { Actions } from 'react-native-router-flux';
export const FETCH_PRODUCT = 'fetch_product';
export const SELECT_PRODUCT = 'select_product';
export const DESELECT_PRODUCT = 'deselect_product';
export const ERROR_PRODUCT = 'error_product';

export const fetchProduct = (customerId) => {
  const url = customerId == null
  ? 'http://192.168.1.105:8080/api/products'
  : 'http://192.168.1.105:8080/api/product/customer/' + customerId;
  console.log(url);
  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.length < 1){
        dispatch({
          type: ERROR_PRODUCT,
          payload: "Data not found."
        })
      }else{
        dispatch({
          type: FETCH_PRODUCT,
          payload: responseJson
        })
      }
    } catch(error){
        console.error(error);
    }
  }
}

export const selectProduct = (product) => {
  return {
    type: SELECT_PRODUCT,
    payload: product
  }
}

export const deselectProduct = () => {
  return {
    type: DESELECT_PRODUCT,
    payload: {}
  }
}
