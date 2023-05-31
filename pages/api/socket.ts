import { Server, type Server as IOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const Handler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  let usersList: { email: string; socketId: string }[] = [];

  if (!res.socket.server.io) {
    const server = res.socket.server;
    const io = new Server(server);

    io.on("connection", (socket) => {
      if (
        !usersList.some((user) => user.email === socket.handshake.auth.email)
      ) {
        usersList.push({
          email: socket.handshake.auth.email,
          socketId: socket.id,
        });
      }

      io.emit("get-users", usersList);

      socket.on("disconnect", () => {
        usersList = usersList.filter((user) => user.socketId !== socket.id);
        io.emit("get-users", usersList);
      });

      socket.on("offline", () => {
        usersList = usersList.filter((user) => user.socketId !== socket.id);
        io.emit("get-users", usersList);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default Handler;
