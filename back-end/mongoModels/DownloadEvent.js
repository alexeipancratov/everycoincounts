const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    socket: String,
    songId: String,
    downloadTime: Date
});

module.exports = mongoose.model('DownloadEvents', schema, 'DownloadEvents');