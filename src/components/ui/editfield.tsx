import React from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  error?: string;
}

export default function EditableField({ label, value, isEditing, onChange, error }: EditableFieldProps) {
  return (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {isEditing && onChange ? (
          <div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}