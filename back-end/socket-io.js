const SocketEvent = require('./mongoModels/SocketEvent');
const DownloadEvent = require('./mongoModels/DownloadEvent');

module.exports = function setupSocketIo(io) {
  io.on('connection', (socket) => {
    console.log('SOCKET - Connection accepted.');
  
    const socketEvent = new SocketEvent({
      socket: socket.id,
      type: 'Connection',
      eventTime: new Date()
    });
    socketEvent.save();
  
    socket.on('download', (id) => {
      console.log(`Received client message to download music id: ${id}`);
  
      socket.emit('download-received', id);
  
      const downloadEvent = new DownloadEvent({
        socket: socket.id,
        songId: id,
        downloadTime: new Date()
      });
      downloadEvent.save();
    });
  
    socket.on('disconnect', () => {
      console.log('SOCKET - Disconnected.');
  
      const socketEvent = new SocketEvent({
        socket: socket.id,
        type: 'Disconnect',
        eventTime: new Date()
      });
      socketEvent.save();
    });
  });
}