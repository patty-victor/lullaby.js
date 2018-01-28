//Requires
const path = require('path')
const express = require('express')
const ejs = require('ejs')

const app = express();
const port = 8080;

//Changing default views path
app.set('views', path.join(__dirname, '/dev/views/layouts'));
app.use('/scripts', express.static(__dirname + '/src'));

//EJS engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//Routes
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/gauge', function (req, res) {
    res.render('gauge');
});

//Start server
app.listen(port, function (err) {
    if (err) {
        return console.log("Error: ", err);
    }

    console.log("Server is listening on " + port);
})

