export const env = {
  apiUrl: process.env.REACT_APP_ADMIN_PANEL_API_URL,
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
  walletSocketUrl: process.env.REACT_APP_WALLET_EVENT_SOCKET_URL,
  ipfsUrl: process.env.REACT_APP_IPFS_BACKEND,
  adminCurrencyName: process.env.REACT_APP_ADMIN_CURRENCY_NAME,
  userPanelNavigation: process.env.REACT_APP_USER_PANEl,
  editInterval: process.env.REACT_APP_EDIT_INTERVAL,
  editTime: process.env.REACT_APP_EDIT_TIME,
  //Metamask
  chainId: process.env.REACT_APP_CHAINID,
  currencyName: process.env.REACT_APP_CURRENCY_NAME,
  chainName:
    process.env.REACT_APP_CHAIN_NAME + " " + process.env.REACT_APP_NETWORK_NAME,
  explorerNavigationUrl: process.env.REACT_APP_METAMASK_EXPLORER_NAVIGATE,
  metamaskRpcUrl: process.env.REACT_APP_METAMASK_NETWROK_RPC_URL,
};
