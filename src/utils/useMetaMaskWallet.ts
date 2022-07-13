import { onMounted, onUnmounted } from "vue-demi";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ChainConfig {
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
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
 * Returns an array.
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

/**
 * Add a token to MetaMask
 * @param symbol Symbol of the token, upto 5 characters
 * @param address Address of the token
 * @param imageURL String URL of the token image
 * @param decimals (Optional) 18 by default
 * @param type (Optional) ERC20 by default
 */
export const addTokenToWallet = async (
  symbol: string,
  address: string,
  imageURL: string,
  decimals = 18,
  type = "ERC20"
): Promise<void> => {
  await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type,
      options: {
        address, // The address that the token is at.
        symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals, // The number of decimals in the token
        image: imageURL, // A string url of the token logo
      },
    },
  });
};

/**
 * Switch to a chain or add the chain if user does not have it
 * @param chainId ChainID as an Integer
 * @param chainConfig (Optional) Chain Config Interface used for adding new chain
 */
export const switchOrAddChain = async (
  chainId: number,
  chainConfig?: ChainConfig
): Promise<void> => {
  const chainIdHex = "0x" + parseInt(chainId.toString(), 10).toString(16);
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902 && chainConfig) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainIdHex,
              chainConfig,
            },
          ],
        });
      } catch (addError) {
        throw new Error(
          "Couldn't add network, it's possible that user has rejected the change"
        );
      }
    } else {
      throw new Error("Couldn't switch networks. Error: " + switchError);
    }
  }
};

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
  isMetaMask,
  connect,
  getAccounts,
  switchAccounts,
  addTokenToWallet,
  switchOrAddChain,
  onAccountsChanged,
  onChainChanged,
});

export default useMetaMaskWallet;
