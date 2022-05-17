import { onMounted, onUnmounted } from "vue-demi";

declare global {
  interface Window {
    ethereum: any;
  }
}

// Wallet Connection and Utility functions

const isMetaMask: boolean =
  typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

/**
 * Returns account address array if wallet is connected otherwise opens MetaMask popup.
 * On error, returns a single string with the error message
 */
async function connect() {
  if (isMetaMask) {
    try {
      const result: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return result;
    } catch (e: any) {
      return "Error: Unable to execute request: " + e.message;
    }
  } else {
    return "Error: MetaMask not detected";
  }
}

/**
 * Get all connected accounts addresses. Returns an empty array if none connected
 * On error, returns a single string with the error message
 */
async function getAccounts() {
  if (isMetaMask) {
    try {
      const result: string[] = await window.ethereum.request({
        method: "eth_accounts",
      });
      return result;
    } catch (e: any) {
      return "Error: Unable to execute request: " + e.message;
    }
  } else {
    return "Error: MetaMask not detected";
  }
}

/**
 * Opens a MetaMask popup to connect/disconnect from a list of user's accounts.
 * The popup opens even if the user has already connected some accounts.
 * On error, returns a single string with the error message
 */
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
      return result;
    } catch (e: any) {
      return "Error: Unable to execute request: " + e.message;
    }
  } else {
    return "Error: MetaMask not detected";
  }
}

// Event handlers
/**
 * Event handler for when the user changes the account in MetaMask
 *
 * Reference for event handlers: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes accounts string array as an argument
 */
export const onAccountsChanged = (callback: (accounts: string[]) => void) => {
  if (isMetaMask) {
    onMounted(() => {
      window.ethereum.on("accountsChanged", callback);
    });
    onUnmounted(() => {
      window.ethereum.removeListener("accountsChanged", callback);
    });
  }
};

/**
 * Event handler for when the user changes the active chain in MetaMask
 *
 * Reference for event handlers: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes chainId number as an argument
 */
export const onChainChanged = (callback: (chainId: number) => void) => {
  if (isMetaMask) {
    onMounted(() => {
      window.ethereum.on("chainChanged", callback);
    });
    onUnmounted(() => {
      window.ethereum.removeListener("chainChanged", callback);
    });
  }
};

export const useMetaMaskWallet = () => ({
  connect,
  getAccounts,
  switchAccounts,
  onAccountsChanged,
  onChainChanged,
  isMetaMask,
});

export default useMetaMaskWallet;
