const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1 - MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2 - ROUTE HANDLERS

/////////////////////// HANDLING GET REQUESTS //////////////////////
// app.get('path', (request, response) => {})
// app.get('/api/v1/tours', getAllTours);

// just like with php, :id is a variable in the url. To make a variable optional, add a question mark to the end of it
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

/////////////// ROUTES CAN BE REFACTORED FROM THE ABOVE TO THE BELOW, USING CHAINING TO COVER EACH TYPE OF REQUEST ////////////////

// 3 - ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
