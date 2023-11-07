import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.WORDPRESS_OAUTH_ID,
      clientSecret: process.env.WORDPRESS_OAUTH_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          // Send a POST request to your WP GraphQL endpoint to authenticate the user
          const response = await axios.post('http://wp.beautyacademy.expert/graphql', {
            query: `
              mutation {
                login(username: "${credentials.username}", password: "${credentials.password}") {
                  refreshToken
                  authToken
                  user {
                    id
                    username
                  }
                }
              }
            `
          })
          console.log(response)

          if (response.data.errors) {
            throw new Error(response.data.errors[0].message)
          }
          
          // Extract JWT token from the response
          const token = response.data.data.login.jwt

          if (token) {
            // Return user data and token
            return Promise.resolve({ ...response.data.data.login.user, token })
          } else {
            throw new Error('Authentication failed')
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser, trigger}) {
    }
  }
})

export { handler as GET, handler as POST }

// {
//   token: {
//     name: 'Bohdan Shevchenko',
//     email: 'shevabogdan16@gmail.com',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ3QvpwQZKFgTWuu172hwFM2nc5b06InQL2QwLPqyoE=s96-c',
//     sub: '104103360018180074276'
//   },
//   user: {
//     id: '104103360018180074276',
//     name: 'Bohdan Shevchenko',
//     email: 'shevabogdan16@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocJ3QvpwQZKFgTWuu172hwFM2nc5b06InQL2QwLPqyoE=s96-c'
//   },
//   account: {
//     provider: 'google',
//     type: 'oauth',
//     providerAccountId: '104103360018180074276',
//     access_token: 'ya29.a0AfB_byARAJ10lJ6XOVfpFA1KQ1pSI2apHTW7fECEph7tl3PV-Tn1oc0Uhc0eNFz1ttH2pdx9mm-WhRLg8LS3cLSfNqmnlP5w0dH0fRi06TKU0S-DEVm-q_uB5it8SULvfqWptHoGOLrdWo9hHdh695Khe7j9XrlvVh-RaCgYKAbASARASFQGOcNnCN4kcSn9SGVOVS_WK0Rj3ow0171',
//     expires_at: 1699299960,
//     scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
//     token_type: 'Bearer',
//     id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4MzNlOGE3ZmUzZmU0Yjg3ODk0ODIxOWExNjg0YWZhMzczY2E4NmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjAxMjA5ODY5NTAtbGtsbmU0dm82am1wbjlhM3VvdjFzOHJiaDg4NjM4ZTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMjAxMjA5ODY5NTAtbGtsbmU0dm82am1wbjlhM3VvdjFzOHJiaDg4NjM4ZTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQxMDMzNjAwMTgxODAwNzQyNzYiLCJlbWFpbCI6InNoZXZhYm9nZGFuMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJuYUVZYldNVkNka3pvT0R3NXY2TVJRIiwibmFtZSI6IkJvaGRhbiBTaGV2Y2hlbmtvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0ozUXZwd1FaS0ZnVFd1dTE3Mmh3Rk0ybmM1YjA2SW5RTDJRd0xQcXlvRT1zOTYtYyIsImdpdmVuX25hbWUiOiJCb2hkYW4iLCJmYW1pbHlfbmFtZSI6IlNoZXZjaGVua28iLCJsb2NhbGUiOiJydSIsImlhdCI6MTY5OTI5NjM2MiwiZXhwIjoxNjk5Mjk5OTYyfQ.N0vAk1OVnXtUIutSc_D7TlEz9jtkqf9_ENWKQI59F4ixwkvdzjTVoq8x-Ec1Sl8Tg3-JtlyTVNAlEauqnhMoim_soxsFa8lCfqE25_P4UebRYc09pz1Ghgbw34w9R2UmwnNKBVv7kPNmeWlbdL165iqaFW_bF1qWcxsXClZgWmhHaQleArQvpBAHdgz53UDui27-ZL1GEMrRtKeI6vahhi-Mpki8_eR8VVu2aRC0FHj931HCLyLyfGHOGQ1mT09d439jHhCrujGogdQlCmpIbhGANrdzvejq5JeOiLdYiXCUOcZ8eLDywHoplxeEd6jf26FgbY6c9xULlgsW-ixjVw'
//   },
//   profile: {
//     iss: 'https://accounts.google.com',
//     azp: '320120986950-lklne4vo6jmpn9a3uov1s8rbh88638e8.apps.googleusercontent.com',
//     aud: '320120986950-lklne4vo6jmpn9a3uov1s8rbh88638e8.apps.googleusercontent.com',
//     sub: '104103360018180074276',
//     email: 'shevabogdan16@gmail.com',
//     email_verified: true,
//     at_hash: 'naEYbWMVCdkzoODw5v6MRQ',
//     name: 'Bohdan Shevchenko',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ3QvpwQZKFgTWuu172hwFM2nc5b06InQL2QwLPqyoE=s96-c',
//     given_name: 'Bohdan',
//     family_name: 'Shevchenko',
//     locale: 'ru',
//     iat: 1699296362,
//     exp: 1699299962
//   },
//   isNewUser: undefined,
//   trigger: 'signIn'
// }