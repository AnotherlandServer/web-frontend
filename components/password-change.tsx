// Copyright (C) 2023 Anotherland-Web-Frontend
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use client'

import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { changePassword } from '../app/actions';

export default function PasswordChange({token}:{token: String}) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError("The new passwords do not match.");
            return;
        }

        setError('');

        try {
            await changePassword(token, newPassword);
            router.replace("/?success=true");
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <div className="flex flex-col">
        <label htmlFor="newPassword" className="mb-2 text-sm font-medium text-[#FAD02E]">New Password:</label>
        <input
        className="px-3 py-2 border border-[#a62a82] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa26a0]"
        type="password"
        id="newPassword"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        />
    </div>
    <div className="flex flex-col">
        <label htmlFor="confirmNewPassword" className="mb-2 text-sm font-medium text-[#FAD02E]">Confirm Password:</label>
        <input
        className="px-3 py-2 border border-[#a62a82] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa26a0]"
        type="password"
        id="confirmNewPassword"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
    </div>

    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

    <button type="submit" className="px-4 py-2 mt-4 text-[#540d45] bg-[#FAD02E] rounded-md hover:bg-[#fac52e] focus:outline-none focus:ring-2 focus:ring-[#fa26a0] focus:ring-offset-2">
        Change Password
    </button>
    </form>);
}