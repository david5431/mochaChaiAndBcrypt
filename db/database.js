var mongoose = require('mongoose');
// this connects us to our database
var connectionString = 'mongodb://localhost/mochaTestDb';
console.log('Attempting to connect to MongoDB');

mongoose.connect(connectionString); // connect to the db supplied in the connectionString

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: localhost');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose error! ' + error);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from: localhost');
});
