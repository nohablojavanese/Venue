import { Venue, venueData } from '@/lib/venueData';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default function VenueDetailPage({ params }: PageProps) {
  const venue = venueData.find((v) => v.id === params.id);

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/venue" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        &larr; Back to Venues
      </Link>
      <h1 className="text-3xl font-bold mb-6">{venue.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">{venue.desc}</p>
        <p className="text-sm text-gray-500 mb-2">Tags: {venue.tags.join(', ')}</p>
        <p className="font-bold mb-4">Price: ${venue.price}</p>
        <h2 className="text-2xl font-semibold mb-4">Lapangan:</h2>
        <ul className="list-disc pl-5">
          {venue.lapangan.map((l) => (
            <li key={l.lapanganId} className="mb-2">
              <span className="font-semibold">{l.name}</span> - ${l.price}
              <br />
              <span className="text-sm text-gray-500">ID: {l.lapanganId}, Child ID: {l.childId}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return venueData.map((venue) => ({
    id: venue.id,
  }));
}