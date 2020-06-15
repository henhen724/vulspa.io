import { ApolloServer } from 'apollo-server-micro';
import schema from '../../apollo-server/schema';
import mongoose from 'mongoose';

let conectedToMongoDB = false;

const apolloServer = new ApolloServer({
    schema: schema,
    context: async ctx => {
        if (!conectedToMongoDB) {
            console.log("Connecting to mongoDB.");
            ctx.db = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, });
            console.log("Connected");
            conectedToMongoDB = true;
        }
        return ctx;
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })