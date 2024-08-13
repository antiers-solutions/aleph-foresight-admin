import Web3 from "web3";
import * as contractAbi from "./contractAbi.ts";
import { connectWalletHandler, waitForReceipt } from "./walletHelpers.jsx";
import { env } from "../constant/envConstant.jsx";
import { adminEventNames } from "../constant/constants.jsx";
import { customToast } from "../Common/Toast/toast.jsx";

const contractAddress = env?.contractAddress;

const getWeb3 = () => {
  try {
    const httpProvider = new Web3.providers.HttpProvider(env.metamaskRpcUrl);
    const web3 = new Web3(httpProvider);
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    return { web3, contract };
  } catch (err) {
    return err;
  }
};

const baseEventStructure = async ({ eventName, data = {} }) => {
  try {
    const { web3, contract } = await getWeb3();
    const { ipfs, fees, expiryTime, eventId, price } = data;
    const address = await connectWalletHandler();
    const gasPrice = await web3?.eth?.getGasPrice();
    const nonce = await web3?.eth?.getTransactionCount(address);
    let txObject = null;

    switch (eventName) {
      case adminEventNames.registerEvent:
        txObject = await contract?.methods[eventName](ipfs, expiryTime); // create Event
        break;
      case adminEventNames.readPoolAmount:
        txObject = await contract?.methods[eventName](ipfs).call();
        break;
      case adminEventNames.setEventFees:
        txObject = await contract?.methods[eventName](+fees); // set Event creation fees
        break;
      case adminEventNames.setPlatformFee:
        txObject = await contract?.methods[eventName](+fees); // set Platform fees
        break;
      case adminEventNames.getPlatformFee:
        txObject = await contract?.methods[eventName]().call(); // get Platform fees
        break;
      case adminEventNames.getEventFee:
        txObject = await contract?.methods[eventName]().call(); // get Platform fees
        break;
      case adminEventNames.getTotalRewards:
        txObject = await contract?.methods[eventName]().call(); // get rewards earned
        break;
      case adminEventNames.editEvent:
        txObject = await contract?.methods[eventName](
          eventId,
          expiryTime,
          price
        ); // edit Event
        break;
      default:
        txObject = null;
        break;
    }
    if (
      [
        adminEventNames.getPlatformFee,
        adminEventNames.readPoolAmount,
        adminEventNames.getTotalRewards,
        adminEventNames.getEventFee,
      ].includes(eventName)
    ) {
      return txObject;
    }
    const gasEstimate = await txObject?.estimateGas({ from: address });

    const txdata = {
      from: address,
      to: contractAddress,
      gas: web3?.utils?.toHex(gasEstimate),
      gasPrice: web3?.utils?.toHex(gasPrice),
      nonce: web3?.utils?.toHex(nonce),
      data: txObject?.encodeABI(),
      value: data?.amount
        ? parseInt(web3?.utils?.toWei(data?.amount, "ether")).toString(16)
        : undefined,
    };

    const res = await window?.ethereum?.request({
      method: "eth_sendTransaction",
      params: [txdata],
    });

    await waitForReceipt(res);
    return res;
  } catch ({ message }) {
    customToast.error(message);
  }
};

export const contractEvents = ({
  eventName,
  expiryTime,
  fees,
  ipfs,
  eventId,
  price,
}) => {
  try {
    switch (eventName) {
      case adminEventNames.registerEvent: // create Event
        return baseEventStructure({
          eventName: adminEventNames.registerEvent,
          data: { expiryTime, ipfs },
        });
      case adminEventNames.setEventFees: // set Event creation fees
        return baseEventStructure({
          eventName: adminEventNames.setEventFees,
          data: { fees },
        });
      case adminEventNames.setPlatformFee: // set Platform fees
        return baseEventStructure({
          eventName: adminEventNames.setPlatformFee,
          data: { fees },
        });
      case adminEventNames.getPlatformFee: // get Platform fees
        return baseEventStructure({
          eventName: adminEventNames.getPlatformFee,
          data: {},
        });
      case adminEventNames.getEventFee: // get Platform fees
        return baseEventStructure({
          eventName: adminEventNames.getEventFee,
          data: {},
        });
      case adminEventNames.readPoolAmount:
        return baseEventStructure({
          eventName: adminEventNames.readPoolAmount,
          data: {},
        });
      case adminEventNames.getTotalRewards: // get Platform fees
        return baseEventStructure({
          eventName: adminEventNames.getTotalRewards,
          data: {},
        });
      case adminEventNames.editEvent:
        return baseEventStructure({
          eventName: adminEventNames.editEvent,
          data: { eventId, expiryTime, price },
        });

      default:
        break;
    }
  } catch ({ message }) {
    customToast.error({ message });
  }
};
