import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import schema from './modules/index';
import mongoose from 'mongoose';
import {resolve} from 'path';

//mongo_db
mongoose.connect('mongodb+srv://sabinauktamova12052002:WGh2bcdshyymb8rp@cluster0.erjj6zk.mongodb.net/')
    .then((d) => console.log('db connection'))
    .catch((e) => console.log('db error ', e));

interface MyContext {
    token?: string;
  }

const app = express();
const httpServer = http.createServer(app);

app.get("/users", (req: Request, res: Response) => {
    res.send('users')
})

app.get('/uploads/restaurants/:file', (req, res) => {
    const { file } = req.params;
    res.sendFile(resolve('uploads/restaurants', file));
});
app.get('/uploads/foods/:file', (req, res) => {
    const { file } = req.params;
    res.sendFile(resolve('uploads/foods', file));
});

// WGh2bcdshyymb8rp
!async function () {

    const server = new ApolloServer<MyContext>({
        schema,
        csrfPrevention: false,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ headers: req.headers }),
        }),
    );
    
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}()