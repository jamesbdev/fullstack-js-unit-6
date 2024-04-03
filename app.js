const express = require('express');

const data = require("./data.json");
const app =  express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index', { data: data.projects });
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    res.render('project', { projectId })
})

//handle 404 request
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry this page doesn't exist.";
    console.log(err.status, err.message);
    res.status(404).send('<h1>404 - This page does not exist. Please check the URL</h1>');
});

//global error handler 
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    res.render("error");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})