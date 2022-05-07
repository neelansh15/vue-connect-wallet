import { onMounted, onUnmounted } from "vue-demi";

declare global {
  interface Window {
    ethereum: any;
  }
}

const isMetaMask =
  typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

// Wallet Connection and Utility functions

/**
 * Returns account address array if wallet is connected otherwise opens MetaMask popup
 */
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

/**
 * Get all connected accounts addresses. Returns an empty array if none connected
 */
async function getAccounts() {
  if (isMetaMask) {
    try {
      const result: string[] = await window.ethereum.request({
        method: "eth_accounts",
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

/**
 * Opens a MetaMask popup to connect/disconnect from a list of user's accounts.
 * The popup opens even if the user has already connected some accounts.
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

// Event handlers
/**
 * Event handler for when the user changes the account in MetaMask  
 * 
 * Reference for callback function: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes accounts string array as an argument  
 * Example: (accounts: string[]) => { ...do something }
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
 * Reference for callback function: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes chainId number as an argument  
 * Example: (chainId: number) => { ...do something }
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
