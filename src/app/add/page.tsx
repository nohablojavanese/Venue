"use client";
import React, { useState } from "react";
import { VenueId, Lapangan } from "@/lib";
export default function CreateVenuePage() {
  const [venue, setVenue] = useState<VenueId>({
    name: "",
    desc: "",
    tags: [],
    price: 0,
    lapangan: [],
  });
  const [newTag, setNewTag] = useState("");
  const [newLapangan, setNewLapangan] = useState<Lapangan>({
    lapanganId: "",
    childId: "",
    name: "",
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVenue({ ...venue, [name]: value });
  };

  const handleTagAdd = () => {
    if (newTag) {
      setVenue({ ...venue, tags: [...venue.tags, newTag] });
      setNewTag("");
    }
  };

  const handleLapanganChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLapangan({
      ...newLapangan,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleLapanganAdd = () => {
    if (newLapangan.name && newLapangan.lapanganId) {
      setVenue({ ...venue, lapangan: [...venue.lapangan, newLapangan] });
      setNewLapangan({ lapanganId: "", childId: "", name: "", price: 0 });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venue),
      });
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Venue</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={venue.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={venue.desc}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={venue.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {venue.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Lapangan</h3>
          {venue.lapangan.map((l, index) => (
            <div key={index} className="mb-2 p-2 border rounded">
              <p>
                <strong>Name:</strong> {l.name}
              </p>
              <p>
                <strong>ID:</strong> {l.lapanganId}
              </p>
              <p>
                <strong>Child ID:</strong> {l.childId}
              </p>
              <p>
                <strong>Price:</strong> {l.price}
              </p>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="lapanganId"
              value={newLapangan.lapanganId}
              onChange={handleLapanganChange}
              placeholder="Lapangan ID"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="childId"
              value={newLapangan.childId}
              onChange={handleLapanganChange}
              placeholder="Child ID"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="name"
              value={newLapangan.name}
              onChange={handleLapanganChange}
              placeholder="Lapangan Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="number"
              name="price"
              value={newLapangan.price}
              onChange={handleLapanganChange}
              placeholder="Price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={handleLapanganAdd}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Lapangan
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Venue
          </button>
        </div>
      </form>
    </div>
  );
}
