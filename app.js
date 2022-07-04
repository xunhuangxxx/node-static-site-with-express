const express = require('express');
const app = express();
const { projects } = require('./data.json');


app.listen(3000, 
    console.log('This app is listening to port 3000'));

// view engine setup
app.set('view engine', 'pug');

//serving static files in Express
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

//routes setup
app.get('/', (req, res,) => {
    res.render('index', {projects});
});

app.get('/about', (req, res,) => {
    res.render('about', {projects});
});

app.get('/project/:id', (req, res) => {
    const {id} = req.params;
    const project = projects.find(item => item.id ===id);
    res.render('project', project);
});

/*   Error handlers   */

//404 handler to catch undefined or non-existent routes requests
app.use(( req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Oops!Page not found.';
    console.error(err.status, err.message);
    res.render('page-not-found', {err});
    next(err);   
});

//global error handler
app.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500;   
    }
    if(!err.message) {
        err.message = 'Something went wrong!'
    }
    console.error(err.status, err.message);
    res.render('error', {err});
    next(err);
});