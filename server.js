const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, move) => {
    var now = new Date().toString();
    var log = `${now}  ${req.url}  ${req.method}`;
    
    fs.appendFileSync("server.log", log + '\n', (err) => {
        console.log(err);
    });
    move();
    
});

app.use((req, res, next) => {
    res.render("miantainance.hbs");
    
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "welcome to my first Node web application",
        // currentYear: new Date().getFullYear()
    });
});
  
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Us",
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send("<h1>400 Page</h1>");
});

app.listen(3000, () => {
    console.log("server is up on port 3000");
});

