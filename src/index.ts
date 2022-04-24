import { App } from "vue";
import ConnectWalletButton from "./components/ConnectWalletButton.vue";

import useMetaMaskWallet from "./utils/useMetaMaskWallet";
import useWallet from "./utils/useWallet";

export default {
  install: (app: App, options: any) => {
    app.component("ConnectWalletButton", ConnectWalletButton);
  },
};

export { ConnectWalletButton, useMetaMaskWallet, useWallet };
