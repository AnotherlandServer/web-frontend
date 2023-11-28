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

'use server'

declare var process : {
    env: {
      ANOTHERLAND_API_URL: string,
    }
  }

export async function changePassword(token: String, password: String) {
    let user_result = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    });

    let user_data = await user_result.json();

    let account_result = await fetch(new URL(process.env.ANOTHERLAND_API_URL).href, {
        body: JSON.stringify({
            query: `mutation CreateAccount($name:String!, $password:String!){
                createAccount(name:$name, password:$password) {
                  id
                }
              }`,
            variables: {
                "name": user_data.username,
                "password": password,
            }
        }),
        method: "POST",
        cache: 'no-store'
    });

    let result = await account_result.json();

    console.log("Account creation result", result);

    if (result.errors && result.errors.length || !(result.data && result.data.createAccount && result.data.createAccount.id)) {
        throw new Error("Unable to create account!")
    }
}