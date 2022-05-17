declare global {
    interface Window {
        ethereum: any;
    }
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
    connect: typeof connect;
    getAccounts: typeof getAccounts;
    switchAccounts: typeof switchAccounts;
    onAccountsChanged: (callback: (accounts: string[]) => void) => void;
    onChainChanged: (callback: (chainId: number) => void) => void;
    isMetaMask: boolean;
};
export default useMetaMaskWallet;
