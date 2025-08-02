'use client'

import { useState } from 'react';
import Image from 'next/image';

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const [zoomed, setZoomed] = useState(false);

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setZoomed(true);
    }
  };

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="cursor-zoom-in rounded"
        onClick={handleClick}
      />

      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setZoomed(false)}
        >
          <img
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            className="w-[90vw] h-[90vh] object-contain cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
}
