import { onMounted, onUnmounted } from "vue";

declare global {
  interface Window {
    ethereum: any;
  }
}

const isMetaMask =
  typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

// Wallet Connection and Utility functions
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

// Event handlers
export const onAccountsChanged = (callback: Function) => {
  if (isMetaMask) {
    onMounted(() => {
      window.ethereum.on("accountsChanged", callback);
    });
    onUnmounted(() => {
      window.ethereum.removeListener("accountsChanged", callback);
    });
  }
};

export const onChainChanged = (callback: Function) => {
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
});

export default useMetaMaskWallet;
