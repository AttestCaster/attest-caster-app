import {
    FarcasterNetwork,
    getInsecureHubRpcClient,
    makeCastAdd,
    makeCastRemove,
    makeLinkAdd,
    makeLinkRemove,
    makeReactionAdd,
    makeUserDataAdd,
    Message,
    NobleEd25519Signer,
    ReactionType,
    UserDataType,
} from "@farcaster/hub-nodejs";
import 'dotenv/config'
import axios from 'axios';
import { hexToBytes } from "@noble/hashes/utils";

// Example: https://github.com/farcasterxyz/hub-monorepo/blob/main/packages/hub-nodejs/examples/write-data/index.ts

// Signer private key registered with the Hub (see hello-world example)
const SIGNER = process.env.SIGNER_PRIVATE_KEY;
// Fid owned by the custody address
const BOT_FID = process.env.BOT_FID; // <REQUIRED>

// Testnet Configuration
const HUB_URL = "testnet1.farcaster.xyz:2283"; // URL + Port of the Hub
const NETWORK = FarcasterNetwork.TESTNET; // Network of the Hub


// const hubAPI = process.env.HUB_ENDPOINT
const hubAPI = 'https://nemes.farcaster.xyz:2281'

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function getCast(fid, castHash) {
    try {
        const response = await axios.get(hubAPI + '/v1/castById?fid=' + parseInt(fid, 10) + '&hash=' + castHash.toString()); //Todo:: verify format
        if (response.status = 200) {
            return response.data
        } else {
            console.error('faild to get cast by id', fid, castHash, response)
            return {}
        }
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get Casts By Id')
    }
}

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function getCastsByMention(fid) {
    try {
        const response = await axios.get(hubAPI + '/v1/castsByMention?fid=' + parseInt(fid, 10));
        if (response.status = 200) {
            return response.data
        } else {
            console.error('faild to get cast by mention', fid, response)
            return {}
        }
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get Casts By Mention')
    }
}

export async function submitMessage(castAdd) {
    const client = getInsecureHubRpcClient(HUB_URL);

    const response = await client.submitMessage(castAdd)
    console.log('response', response);
    return response
}

// https://github.com/farcasterxyz/hub-monorepo/blob/main/packages/hub-nodejs/examples/write-data/index.ts
export async function makeCastAddWithMention(text, mentions, mentionsPositions) {

    const privateKeyBytes = hexToBytes(SIGNER.slice(2));
    const ed25519Signer = new NobleEd25519Signer(privateKeyBytes);
    const signerPublicKey = (await ed25519Signer.getSignerKey())._unsafeUnwrap();

    const dataOptions = {
        fid: BOT_FID,
        network: NETWORK,
    };

    const castWithMentions = await makeCastAdd(
        {
            text: text,
            embeds: [],
            embedsDeprecated: [],
            mentions: mentions,
            mentionsPositions: mentionsPositions,
        },
        dataOptions,
        ed25519Signer,
    );
    console.log(castWithMentions)
    return castWithMentions
}