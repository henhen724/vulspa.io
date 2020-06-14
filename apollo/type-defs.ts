import { gql } from 'apollo-server-micro';

const typeDef = gql`

type DiscordUser {
    id: String!
}

type SteamUser {
    id: String!
}

type User {
    id: ID!
    admin: Boolean! 
    name: String!
    discord: DiscordUser
    steam: SteamUser
}

input SignUpInput {
    name: String!
}

type SignUpPayload {
    user: User!
}

type SignInPayload {
    user: User
}

type DeleteUserPayload {
    user: User
}

type Query {
    user(id:ID!): User!
    userByName(name:String!): [User]!
    users: [User]!
    viewer: User
}

type Mutation {
    signUp(input: SignUpInput!): SignUpPayload
    signIn(name: String!): SignInPayload
    deleteUser(id: ID!): DeleteUserPayload
    runCommand(command: String!): String!
    signOut: Boolean!
}
`
export default typeDef;