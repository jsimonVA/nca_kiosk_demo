'use client';

import Image from 'next/image';

export default function MapDisplay({ cemeteryCode }: { cemeteryCode: string }) {
  const mapPath = `/maps/${cemeteryCode}.jpg`; // Path for public folder maps

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold text-black mb-4">Cemetery Map</h2>
      <Image
        src={mapPath}
        alt={`Map for Cemetery ${cemeteryCode}`}
        width={600}
        height={400}
        className="rounded shadow-lg"
      />
    </div>
  );
}
