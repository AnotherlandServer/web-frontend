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

    if (result.errors.length) {
        throw new Error("Unable to create account!")
    }
}