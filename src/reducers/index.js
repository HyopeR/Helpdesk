import { combineReducers } from 'redux';
// ANA TABLO REDUCERS
import CustomerListReducer from './customerListReducer';
import SelectedCustomerReducer from './selectedCustomerReducer';

import ConnectionListReducer from './connectionListReducer';
import SelectedConnectionReducer from './selectedConnectionReducer';

import ContactListReducer from './contactListReducer';
import SelectedContactReducer from './selectedContactReducer';

import InstallationListReducer from './installationListReducer';
import SelectedInstallationReducer from './selectedInstallationReducer';

// ARA TABLO REDUCERS
import ProductListReducer from './productListReducer';
import SelectedProductReducer from './selectedProductReducer';

import ContactTitleReducer from './contactTitleReducer';
import SelectedContactTitleReducer from './selectedContactTitleReducer';

import ConnectionTypeListReducer from './connectionTypeListReducer';
import SelectedConnectionTypeReducer from './selectedConnectionTypeReducer';

import InstallationStatusReducer from './installationStatusReducer';
import SelectedInstallationStatusReducer from './selectedInstallationStatusReducer';

import InstallationTypeReducer from './installationTypeReducer';
import SelectedInstallationTypeReducer from './selectedInstallationTypeReducer';


export default combineReducers({
  customerList: CustomerListReducer,
  selectedCustomer: SelectedCustomerReducer,

  connectionList: ConnectionListReducer,
  selectedConnection: SelectedConnectionReducer,

  connectionTypeList: ConnectionTypeListReducer,
  selectedConnectionType: SelectedConnectionTypeReducer,

  contactList: ContactListReducer,
  selectedContact: SelectedContactReducer,

  installationList: InstallationListReducer,
  selectedInstallation: SelectedInstallationReducer,

  productList: ProductListReducer,
  selectedProduct: SelectedProductReducer,

  contactTitleList: ContactTitleReducer,
  selectedContactTitle: SelectedContactTitleReducer,

  installationStatusList: InstallationStatusReducer,
  selectedInstallationStatus: SelectedInstallationStatusReducer,

  installationTypeList: InstallationTypeReducer,
  selectedInstallationType: SelectedInstallationTypeReducer,
});
