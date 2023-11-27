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

import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect, useSearchParams } from 'next/navigation';
import { getIronSession, sealData, unsealData } from 'iron-session';

const PasswordChange = dynamic(
  () => import('../components/password-change'),
  { ssr: false } // This will make sure the component is only rendered on the client side
);

interface IronSessionData {
  access_token: String,
  token_type: String,
  expires_in: Number,
  refresh_token: String,
  scope: String,
};

declare var process : {
  env: {
    DISCORD_CLIENT_ID: string,
    DISCORD_CLIENT_SECRET: string,
    SEAL_PASSWORD: string,
    REDIRECT_URL: string,
    ANOTHERLAND_API_URL: string,
  }
}

export default async function Home({searchParams}: {searchParams: {code: string|undefined, token: string|undefined, success: boolean|undefined}}) {
  if (!searchParams.code && !searchParams.token) {
      
  }

  if (searchParams.code) {
    console.log(searchParams.code);

    let response = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: searchParams.code,
        redirect_uri: process.env.REDIRECT_URL,
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET
      }),
      headers: {
        contentType: "application/x-www-form-urlencoded"
      },
      cache: 'no-store'
    });
  
    let token = await response.json();
    if (token.token_type == "Bearer") {
      let seal = await sealData(token, { password: process.env.SEAL_PASSWORD, ttl: token.expires_in});

      redirect(`/?token=${seal}`);
    } else {
      return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="fixed left-0 top-0 flex w-full drop-shadow-[0_50px_50px_#00000070]" id="anotherland-logo">
          </div>
          <div className="flex flex-col items-center p-10 bg-[#540d45] border border-[#a62a82] rounded-xl shadow-xl shadow-[#7c1b6a]">
          <div className="text-red-500 text-sm mt-2">Something went wrong: {token.error_description}</div>
          </div>
        </main>
      )
    }
  } else if (searchParams.token) {
    let token = (await unsealData(searchParams.token, { password: process.env.SEAL_PASSWORD})) as IronSessionData;

    let result = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        authorization: `Bearer ${token.access_token}`
      },
      cache: 'no-store'
    });

    let user_data = await result.json();

    return (
      <div>
        <p className="pt-5 text-sm font-medium text-[#FAD02E]">Welcome {user_data.global_name}!</p>
        <p className="pt-5 pb-5 text-sm font-medium text-[#FAD02E]">Choose a password for your anotherland account. <br/>DO NOT reuse an existing password. Please!</p>
        
        <div className="flex flex-col pb-4">
          <label htmlFor="username" className="mb-2 text-sm font-medium text-[#FAD02E]">Username:</label>
          <input
          className="px-3 py-2 border border-[#a62a82] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fa26a0]"
          type="input"
          id="username"
          name="username"
          value={user_data.username}
          readOnly
          />
        </div>

        <PasswordChange token={token.access_token}/>
      </div>
    );
  } else if (searchParams.success) {
    return (
      <p className='p-5 text-sm font-medium text-[#FAD02E]'>Success! You can close this tab now.</p>
    );
  } else {
    redirect(`https://discord.com/oauth2/authorize?response_type=code&client_id=1178435541423894598&scope=identify&redirect_uri=http%3A%2F%2Flocalhost:3000&prompt=consent`);
  }
}
