"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageProps, Venue } from "@/lib/type";

export default function VenueDetailPage({ params }: PageProps) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(`/api/venues/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue");
        }
        const data = await response.json();
        setVenue(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load venue. Please try again later.");
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!venue) return <div>Venue not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/venue"
        className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; Kembali ke Halaman Awal
      </Link>
      <h1 className="text-3xl font-bold mb-6">{venue.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">{venue.desc}</p>
        <p className="text-sm text-gray-500 mb-2">
          Tags: {venue.tags.join(", ")}
        </p>
        <p className="font-bold mb-4">Harga rata-rata: Rp {venue.price}</p>
        <h2 className="text-2xl font-semibold mb-4">Lapangan:</h2>
        <ul className="list-disc pl-5">
          {venue.lapangan.map((l) => (
            <li key={l.lapanganId} className="mb-2">
              <span className="font-semibold">{l.name}</span> - Rp {l.price}
              <br />
              <span className="text-sm text-gray-500">
                ID: {l.lapanganId}, Child ID: {l.childId}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
