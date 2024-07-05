"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Venue {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  price: number;
  lapangan: any[];
}

export default function VenuePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch("/api/venues");
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const data = await response.json();
        setVenues(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load venues. Please try again later.");
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto px-4 py-8 space-y-5">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-2">{venue.name}</h2>
            <p className="text-gray-600 mb-2 text-center">{venue.desc}</p>
            <p className="text-sm text-gray-500 mb-2">
              Tags: {venue.tags.join(", ")}
            </p>
            <p className="font-bold mb-2">Harga: Rp{venue.price}</p>
            <p className="mb-4">Jumlah Lapangan: {venue.lapangan.length}</p>
            <Link href={`/venue/${venue.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Lihat Lapangan
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
