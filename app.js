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
    if (projectId <= data.projects.length) {
      //render project view and pass the individual project data
      res.render('project', { project: data.projects[projectId - 1] })
    } else {
      const err = new Error();
      err.status = 404;
      err.message = "there is no project with this ID, please check the URL."
      res.render('page-not-found', { error: err });
      console.log(err.status, err.message);
    }

})

//handle 404 request
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry this page doesn't exist. Please check the URL.";
    res.status(404);
    res.render('page-not-found', { error: err });
    console.log(err.status, err.message);
    next();
  
});

//global error handler 
app.use((err, req, res, next) => {
    res.locals.error = err;
    err.status = 500;
    err.message = "Server side error";
    res.status(err.status);
    res.render("error", {error: err});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})