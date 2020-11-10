const mongoose = require('mongoose');
const { mongodb } = require('./keys');

/* Conection to the Database */
mongoose.connect(mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err))