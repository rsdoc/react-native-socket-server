import { createServer } from 'http';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import socketIo from 'socket.io';

const app = express();

const server = createServer(app);

const io = socketIo(server);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/hello', (_req, res) => res.status(200).json({message: "welcome"}));

io.on('connection', (socket) => {
    console.log('new connection added');
    socket.on('start-timer', () => {
        timer();
    });

    function timer() {
        let start = new Date().getTime();
        let elapsedTime = '0.0';

        setInterval(() => {
            let time = new Date().getTime() - start;

            elapsedTime = Math.floor(time / 100) / 10;

            if(Math.round(elapsedTime) === elapsedTime) { elapsedTime += '.0';
                socket.emit('sync-time', { elapsedTime})
            }

        }, 100);
    }
    //
    // setInterval(() => {
    //     socket.emit("intrval", {data: "hello"})
    // }, 3000);

});

// function timer() {
//     let start = new Date().getTime();
//     let elapsedTime = '0.0';
//
//     setInterval(() => {
//         let time = new Date().getTime() - start;
//
//         elapsedTime = Math.floor(time / 100) / 10;
//
//         if(Math.round(elapsedTime) === elapsedTime) { elapsedTime += '.0'; }
//
//     }, 100);
// }

server.listen(4000, () => console.log(`Running successfully at port 4000`));
