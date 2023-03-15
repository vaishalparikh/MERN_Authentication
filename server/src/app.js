/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');
const { connectToMongoDb, environmentVariables } = require('./config');
// Import internal modules
const swaggerDoc = yaml.load(path.resolve(__dirname, './swagger/api_doc.yml'));
const apiRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/', (req, res) => {
  res.send({ message: 'Welcome To AirBNB Server' });
});

// use routes
app.use(apiRoutes);

app.listen(environmentVariables.APP_PORT, (err) => {
  if (err) {
    console.error(err);
  }
  connectToMongoDb()
    .then(() => {
      console.info('connected to mongodb atlas');
      console.info(`Server running on ${environmentVariables.APP_PORT}`);
    })
    .catch((_error) => {
      console.log(_error);
    });
});

module.exports = app;
