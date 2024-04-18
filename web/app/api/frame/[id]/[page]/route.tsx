import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest } from 'next/server';
import { getFrame0, getFrame1, getFrame2, getFrame3 } from '../getFrame';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; page: number } },
): Promise<Response> {
  return await getFrame0(params.id);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; page: string } },
): Promise<Response> {
  const frameRequest: FrameRequest = await req.json();
  const id = params.id;
  const button = frameRequest.untrustedData.buttonIndex;

  switch (parseInt(params.page)) {
    case 0:
      console.log("case 0");
      if (button === 1) {
        return await getFrame1(id);
      } else {
        return await getFrame3(id);
      }
    case 1:
      console.log("case 1");
      if (button === 3) {
        return await getFrame2(id);
      } else {
        return await getFrame0(id);
      }
    default:
      console.log("case default");
      return await getFrame0(id);
  }
}

export const dynamic = 'force-dynamic';
