"use client";

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { z } from 'zod';
import Select from 'react-select';
import EditableField from './editfield';
import SignOutButton from './signoutbtn';
import DeleteAccountButton from './deletebtn';
import Link from 'next/link';
import { updateUserProfile } from '@/app/private/action';

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  location: z.string().optional(),
});

type UserData = z.infer<typeof userSchema>;

const indonesianLocations = [
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'surabaya', label: 'Surabaya' },
  { value: 'bandung', label: 'Bandung' },
  { value: 'medan', label: 'Medan' },
  { value: 'semarang', label: 'Semarang' },
  // Add more locations as needed
];

const buttonBaseStyle = "px-4 py-2 text-white rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: user.user_metadata.name || '',
    phone: user.user_metadata.phone || '',
    location: user.user_metadata.location || '',
  });
  const [errors, setErrors] = useState<Partial<UserData>>({});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const validatedData = userSchema.parse(userData);
      await updateUserProfile(validatedData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Partial<UserData>);
      } else {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and account information.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <EditableField
            label="Name"
            value={userData.name}
            isEditing={isEditing}
            onChange={(value) => handleChange('name', value)}
            error={errors.name}
          />
          <EditableField
            label="Email"
            value={user.email || ''}
            isEditing={false}
          />
          <EditableField
            label="Phone"
            value={userData.phone}
            isEditing={isEditing}
            onChange={(value) => handleChange('phone', value)}
            error={errors.phone}
          />
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <Select
                  options={indonesianLocations}
                  value={indonesianLocations.find(loc => loc.value === userData.location)}
                  onChange={(selectedOption) => handleChange('location', selectedOption?.value || '')}
                  placeholder="Select location"
                />
              ) : (
                userData.location || 'Not set'
              )}
            </dd>
          </div>
          <EditableField
            label="User ID"
            value={user.id}
            isEditing={false}
          />
        </dl>
      </div>
      <div className="flex justify-center items-center px-4 py-5 sm:px-6">
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className={`${buttonBaseStyle} bg-green-500 hover:bg-green-600 focus:ring-green-500`}
            >
              Save Data
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className={`${buttonBaseStyle} bg-blue-500 hover:bg-blue-600 focus:ring-blue-500`}
            >
              Edit Data
            </button>
          )}
          <SignOutButton customClass={buttonBaseStyle} />
          <Link href="/chat">
            <button className={`${buttonBaseStyle} bg-gray-500 hover:bg-gray-600 focus:ring-gray-500`}>
              Test Room
            </button>
          </Link>
          <DeleteAccountButton customClass={buttonBaseStyle} />
        </div>
      </div>
    </div>
  );
}