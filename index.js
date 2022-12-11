const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

server({
    socket: {
      cors: {
        origin: "http://localhost",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
      },
      allowEIO3: true
    }
  }, [
  get('/', ctx => render('index.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage)
]);
