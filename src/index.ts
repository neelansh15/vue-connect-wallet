import { App, install } from "vue-demi";
import ConnectWalletButton from "./components/ConnectWalletButton.vue";
import Jazzicon from "./components/Jazzicon.vue";

import useMetaMaskWallet from "./utils/useMetaMaskWallet";

install();

export default {
  install: (app: App) => {
    app.component("ConnectWalletButton", ConnectWalletButton);
  },
};

export { ConnectWalletButton, Jazzicon, useMetaMaskWallet };
