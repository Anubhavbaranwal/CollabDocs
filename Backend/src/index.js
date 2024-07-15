import dotenv from "dotenv";
import connectDB from "./config/DbConnect.js";
import { app } from "./app.js";
import {Server} from "socket.io";

dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

connectDB()
  .then(() => {
    // app.on("error", (error) => {
    //   console.log("ERRR: ", error);
    //   throw error;
    // });

    server.listen(process.env.PORT||5643, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
      });
    //   io.on("connection", (socket) => {
    //     const accessToken = socket.handshake.query.accessToken ;
    //     const documentId = socket.handshake.query.documentId;
      
    //     if (!accessToken || !documentId) return socket.disconnect();
    //     else {
    //       jwt.verify(
    //         accessToken,
    //         "access_token",
    //         (err, decoded) => {
    //           const { id, email } = decoded;
    //           (socket ).username = email;
      
    //           documentService
    //             .findDocumentById(parseInt(documentId), parseInt(id))
    //             .then(async (document) => {
    //               if (document === null) return socket.disconnect();
      
    //               socket.join(documentId);
      
    //               io.in(documentId)
    //                 .fetchSockets()
    //                 .then((clients) => {
    //                   io.sockets.in(documentId).emit(
    //                     SocketEvent.CURRENT_USERS_UPDATE,
    //                     clients.map((client) => (client ).username)
    //                   );
    //                 });
      
    //               socket.on(SocketEvent.SEND_CHANGES, (rawDraftContentState) => {
    //                 socket.broadcast
    //                   .to(documentId)
    //                   .emit(SocketEvent.RECEIVE_CHANGES, rawDraftContentState);
    //               });
      
    //               socket.on("disconnect", async () => {
    //                 socket.leave(documentId);
    //                 socket.disconnect();
    //                 io.in(documentId)
    //                   .fetchSockets()
    //                   .then((clients) => {
    //                     io.sockets.in(documentId).emit(
    //                       SocketEvent.CURRENT_USERS_UPDATE,
    //                       clients.map((client) => (client).username)
    //                     );
    //                   });
    //               });
    //             })
    //         })
    //     }
        
    //     })
    })
  .catch((err) => {
    console.log("MongoDb Connection failed ", err);
  });