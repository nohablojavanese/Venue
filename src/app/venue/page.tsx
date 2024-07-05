import Link from 'next/link';
import { venueData } from '@/lib/venueData';

export default function VenuePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venueData.map((venue) => (
          <div key={venue.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{venue.name}</h2>
            <p className="text-gray-600 mb-2">{venue.desc}</p>
            <p className="text-sm text-gray-500 mb-2">Tags: {venue.tags.join(', ')}</p>
            <p className="font-bold mb-2">Price: ${venue.price}</p>
            <p className="mb-4">Number of Lapangan: {venue.lapangan.length}</p>
            <Link href={`/venue/${venue.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}