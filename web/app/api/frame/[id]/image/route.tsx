/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as fs from "fs";
import { join } from 'path';
import { getFnameByFid } from 'app/api/farcaster/cast/_utils/fname';
import { getCast } from 'app/api/farcaster/cast/_utils/hub';
import { getAttestation } from 'app/api/sign-protocol/_utils/sign-protocol';
import { NextRequest, NextResponse } from 'next/server';
import satori from "satori";
import sharp from 'sharp';

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')
let fontData = fs.readFileSync(fontPath)


type Data = {
    castHash: string,
    authorFID: number,
    attesterFID: number,
    attesterComment: string,
    signature: string,
}

export type AttestationResponse = {
    attestTimestamp: string,
    attestationId: string,
    attester: string,
    chainId: string,
    data: string,
    id: string
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
    try {
        const id: string = params.id;
        console.log(id);
        // TODO: replace the example attestation data with function call to getAttestation
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const attestation: AttestationResponse = await getAttestation(id);
        // console.log('attestation', attestation)
        const data: Data = JSON.parse(attestation.data)
        // console.log('data', data)
        const attestation_data = {
            castHash: data.castHash,
            authorFID: data.authorFID,
            attesterFID: data.attesterFID,
            attesterComment: data.attesterComment,
            signature: data.signature,
        };
        const cast = (await getCast(attestation_data.authorFID, attestation_data.castHash)).data.castAddBody.text;
        const author = (await getFnameByFid(attestation_data.authorFID)).transfers[0].username;
        const attester = (await getFnameByFid(attestation_data.attesterFID)).transfers[0].username;

        console.log(attestation_data);
        console.log(cast);
        console.log(author, attester);
        const svg = await satori(
            <div style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                // backgroundColor: 'f4f4f4',
                padding: 50,
                lineHeight: 1.2,
                fontSize: 24,
                textAlign: 'left',
            }
            }>
                {/* <p style={{}}> */}
                Cast: {cast}
                <br />
                Cast Hash: {attestation_data.castHash}
                <br />
                Author: {author}
                <br />
                Comment: {attestation_data.attesterComment}
                <br />
                Attester: {attester}
                <br />
                Signature: {attestation_data.signature}
                <br />
                Attestation ID: {id}
                {/* </p> */}
            </div>
            ,
            {
                width: 600, height: 600, fonts: [{
                    data: fontData,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400
                }]
            })
        // Convert SVG to PNG using Sharp
        const pngBuffer = await sharp(Buffer.from(svg))
            .toFormat('png')
            .toBuffer();

        // Set the content type to PNG and send the response
        return new Response(pngBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'max-age=10'
            }
        })
    } catch (error) {
        console.error('Error generating frame pic:', error);
        return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    }
}

export const dynamic = 'force-dynamic';