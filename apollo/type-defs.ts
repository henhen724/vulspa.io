import { gql } from 'apollo-server-micro';

const typeDef = gql`

scalar Date

type DiscordUser {
    id: String
    token: String
    refresh_token: String
    expirationDate: Date
}

type BungieUser {
    id: String
}

type User {
    discordId: ID!
    name: String!
    discord: DiscordUser
    bungie: BungieUser
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

type SignUpPayload {
    user: User!
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
    discordOAuthCode(code: String!, state: String!): User
    bungieOAuthCode(code: String!, state: String!): User
    adminList: [AdminInfo]!
    adminListByUser: adminListByUserPayload!
}

type Mutation {
    signOut: Boolean!
    deleteMyself: DeleteUserPayload!
    editAdmin(input: editAdminInput!): editAdminPayload!
    deleteAdmin(input: deleteAdminInput!): deleteAdminPayload!
    deleteUser(id: ID!): DeleteUserPayload!
    runCommand(command: String!): String!
}
`
export default typeDef;