import {
    SignProtocolClient,
    SpMode,
    EvmChains,
    OffChainSignType,
    OffChainRpc,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.SIGN_BOT_PRIVATE_KEY; //Todo:: handle next's .env
// Schema need to be created first
export async function createAttestationForCast(castHash, authorFID, attesterFID, attesterComment, signature) {
    const client = new SignProtocolClient(SpMode.OffChain, {
        signType: OffChainSignType.EvmEip712,
        rpcUrl: OffChainRpc.testnet,
        account: privateKeyToAccount(privateKey), // optional
    });
    const res = await client.createAttestation({
        schemaId: 'SPS_0Xy9437cyqV8uhip_AU10', // 
        data: { castHash, authorFID, attesterFID, attesterComment, signature },
        indexingValue: "xxx", //Todo:: handle this
    });
    console.log('[createAttestationForCast]', castHash, authorFID, attesterComment, signature)
    return res;
}