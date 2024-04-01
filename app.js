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
    res.render('project', projectId)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})