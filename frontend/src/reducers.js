import { SET_WALLET_ADDRESS } from './actions.js';

const initialState = {
  walletAddress: localStorage.getItem("account"),
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
