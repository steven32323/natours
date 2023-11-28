/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours, // tours: tours. With ES6, if the key and value have the same name, you only need to provide it once
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  // small trick to convert a string to a number in js
  const id = req.params.id * 1;
  // this line will search the json data for the tour id matching the id parameter
  const tour = tours.find((element) => element.id === id);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour, // tours: tours. With ES6, if the key and value have the same name, you only need to provide it once
    },
  });
};

exports.createTour = (req, res) => {
  // When the database is implemented, the new id will be generated automatically
  const newID = tours[tours.length - 1].id + 1;
  //
  const newTour = { id: newID, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // in the real world, this is the exact way that a delele request would be handled
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
