/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as fs from 'fs';
import { join } from 'path';
import { getFnameByFid } from 'app/api/farcaster/cast/_utils/fname';
import { getCast } from 'app/api/farcaster/cast/_utils/hub';
import {
  AttestationData,
  AttestationResponse,
  getAttestation,
} from 'app/api/sign-protocol/_utils/sign-protocol';
import { NextRequest, NextResponse } from 'next/server';
import satori from 'satori';
import sharp from 'sharp';

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf');
let fontData = fs.readFileSync(fontPath);

const urlMetadata = require('url-metadata');

async function getTitle(url: string) {
  try {
    const metadata = await urlMetadata(url);
    return metadata['title'] || metadata['og:title'];
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getNode(id: string, page: number) {
  const attestation: AttestationResponse = await getAttestation(id);
  const attestation_data: AttestationData = JSON.parse(attestation.data);

  const cast = (await getCast(attestation_data.castAuthorFID, attestation_data.castHash)).data
    .castAddBody.text;
  const author = (await getFnameByFid(attestation_data.castAuthorFID)).transfers[0].username;
  const attester = (await getFnameByFid(attestation_data.attesterFID)).transfers[0].username;

  switch (page) {
    case 0:
      return (
        <div
          style={{
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
          }}
        >
          This cast has been cast-checked as {String(attestation_data.isFactCheck)}
          <br />
          Context for readers: {attestation_data.context}
        </div>
      );
    case 1:
      const ref_diaplay_1 =
        (await getTitle(attestation_data.reference1)) || attestation_data.reference1;
      const ref_diaplay_2 =
        (await getTitle(attestation_data.reference2)) || attestation_data.reference2;
      return (
        <div
          style={{
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
          }}
        >
          References have been provided to support this Cast-Check:
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            <li>{ref_diaplay_1}</li>
            <li>{ref_diaplay_2}</li>
          </ul>
        </div>
      );
    case 2:
      const ref_diaplay_3 =
        (await getTitle(attestation_data.reference3)) || attestation_data.reference3;
      const ref_diaplay_4 =
        (await getTitle(attestation_data.reference4)) || attestation_data.reference4;
      return (
        <div
          style={{
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
          }}
        >
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            <li>{ref_diaplay_3}</li>
            <li>{ref_diaplay_4}</li>
          </ul>
        </div>
      );
    default:
      const team_names = '[List team names]'; // TODO
      return (
        <div
          style={{
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
          }}
        >
          This cast-check is an attestation issued on Sign Protocol using AttestCaster
          <br />
          AttestCaster is a Farcaster x Sign Protocol client built by {team_names}
          <br />
          Click Attestation Info for more details.
        </div>
      );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; page: string } },
): Promise<Response> {
  try {
    const id: string = params.id;
    const page: number = parseInt(params.page);

    const svg = await satori(await getNode(id, page), {
      width: 600,
      height: 600,
      fonts: [
        {
          data: fontData,
          name: 'Roboto',
          style: 'normal',
          weight: 400,
        },
      ],
    });
    // Convert SVG to PNG using Sharp
    const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

    // Set the content type to PNG and send the response
    return new Response(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'max-age=10',
      },
    });
  } catch (error) {
    console.error('Error generating frame pic:', error);
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }
}

export const dynamic = 'force-dynamic';
