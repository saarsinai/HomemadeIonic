import 'dotenv/config';
import restful from 'node-restful';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import babelRegister from 'babel-register';

const mongoose = restful.mongoose;
const app = express();

babelRegister();
expressConfig(app);
mongooseConfig(mongoose);
mongoose.connect(process.env.MONGO_URI);
routesConfig(app);

app.get('/', function (req, res) {
  res.send('Homemade server is up!')
});

app.listen(process.env.PORT);
