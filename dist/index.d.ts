import { App } from "vue-demi";
import ConnectWalletButton from "./components/ConnectWalletButton.vue";
import Jazzicon from "./components/Jazzicon.vue";
import useMetaMaskWallet from "./utils/useMetaMaskWallet";
declare const _default: {
    install: (app: App) => void;
};
export default _default;
export { ConnectWalletButton, Jazzicon, useMetaMaskWallet };
