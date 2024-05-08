export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS';
export const SET_ACCOUNT_TYPE = 'SET_ACCOUNT_TYPE';

export const setWalletAddress = (address) => ({
  type: SET_WALLET_ADDRESS,
  payload: address,
});

export const setAccountType = (account) => ({
  type: SET_ACCOUNT_TYPE,
  payload: account,
})
