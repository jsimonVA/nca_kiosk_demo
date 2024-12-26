import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase();

  // Updated mock database with cemeteryCode
  const mockDatabase = [
    {
      name: "ALBERT SIMON",
      branch: "US Army",
      location: "SECTION 23B, ROW 0, SITE 470",
      lat: 35.80312601,
      long: -95.23262131,
      cemeteryCode: "844",
    },
    {
      name: "GORDON EDWIN GADETTE",
      branch: "US Army",
      location: "SECTION 6, SITE 580",
      lat: 42.34025649,
      long: -85.32079852,
      cemeteryCode: "909",
    },
    {
      name: "ALBERT CLEO SANDERS",
      branch: "US Army",
      location: "SECTION 2, ROW 0, SITE 703",
      lat: 34.76393054,
      long: -98.34928496,
      cemeteryCode: "920",
    },
  ];

  // Filter results based on query
  const results = mockDatabase.filter((entry) =>
    entry.name.toLowerCase().includes(query || '')
  );

  return NextResponse.json(results);
}
