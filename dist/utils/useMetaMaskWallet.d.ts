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
/**
 * Returns account address array if wallet is connected otherwise opens MetaMask popup.
 * On error, returns a single string with the error message
 */
declare function connect(): Promise<string | string[]>;
/**
 * Get all connected accounts addresses. Returns an empty array if none connected
 * On error, returns a single string with the error message
 */
declare function getAccounts(): Promise<string | string[]>;
/**
 * Opens a MetaMask popup to connect/disconnect from a list of user's accounts.
 * Returns an array.
 * The popup opens even if the user has already connected some accounts.
 * On error, returns a single string with the error message
 */
declare function switchAccounts(): Promise<string | string[]>;
/**
 * Add a token to MetaMask
 * @param symbol Symbol of the token, upto 5 characters
 * @param address Address of the token
 * @param imageURL String URL of the token image
 * @param decimals (Optional) 18 by default
 * @param type (Optional) ERC20 by default
 */
export declare const addTokenToWallet: (symbol: string, address: string, imageURL: string, decimals?: number, type?: string) => Promise<void>;
/**
 * Switch to a chain or add the chain if user does not have it
 * @param chainId ChainID as an Integer
 * @param chainConfig (Optional) Chain Config Interface used for adding new chain
 */
export declare const switchOrAddChain: (chainId: number, chainConfig?: ChainConfig | undefined) => Promise<void>;
/**
 * Event handler for when the user changes the account in MetaMask
 *
 * Reference for event handlers: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes accounts string array as an argument
 */
export declare const onAccountsChanged: (callback: (accounts: string[]) => void) => void;
/**
 * Event handler for when the user changes the active chain in MetaMask
 *
 * Reference for event handlers: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes chainId number as an argument
 */
export declare const onChainChanged: (callback: (chainId: number) => void) => void;
export declare const useMetaMaskWallet: () => {
    isMetaMask: boolean;
    connect: typeof connect;
    getAccounts: typeof getAccounts;
    switchAccounts: typeof switchAccounts;
    addTokenToWallet: (symbol: string, address: string, imageURL: string, decimals?: number, type?: string) => Promise<void>;
    switchOrAddChain: (chainId: number, chainConfig?: ChainConfig | undefined) => Promise<void>;
    onAccountsChanged: (callback: (accounts: string[]) => void) => void;
    onChainChanged: (callback: (chainId: number) => void) => void;
};
export default useMetaMaskWallet;
