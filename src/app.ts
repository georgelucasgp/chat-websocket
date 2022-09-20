import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';
dotenv.config();

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

app.use(routes);
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

export { serverHttp, io };
