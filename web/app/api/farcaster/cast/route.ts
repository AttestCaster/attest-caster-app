import { NextRequest, NextResponse } from 'next/server';
// import { getChainsForEnvironment } from '@/store/supportedChains';
import * as hub from './_utils/hub.js'

/**
 * Handler for the /api/chains/supported route, this route will return all the supported
 * chains for this application.
 * @param req
 * @param res
 */
export async function GET(req: NextRequest): Promise<Response> {
    try {
        const fid = req.nextUrl.searchParams.get('fid');
        const castHash = req.nextUrl.searchParams.get('cast_hash');
        if (!fid) {
            return NextResponse.json({ error: 'fid is required' }, { status: 400 });
        }
        if (!castHash) {
            return NextResponse.json({ error: 'cast_hash is required' }, { status: 400 });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const cast: string = await hub.getCast(fid, castHash);
        console.log('get cast', fid, castHash, cast.toString())
        // const chains = getChainsForEnvironment();
        return NextResponse.json({cast}, { status: 200 });
    } catch (error) {
        console.error('Error fetching chains:', error);
        return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    }
}

export const dynamic = 'force-dynamic';
