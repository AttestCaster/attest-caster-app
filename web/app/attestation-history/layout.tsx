import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Attestation History',
  description:
    'Display the history of user\'s attestation',
  images: 'themes.png',
  pathname: 'attestation-history',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
