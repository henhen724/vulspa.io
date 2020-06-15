import { gql } from 'apollo-server-micro';

const typeDef = gql`

type DiscordUser {
    id: String
}

type SteamUser {
    id: String
}

type User {
    id: ID!
    hash: String!
    salt: String!
    name: String!
    discord: DiscordUser
    steam: SteamUser
}

enum Permissions {
    normal
    bot
    super
}

type AdminInfo {
    id: ID!,
    permission_level: Permissions!
}

input SignUpInput {
    name: String!
    password: String!
}

type SignUpPayload {
    user: User!
}

input SignInInput {
    name: String!
    password: String!
}

type SignInPayload {
    user: User
}

type DeleteUserPayload {
    user: User
}

input editAdminInput {
    id: ID!
    permissionString: String!
}

type editAdminPayload {
    admin: AdminInfo!
}

input deleteAdminInput {
    id: ID!
}

type deleteAdminPayload {
    admin: AdminInfo!
}

type Query {
    user(id:ID!): User!
    userByName(name:String!): [User]!
    users: [User]!
    viewer: User
    adminList: [AdminInfo]!
}

type Mutation {
    signUp(input: SignUpInput!): SignUpPayload
    signIn(input: SignInInput!): SignInPayload
    deleteUser(id: ID!): DeleteUserPayload
    editAdmin(input: editAdminInput!): editAdminPayload!
    deleteAdmin(input: deleteAdminInput!): deleteAdminPayload!
    runCommand(command: String!): String!
    signOut: Boolean!
}
`
export default typeDef;