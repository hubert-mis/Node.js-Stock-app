const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    lastUpdate: Date
})

module.exports = mongoose.model('schedule', scheduleSchema);