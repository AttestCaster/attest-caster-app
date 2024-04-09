import { NextRequest, NextResponse } from 'next/server';
// import { getChainsForEnvironment } from '@/store/supportedChains';
// import * as hub from './_utils/hub.js'
import * as signProtocol from '../_utils/sign-protocol.js'

/**
 * Handler for the /api/sign-protocol/ar route
 * @param req
 * @param res
 */
// export async function GET(req: NextRequest): Promise<Response> {
//     try {
//         const fid = req.nextUrl.searchParams.get('fid');
//         // const castHash = req.nextUrl.searchParams.get('cast_hash');
//         if (!fid) {
//             return NextResponse.json({ error: 'fid is required' }, { status: 400 });
//         }
//         // if (!castHash) {
//         //     return NextResponse.json({ error: 'cast_hash is required' }, { status: 400 });
//         // }
//         // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
//         // const cast: string = await hub.getCast(fid, castHash);
//         // console.log('get cast', fid, castHash, cast.toString())
//         // // const chains = getChainsForEnvironment();
//         return NextResponse.json({ }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching chains:', error);
//         return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
//     }
// }

/**
 * Handler for the /api/sign-protocol/ar route, create an attestation based on a cast
 * @param req
 * @param res
 */
export async function POST(req: NextRequest): Promise<Response> {
    try {
        const castHash = req.nextUrl.searchParams.get('cast_hash');
        const authorFID = req.nextUrl.searchParams.get('author_fid');
        const attesterFID = req.nextUrl.searchParams.get('attester_fid');

        const attesterComment = req.nextUrl.searchParams.get('attester_comment');

        if (!castHash) {
            return NextResponse.json({ error: 'cast_hash is required' }, { status: 400 });
        }
        if (!authorFID) {
            return NextResponse.json({ error: 'author_fid is required' }, { status: 400 });
        }
        if (!attesterFID) {
            return NextResponse.json({ error: 'attester_fid is required' }, { status: 400 });
        }
        if (!attesterComment) {
            return NextResponse.json({ error: 'attester_comment is required' }, { status: 400 });
        }
        const signature = 'test signature' //Todo:: handle signature
        // Todo:: verify signature and fid
        // Todo:: use a message queue to handle this
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            const attestation = await signProtocol.createAttestationForCast(castHash, authorFID, attesterFID, attesterComment, signature);
            console.log('attestation offchin:', attestation)
            // Todo:: send notifications to bot if success
            return NextResponse.json({ attestation }, { status: 200 });
        } catch(e) {
            console.error('[Attest POST Error]', e);
            return NextResponse.json({ error: 'failed to create attestation'}, { status: 500, statusText: 'Internal Server Error' });
        }
        // console.log('get cast', fid, castHash, cast.toString())
        // const chains = getChainsForEnvironment();
    } catch (error) {
        console.error('Error fetching chains:', error);
        return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    }
}

export const dynamic = 'force-dynamic';
