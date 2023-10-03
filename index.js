const express = require('express')//membuat variable baru dengan nama express 
const app = express()//membuat variable baru dengan nama app yang isisnya variable express
const port = 3000 // membuat variable dengan nama port yang isinya 3000 

const bodyPS = require('body-parser');
app.use(bodyPS.urlencoded({ extended: false}));
app.use(bodyPS.json());

const gameRouter = require('./routes/game'); //routes tabel game
app.use('/api/game', gameRouter);

const developerRouter = require('./routes/developer'); //routes tabel developer
app.use('/api/developer', developerRouter);

const publisherRouter = require('./routes/publisher'); //routes tabel publisher
app.use('/api/publisher', publisherRouter);

const platformRouter = require('./routes/platform'); //routes tabel platform
app.use('/api/platform', platformRouter);

const ratingRouter = require('./routes/rating'); //routes tabel rating
app.use('/api/rating', ratingRouter);

const adminRouter = require('./routes/admin'); //routes tabel admin
app.use('/api/admin', adminRouter);

const daftar_gameRouter = require('./routes/daftar_game'); //routes tabel daftar_game
app.use('/api/daftar_game', daftar_gameRouter);

//kita listen Express.js ke dalam port yang  kita buat diatas
app.listen(port, () => {
    //dan kita tampilkan log sebagai penanda bahwa Express.js berhasil dijalankan
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})