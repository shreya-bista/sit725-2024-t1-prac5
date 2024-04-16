const express = require("express");
const app = express();
require('./dbconnect');
const cardRoutes = require('./routers/router');

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/projects', cardRoutes);

app.get('/', (req, res) => {
    res.render('index.html');
});

const port = process.env.port || 3000;

app.listen(3000, () => {
    console.log('express server started ' + port);
}); 