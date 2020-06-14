import { ApolloServer } from 'apollo-server-micro';
import schema from '../../apollo/schema';
import mongoose from 'mongoose';

const apolloServer = new ApolloServer({
    schema: schema,
    context: async () => ({
        db: await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, }),
    }),
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })