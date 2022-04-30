import { App } from "vue";
import ConnectWalletButton from "./components/ConnectWalletButton.vue";
import Jazzicon from "./components/Jazzicon.vue";

import useMetaMaskWallet from "./utils/useMetaMaskWallet";

export default {
  install: (app: App, options: any) => {
    app.component("ConnectWalletButton", ConnectWalletButton);
  },
};

/*
Next:
Dark mode option
*/

export { ConnectWalletButton, Jazzicon, useMetaMaskWallet };
