"use client";
import React, { useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDeleteAccount = async () => {
    const { error } = await supabase.rpc('delete_user');
    if (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    } else {
      await supabase.auth.signOut();
      router.push("/login");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
      >
        Delete Account
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}