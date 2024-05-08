import { SET_WALLET_ADDRESS, SET_ACCOUNT_TYPE } from './actions.js';

const initialState = {
  walletAddress: localStorage.getItem("account"),
  accountType: localStorage.getItem("accountType"),
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload,
      };
    case SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
