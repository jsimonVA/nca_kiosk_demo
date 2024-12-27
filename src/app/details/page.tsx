'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';

const Page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Unknown Veteran';
  const branch = searchParams.get('branch') || 'Unknown Branch';
  const location = searchParams.get('location') || 'Unknown Location';
  const lat = searchParams.get('lat') || '0';
  const long = searchParams.get('long') || '0';
  const cemeteryCode = searchParams.get('cemeteryCode') || '000';


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
            <h2 className="font-bold">Branch:</h2>
            <p>{branch}</p>
          </div>
          <div>
            <h2 className="font-bold">Location:</h2>
            <p>{location}</p>
          </div>
          <div>
            <h2 className="font-bold">Coordinates:</h2>
            <p>Latitude: {lat}</p>
            <p>Longitude: {long}</p>
          </div>
        </div>
      </div>
      {/* QR Code Section */}
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-lg font-bold text-black mb-2">Scan QR Code for Directions</h2>
        <QRCodeCanvas value={googleMapsUrl} size={150} className="shadow-lg" />
        <p className="text-gray-500 mt-2 text-sm">Scan with your phone to get directions</p>
      </div>

      {/* Map Section for Print */}
      <div id="printable-area" className="w-full flex flex-col items-center mt-6">
        {/* Centered Image */}
        <div className="relative w-full max-w-3xl">
          <Image
            src={mapPath}
            alt={`Map for Cemetery ${cemeteryCode}`}
            width={600}
            height={400}
            className="block mx-auto rounded shadow-lg"
            style={{
              display: 'block',
              margin: '0 auto', // Center horizontally
              padding: '0',
            }}
          />
          {/* Name and Location Aligned to Image Width */}
          <div
            className="details flex justify-between items-center bg-white text-black px-4 py-2 mx-auto"
            style={{
              marginTop: '-4px', // Slight overlap to remove any gap
              width: '600px', // Match the image width
              fontSize: '16px',
              fontWeight: 'bold',
              borderTop: '1px solid #ccc',
            }}
          >
            <span>{name}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600"
        >
          Return To Names
        </button>
        <button
          onClick={() => window.open(googleMapsUrl, '_blank')}
          className="bg-gray-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-600"
        >
          Open in Google Maps
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-green-600"
        >
          Print Map
        </button>
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
