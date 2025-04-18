import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Realty - 3rdShade',
  description: 'Discover premium real estate opportunities and services with 3rdShade Realty.',
  keywords: [
    'Realty',
    'Real Estate',
    '3rdShade',
    'Properties',
    'Pune',
    'Luxury Homes',
    'Apartments',
    'Buy',
    'Sell',
    'Rent',
    'Investment',
    'India',
  ],
  openGraph: {
    title: 'Realty - 3rdShade',
    description: 'Discover premium real estate opportunities and services with 3rdShade Realty.',
    url: 'https://3rdshade.com/services/realty',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RealtyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
