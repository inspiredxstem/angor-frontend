const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const axios = require("axios");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  console.log(socket.id);
  axios
    .get(`https://b68h5k-6000.preview.csb.app/api/join/${socket.id}`)
    .then((data) => {});

  socket.on("isConnected", async function (id, ackFn) {
    const sockets = (await io.fetchSockets()).map((socket) => socket.id);
    ackFn(sockets.includes(id));
  });

  socket.on("total", async function (id, ackFn) {
    const sockets = (await io.fetchSockets()).map((socket) => socket.id);
    ackFn(sockets);
  });

  socket.on("disconnect", () => {
    axios
      .get(`https://b68h5k-6000.preview.csb.app/api/leave/${socket.id}`)
      .then((data) => {});
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Let's go`);
});
