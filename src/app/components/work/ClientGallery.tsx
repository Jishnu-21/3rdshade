'use client'

import dynamic from 'next/dynamic';
import { useWindowSize } from '@/hooks/useWindowSize';
import LoadingState from '../LoadingState';

const DesktopGallery = dynamic(() => import('./ImageGallery'), {
  loading: () => <LoadingState />,
  ssr: false
});

const MobileGallery = dynamic(() => import('./MobileGallery'), {
  loading: () => <LoadingState />,
  ssr: false
});

export default function ClientGallery() {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= 768;

  if (!windowSize.width) {
    return <LoadingState />;
  }

  return (
    <>
      {isMobile ? (
        <MobileGallery />
      ) : (
        <DesktopGallery />
      )}
    </>
  );
} 