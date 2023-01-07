import SignClient from '@walletconnect/sign-client'
import { SignClientTypes, SessionTypes } from '@walletconnect/types'

class WalletConnect {

    private options: SignClientTypes.Options
    private signClient!: SignClient

    constructor(options: SignClientTypes.Options) {
        this.options = options
    }

    private async init(): Promise<SignClient> {
        if (this.signClient) return this.signClient

        const signClient = await SignClient.init(this.options)
        this.signClient = signClient

        return signClient
    }

    /**
     * Connect via WalletConnect Sign Client. Throws an error if unable to connect
     * @returns {string} uri
     */
    public async connect(chains: string[] = ["eip155:1"]): Promise<{
        uri: string
        approval: () => Promise<SessionTypes.Struct>
        provider: SignClient
    }> {
        const signClient = await this.init()

        const { uri, approval } = await signClient.connect({
            requiredNamespaces: {
                eip155: {
                    methods: [
                        "eth_sendTransaction",
                        "eth_signTransaction",
                        "eth_sign",
                        "personal_sign",
                        "eth_signTypedData",
                    ],
                    chains,
                    events: ["chainChanged", "accountsChanged"],
                },
            },
        })

        if (!uri) throw new Error("Unable to connect via WalletConnect")

        // Set up event listeners
        signClient.on("session_event", ({ params }) => {
            console.log("SESSION_EVENT", params)
        })

        signClient.on("session_update", ({ topic, params }) => {
            const { namespaces } = params;
            const _session = signClient.session.get(topic);
            // Overwrite the `namespaces` of the existing session with the incoming one.
            const updatedSession = { ..._session, namespaces };

            console.log("SESSION_UPDATE", updatedSession)
            // Integrate the updated session state into your dapp state.
            // onSessionUpdate(updatedSession);
        });

        signClient.on("session_delete", () => {
            // Session was deleted -> reset the dapp state, clean up from user session, etc.
            console.log("SESSION_DELETED")
        });

        signClient.on("session_request", () => {
            console.log("SESSION_REQUEST")
        })
        signClient.on("session_ping", () => {
            console.log("SESSION_PING")
        })
        signClient.on("session_proposal", () => {
            console.log("SESSION_PROPOSAL")
        })

        return { uri, approval, provider: signClient }
    }

    public onAccountsChanged(callback: (accounts: string[]) => void) {

    }

    public onChainChanged(callback: (chainId: number) => void) {

    }
}

export default WalletConnect
