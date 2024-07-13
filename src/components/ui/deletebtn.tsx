"use client";
import React, { useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface DeleteAccountButtonProps {
  customClass?: string;
}

export default function DeleteAccountButton({ customClass }: DeleteAccountButtonProps) {
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
        className={`${customClass} bg-red-500 hover:bg-red-600 focus:ring-red-500`}
      >
        Hapus Akun
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Anda Yakin!?</h2>
            <p className="mb-4">Seluruh data anda akan dihapus dan tidak dapat dikembalikan!</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Batalkan
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}