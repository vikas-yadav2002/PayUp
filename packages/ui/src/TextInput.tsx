"use client";

import React from 'react';

export const TextInput = ({
    placeholder,
    onChange,
    label,
    className = "" // default value as an empty string
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    className?: string; // make className optional
}) => {
    return (
        <div className={`pt-2 ${className}`}>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input 
                onChange={(e) => onChange(e.target.value)} 
                type="text" 
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`} 
                placeholder={placeholder} 
            />
        </div>
    );
}
