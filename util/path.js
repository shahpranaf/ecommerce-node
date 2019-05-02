const path = require('path');

/* Returns the path of dir where main file is located i.e app.js */
module.exports = path.dirname(process.mainModule.filename);