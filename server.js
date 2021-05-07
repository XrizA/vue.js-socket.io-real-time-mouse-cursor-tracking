const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

users = [];

io.on("connection", (socket) => {
  console.log("user connected");

  socket.emit("users", users);

  socket.on("send", (data) => {
    users.push(data);

    socket.emit("users", users);
    socket.broadcast.emit("users", users);
  });

  socket.on("move", (data) => {
    users.forEach((user) => {
      if (user.userId == data.userId) {
        user.position = data.position;
      }
    });

    socket.emit("users", users);
    socket.broadcast.emit("users", users);
  });

  socket.on("disconnect", (data) => {
    let findIndex = -1;
    for (let index = 0; index < users.length; index++) {
      const element = users[index].userId;
      if (element == data.userId) {
        findIndex = index;
        break;
      }
    }

    users.splice(findIndex, 1);
    socket.emit("users", users);
    socket.broadcast.emit("users", users);
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
