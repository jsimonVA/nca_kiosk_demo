"use client"

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat') || '0';
  const long = searchParams.get('long') || '0';
  const cemeteryCode = searchParams.get('cemeteryCode') || '000';
  const name = searchParams.get('name') || 'Unknown';

  const mapPath = `/maps/${cemeteryCode}.jpg`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=walking`;

  const handlePrint = () => {
    const originalContent = document.body.innerHTML;
    const printableElement = document.getElementById('printable-area');

    if (printableElement) {
      document.body.innerHTML = printableElement.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Veteran and Location Information</h1>

      {/* Veteran Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-bold">Name:</h2>
            <p>{name}</p>
          </div>
          <div>
            <h2 className="font-bold">Latitude:</h2>
            <p>{lat}</p>
          </div>
          <div>
            <h2 className="font-bold">Longitude:</h2>
            <p>{long}</p>
          </div>
          <div>
            <h2 className="font-bold">Cemetery Code:</h2>
            <p>{cemeteryCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default PageWrapper;