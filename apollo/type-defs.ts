import { gql } from 'apollo-server-micro';

const typeDef = gql`

scalar Date

type DiscordUser {
    id: String
    token: String
    refresh_token: String
    expirationDate: Date
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

type adminListByUserPayload {
    admins: [AdminInfo]!
    users: [User]!
}

type Query {
    user(id:ID!): User!
    userByName(name:String!): [User]!
    users: [User]!
    viewer: User
    discordOAuthCode(code: String!): User
    adminList: [AdminInfo]!
    adminListByUser: adminListByUserPayload!
}

type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    deleteMyself: DeleteUserPayload!
    editAdmin(input: editAdminInput!): editAdminPayload!
    deleteAdmin(input: deleteAdminInput!): deleteAdminPayload!
    deleteUser(id: ID!): DeleteUserPayload!
    runCommand(command: String!): String!
}
`
export default typeDef;