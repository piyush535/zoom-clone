import express from 'express';
import { createServer } from 'node:http';

import { Server } from 'socket.io';

import mongoose from 'mongoose';
import connectToSocket from './src/controllers/socketManager.js';

import cors from 'cors';
import userRoutes from './src/routes/users.routes.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8001);
app.use(cors());
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: '40kb', extended: true }));

app.use('/api/v1/users', userRoutes);

app.get('/home', (req, res) => {
  return res.json({ 'Hello': 'World' });
});

const start = async () => {
    const connectionDb = await mongoose.connect("mongodb+srv://piyush_db_user:eopJwPrRYSjSRCwG@cluster0.hou1zv7.mongodb.net/?appName=Cluster0")
    server.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
    });
}

start();