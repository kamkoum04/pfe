// reducers.js
const initialState = {
    showRenew: false,
    renewLicenseId: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_RENEW':
        return {
          ...state,
          showRenew: true,
          renewLicenseId: action.payload,
        };
      case 'HIDE_RENEW':
        return {
          ...state,
          showRenew: false,
          renewLicenseId: null,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  