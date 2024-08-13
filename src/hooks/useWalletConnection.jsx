import { useState } from "react";
import { BrowserProvider } from "ethers";
import { setLoggedIn } from "../utils/walletHelpers";
import UseGetApi from "./useGetApi";
import { decimalValue, messages } from "../constant/constants";
import { useNavigate } from "react-router-dom";
import { env } from "../constant/envConstant";
import { customToast } from "../Common/Toast/toast";
import { apiUrls } from "../constant/apiConstants";
import { useIsLoggedIn } from "../context/loggedInContext";
import { Path } from "../Common/Routing/Constant/RoutePaths";

const useWalletConnection = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { setLoggedInValue } = useIsLoggedIn();
  const [isLoading, setIsLoading] = useState(false);

  const getProvider = async (webProvider, address) => {
    try {
      const providers = new BrowserProvider(webProvider);
      const payload = await openSignModal(providers, address);
      return payload;
    } catch (error) {
      return error;
    }
  };

  const addNetwork = async () => {
    try {
      const provider = window.ethereum;
      if (!provider) return customToast.error(messages.Install_Wallet);
      const address = window.ethereum.selectedAddress;
      const chainId = await provider.request({ method: "eth_chainId" });
      const ChainId = env.chainId;

      if (!chainId) {
        return customToast.info(messages.Retrive_Meta_Account);
      }
      switch (chainId) {
        case ChainId:
          await getProvider(provider, address); // Use provider directly
          break;
        default:
          try {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: ChainId }],
            });
            await getProvider(provider, address);
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await provider.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: ChainId,
                      chainName: env.chainName,
                      rpcUrls: [env.metamaskRpcUrl],
                      blockExplorerUrls: [env.explorerNavigationUrl],
                      nativeCurrency: {
                        name: env.currencyName,
                        symbol: env.currencyName,
                        decimals: decimalValue,
                      },
                    },
                  ],
                });
                await getProvider(provider, address);
              } catch ({ message }) {
                customToast.error(`${messages.Network_Add_Error}, ${message}`);
              }
            }
          }
          break;
      }
    } catch ({ message }) {
      customToast.error(message);
    }
  };

  const openSignModal = async (provider, address) => {
    try {
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(
        address ? address : signer?.address
      );
      setIsDisabled(true);
      return await verifySignMessage(
        signature,
        address ? address : signer?.address
      );
    } catch ({ message }) {
      return message;
    }
  };

  const verifySignMessage = async (signature, address) => {
    try {
      setIsLoading(true);
      const { data } = await UseGetApi(apiUrls.connectWallet, "post", {
        wallet_address: address,
        signature_key: signature,
      });
      if (address && data?.data?.walletAddress?.length) {
        setLoggedIn(address);
        setLoggedInValue(address);
        navigate(Path?.DASHBOARD);
        return data;
      }
    } catch (error) {
      return customToast.error("Wrong Wallet Address");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return {
    isDisabled,
    isLoading,
    addNetwork,
  };
};

export default useWalletConnection;
