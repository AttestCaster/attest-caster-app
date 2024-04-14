import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata, ResolvingMetadata } from 'next';
import HomePage from '../../../../home/HomePage';

const ATTESTATION_CASTER_URL = 'http://localhost:3000';
// 'https://test-frames-eosin.vercel.app/' // TODO: change to actual address

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'View on SignScan',
        action: 'link',
        target: `https://scan.sign.global/attestation/${params.id}`
      },
      {
        label: "Create Your Attestation",
        action: 'link',
        target: ATTESTATION_CASTER_URL,
      }
    ],
    image: {
      src: ATTESTATION_CASTER_URL + `/api/frame/${params.id}/image`,
      aspectRatio: "1:1",
    },
    postUrl: ATTESTATION_CASTER_URL,
  });
  frameMetadata["og:image"] = ATTESTATION_CASTER_URL + `/api/frame/${params.id}/og_image`; // TODO: replace with actual fallback page

  return {
    manifest: '/manifest.json',
    other: {
      ...frameMetadata
    },
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return <></>;
}