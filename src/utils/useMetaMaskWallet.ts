import { useEventListener } from "./event";

declare global {
  interface Window {
    ethereum: any;
  }
}

const isMetaMask =
  typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

async function connect() {
  if (isMetaMask) {
    try {
      const result: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return result;
    } catch (e) {
      return {
        error: "Unable to execute request: " + e,
      };
    }
  } else {
    return {
      error: "MetaMask not detected",
    };
  }
}

async function getAccounts() {
  if (isMetaMask) {
    try {
      const result: string[] = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log("result of getAccounts", result);
      return result;
    } catch (e) {
      return {
        error: "Unable to execute request: " + e,
      };
    }
  } else {
    return {
      error: "MetaMask not detected",
    };
  }
}

async function switchAccounts() {
  if (isMetaMask) {
    try {
      const result: string[] = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      console.log("result of switchAccounts", result);
      return result;
    } catch (e) {
      return {
        error: "Unable to execute request: " + e,
      };
    }
  } else {
    return {
      error: "MetaMask not detected",
    };
  }
}

export const useMetaMaskWallet = () => ({
  connect,
  getAccounts,
  switchAccounts,
});
