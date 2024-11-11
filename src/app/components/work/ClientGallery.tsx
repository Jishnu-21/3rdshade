'use client'

import dynamic from 'next/dynamic';
import LoadingState from '../LoadingState';

const ImageGallery = dynamic(() => import('./ImageGallery'), {
  loading: () => <LoadingState />,
  ssr: false
});

export default function ClientGallery() {
  return <ImageGallery />;
} 