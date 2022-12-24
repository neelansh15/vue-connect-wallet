import { AuthClient, AuthClientTypes, generateNonce, IAuthClient } from '@walletconnect/auth-client'

class WalletConnect {

    public address: string = ""
    private options: AuthClientTypes.Options
    private authClient!: IAuthClient

    constructor(options: AuthClientTypes.Options) {
        this.options = options
    }

    private async init(callback?: (address: string) => void) {
        if (this.authClient) return this.authClient

        const authClient = await AuthClient.init(this.options)
        this.authClient = authClient

        authClient.on("auth_response", ({ params }) => {
            if ("code" in params) {
                console.error(params);
                return;
            }
            if ("error" in params) {
                console.error(params.error);
                return;
            }

            this.address = params.result.p.iss.split(":")[4]
            callback?.(this.address)
        });

        return authClient
    }

    public async connect(chainId = "eip155:1", callback?: (address: string) => void) {
        const authClient = await this.init(callback)

        const { uri } = await authClient.request({
            aud: window.location.href,
            domain: window.location.hostname.split(".").slice(-2).join("."),
            chainId,
            type: 'eip4361',
            nonce: generateNonce(),
        })

        console.log("URI for authentication", uri)
    }
}

export default WalletConnect
