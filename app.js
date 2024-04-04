const express = require('express');
const data = require("./data.json");
const app =  express();
const port = 3000;

app.set('view engine', 'pug');
//set static files directory to public

app.use("/static", express.static('public'));

app.get("/", (req, res) => {
    //render index template
    //pass the projects data
    res.render('index', { data: data.projects });
});

app.get("/about", (req, res) => {
    //render about template
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    //store project id
    const projectId = req.params.id;
    //render project view and pass the individual project data
    res.render('project', { project: data.projects[projectId - 1] })
})

//handle 404 request
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry this page doesn't exist.";
    console.log(err.status, err.message);
    //render 404 template
    //pass in error info
    res.status(404).send('<h1>404 - This page does not exist. Please check the URL</h1>');
});

//global error handler 
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    //render 500 template
    //pass error info
    res.render("error");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})