import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './types.schema.js';
import { resolvers } from './rating.resolver.js';

const startServer = async () => {
    const app = express();
    
     try {
            const connect = await mongoose.connect("mongodb+srv://admin:admin@rateburgbr.avb7m.mongodb.net/?retryWrites=true&w=majority&appName=rateBurgBR")
            console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`)
        } catch (err) {
            console.log(err)
            process.exit(1)
        }


    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true, 
        introspection: true
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            origin: '*',
            methods: ['GET', 'POST', "DELETE", "PATCH"]
        }
    });

    app.use(express.json());

    app.listen(4000, () => {
        console.log('GraphQL running at http://localhost:4000/graphql');
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error);
});