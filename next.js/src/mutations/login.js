export const LOGIN = `
  mutation LOGIN( $input: LoginInput! ) {
    login(input: $input) {
      authToken
      sessionToken
    }
  }
`
