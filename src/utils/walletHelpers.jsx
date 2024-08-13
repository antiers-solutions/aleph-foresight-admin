export const setLoggedIn = (address) => {
  localStorage.setItem("isLogged", address);
};

export const isLoggedIn = () => localStorage.getItem("isLogged");

export const connectWalletHandler = async () => {
  try {
    const fromAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let address_from_metamask = fromAddress[0];
    return address_from_metamask;
  } catch (error) {
    console.error(error);
  }
};

export const waitForReceipt = async (transactionHash) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [transactionHash],
        });

        if (receipt) {
          clearInterval(interval);
          resolve(receipt);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 1000);
  });
};
